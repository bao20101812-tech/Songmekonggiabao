/**
 * Speech Service: Web Speech API synthesis (Text-to-Speech) & recognition (Speech-to-Text)
 * Optimized for natural Vietnamese communication with Kiến Sáng
 */

// Format markdown & special chars into smooth natural speech text
export function cleanTextForSpeech(text: string): string {
  if (!text) return '';

  return text
    // Remove markdown bold/italic
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    // Remove markdown headers
    .replace(/^#+\s+/gm, '')
    // Replace bullet points with brief pauses
    .replace(/^[\s]*[-•*]\s+/gm, ', ')
    // Replace numbered lists like 1. 2. with natural transitions
    .replace(/^(\d+)\.\s+/gm, 'Điều $1: ')
    // Remove URLs
    .replace(/https?:\/\/\S+/g, '')
    // Remove technical markdown symbols
    .replace(/[`~^|]/g, '')
    // Convert multiple line breaks to full stops
    .replace(/\n+/g, '. ')
    // Remove common decorative emojis to make speech sound cleaner
    .replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    // Clean up multiple spaces and dots
    .replace(/\s+/g, ' ')
    .replace(/\.{2,}/g, '.')
    .trim();
}

export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
  isVietnamese: boolean;
}

class SpeechService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private recognitionInstance: any = null;
  private isListeningActive: boolean = false;

  // Get available voices with priority for Vietnamese
  getAvailableVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        resolve([]);
        return;
      }

      let voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
        return;
      }

      // If voices not loaded yet, wait for onvoiceschanged
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      };

      // Fallback timeout
      setTimeout(() => {
        resolve(window.speechSynthesis.getVoices());
      }, 500);
    });
  }

  // Get best Vietnamese voice or system default
  async getBestVietnameseVoice(): Promise<SpeechSynthesisVoice | null> {
    const voices = await this.getAvailableVoices();
    if (!voices || voices.length === 0) return null;

    // 1. Look for explicit vi-VN
    const viVoice = voices.find(
      (v) => v.lang.toLowerCase().includes('vi') || v.name.toLowerCase().includes('vietnam')
    );
    if (viVoice) return viVoice;

    // 2. Return default or first voice
    return voices.find((v) => v.default) || voices[0] || null;
  }

  // Speak text out loud in Vietnamese
  async speak(
    rawText: string,
    options?: {
      rate?: number;
      pitch?: number;
      voice?: SpeechSynthesisVoice | null;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    }
  ): Promise<void> {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      options?.onError?.(new Error('Trình duyệt không hỗ trợ Text-to-Speech'));
      return;
    }

    // Stop any ongoing speech
    this.stopSpeaking();

    const spokenText = cleanTextForSpeech(rawText);
    if (!spokenText) {
      options?.onEnd?.();
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = options?.rate ?? 1.0;
      utterance.pitch = options?.pitch ?? 1.0;
      utterance.lang = 'vi-VN';

      const voice = options?.voice || (await this.getBestVietnameseVoice());
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        options?.onStart?.();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        options?.onEnd?.();
      };

      utterance.onerror = (e) => {
        this.currentUtterance = null;
        // Ignore canceled errors from user clicking stop
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          options?.onError?.(e);
        } else {
          options?.onEnd?.();
        }
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      options?.onError?.(err);
    }
  }

  // Stop current speech
  stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }

  // Check if currently speaking
  isSpeaking(): boolean {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis.speaking;
    }
    return false;
  }

  // Check if Speech Recognition (Speech-to-Text) is supported
  isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return Boolean(
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    );
  }

  // Start listening to user voice via microphone
  startListening(options: {
    onResult: (transcript: string, isFinal: boolean) => void;
    onError: (error: string) => void;
    onStart?: () => void;
    onEnd?: () => void;
  }): boolean {
    if (!this.isSpeechRecognitionSupported()) {
      options.onError('Trình duyệt chưa hỗ trợ nhận dạng giọng nói Web Speech. Bạn có thể sử dụng Chrome, Edge hoặc Safari.');
      return false;
    }

    this.stopListening();

    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    try {
      const recognition = new SpeechRecognitionConstructor();
      recognition.lang = 'vi-VN';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        this.isListeningActive = true;
        options.onStart?.();
      };

      let lastTranscript = '';
      let hasDispatchedFinal = false;

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          lastTranscript = finalTranscript.trim();
          hasDispatchedFinal = true;
          options.onResult(lastTranscript, true);
        } else if (interimTranscript) {
          lastTranscript = interimTranscript.trim();
          options.onResult(lastTranscript, false);
        }
      };

      recognition.onerror = (event: any) => {
        this.isListeningActive = false;
        let msg = 'Không thể nhận dạng giọng nói';
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          msg = 'Vui lòng cho phép quyền truy cập Micro trên trình duyệt để nói chuyện với Kiến Sáng!';
        } else if (event.error === 'no-speech') {
          msg = 'no-speech';
        } else if (event.error === 'audio-capture') {
          msg = 'Không tìm thấy microphone hoặc thiết bị thu âm!';
        } else if (event.error === 'network') {
          msg = 'Lỗi kết nối dịch vụ nhận dạng giọng nói.';
        }
        options.onError(msg);
      };

      recognition.onend = () => {
        this.isListeningActive = false;
        this.recognitionInstance = null;
        if (!hasDispatchedFinal && lastTranscript) {
          hasDispatchedFinal = true;
          options.onResult(lastTranscript, true);
        }
        options.onEnd?.();
      };

      this.recognitionInstance = recognition;
      recognition.start();
      return true;
    } catch (err: any) {
      this.isListeningActive = false;
      options.onError(err?.message || 'Không thể khởi động Microphone');
      return false;
    }
  }

  // Stop listening
  stopListening() {
    if (this.recognitionInstance) {
      try {
        this.recognitionInstance.stop();
      } catch {
        // Ignore
      }
      this.recognitionInstance = null;
    }
    this.isListeningActive = false;
  }

  isListening(): boolean {
    return this.isListeningActive;
  }
}

export const speechService = new SpeechService();
