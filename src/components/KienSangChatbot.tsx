import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, EducationLevel } from '../types';
import { generateLocalKienSangReply } from '../utils/kienSangEngine';
import { sounds } from '../utils/audio';
import { speechService } from '../utils/speechService';
import { KIEN_SANG_AVATAR } from '../assets/mascot';
import { 
  Send, 
  Sparkles, 
  User, 
  RotateCcw, 
  Copy, 
  Check, 
  Lightbulb, 
  GraduationCap, 
  ShieldCheck, 
  Zap, 
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Square,
  Radio,
  Sliders,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  PhoneOff,
  MessageSquare
} from 'lucide-react';

interface KienSangChatbotProps {
  currentLevel: EducationLevel;
  onLevelChange?: (level: EducationLevel) => void;
  isFloatingDrawer?: boolean;
  onCloseFloating?: () => void;
}

export const KienSangChatbot: React.FC<KienSangChatbotProps> = ({
  currentLevel,
  onLevelChange,
  isFloatingDrawer = false,
  onCloseFloating,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: `Xin chào bạn! Mình là **Kiến Sáng** 🐜💡 - Trợ lý AI giáo dục thông thái đồng hành cùng bạn trên lưu vực sông Mê Kông!\n\nGiờ đây bạn có thể **nói chuyện trực tiếp bằng giọng nói** với mình:\n- 🎙️ Nhấn nút **Micro** để nói câu hỏi của bạn.\n- 🔊 Mình sẽ **trả lời và cất giọng nói** giải thích chi tiết cho bạn.\n- 📞 Bật **Chế độ Đàm thoại trực tiếp** để trò chuyện rảnh tay liên tục như người thật!\n\nHãy thử bấm Micro hoặc chọn một chủ đề gợi ý bên dưới nhé!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local-expert',
        suggestedFollowups: [
          'Sông Mê Kông chảy qua những quốc gia nào?',
          'Tại sao ở Việt Nam gọi là sông Cửu Long?',
          'Ủy hội Sông Mê Kông (MRC) có vai trò gì với Việt Nam?',
        ],
      },
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [interimSpokenText, setInterimSpokenText] = useState('');
  const [callInputText, setCallInputText] = useState('');
  const [showCallTextInput, setShowCallTextInput] = useState(false);

  // Live Hands-free Voice Call Mode
  const [isLiveCallMode, setIsLiveCallMode] = useState(false);
  const [callStage, setCallStage] = useState<'idle' | 'calling' | 'connected'>('idle');
  const [callDuration, setCallDuration] = useState<number>(0);
  const [callStatus, setCallStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');

  const callDurationIntervalRef = useRef<any>(null);
  const callConnectingTimeoutRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const callModeRef = useRef(isLiveCallMode);
  callModeRef.current = isLiveCallMode;

  const autoSpeakRef = useRef(autoSpeak);
  autoSpeakRef.current = autoSpeak;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load voices on mount
  useEffect(() => {
    speechService.getAvailableVoices().then((voices) => {
      setAvailableVoices(voices);
      speechService.getBestVietnameseVoice().then((best) => {
        setSelectedVoice(best);
      });
    });

    return () => {
      speechService.stopSpeaking();
      speechService.stopListening();
      if (callDurationIntervalRef.current) clearInterval(callDurationIntervalRef.current);
      if (callConnectingTimeoutRef.current) clearTimeout(callConnectingTimeoutRef.current);
    };
  }, []);

  // Quick suggestions based on level
  const quickPrompts = {
    tieuhoc: [
      '🐬 Kể cho em nghe về bạn cá heo Irrawaddy?',
      '🇨🇳 Sông Mê Kông chảy qua 6 nước anh em nào?',
      '🐉 Vì sao ở Việt Nam lại gọi là sông Cửu Long?',
      '👋 Bạn Kiến Sáng có khỏe không?',
    ],
    thcs: [
      '🌊 Biển Hồ Tonle Sap điều hòa dòng chảy như thế nào?',
      '🗺️ Chiều dài và diện tích lưu vực sông Mê Kông?',
      '🇱🇦 Nước nào đóng góp lượng nước lớn nhất vào Mê Kông?',
      '🤖 Kiến Sáng ơi, bạn là ai thế?',
    ],
    thpt: [
      '⚡ Thủy điện thượng nguồn làm suy giảm phù sa ĐBSCL ra sao?',
      '🧂 Ranh mặn 4g/lít ảnh hưởng như thế nào đến nông nghiệp?',
      '🏛️ 5 thủ tục kỹ thuật bắt buộc của MRC (PNPCA...) là gì?',
      '🌱 Nội dung cốt lõi của Nghị quyết 120/NQ-CP "Thuận thiên"?',
    ],
  };

  // Speak a message
  const handleSpeakMessage = useCallback((msgId: string, text: string) => {
    sounds.playSpeechStart();
    setSpeakingMessageId(msgId);
    setIsSpeaking(true);
    setCallStatus('speaking');

    speechService.speak(text, {
      rate: speechRate,
      voice: selectedVoice,
      onStart: () => {
        setIsSpeaking(true);
        setSpeakingMessageId(msgId);
        setCallStatus('speaking');
      },
      onEnd: () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
        setCallStatus('idle');

        // If in live call mode, re-open mic after bot finishes speaking
        if (callModeRef.current) {
          setTimeout(() => {
            if (callModeRef.current) {
              startVoiceRecognition();
            }
          }, 400);
        }
      },
      onError: (err) => {
        console.warn('Speech error:', err);
        setIsSpeaking(false);
        setSpeakingMessageId(null);
        setCallStatus('idle');
      },
    });
  }, [speechRate, selectedVoice]);

  // Stop speaking
  const handleStopSpeaking = () => {
    sounds.playClick();
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setSpeakingMessageId(null);
    setCallStatus('idle');
  };

  // Send message function
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim() || isTyping) return;

    sounds.playClick();
    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: textToSend.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        levelBadge: currentLevel,
      },
    ];

    setMessages(newMessages);
    if (!customText) setInputValue('');
    setInterimSpokenText('');
    setIsTyping(true);
    if (callModeRef.current) setCallStatus('thinking');

    const botMsgId = `bot-${Date.now()}`;

    try {
      // Call server endpoint
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          level: currentLevel,
          history: newMessages.slice(-6),
          isLiveVoice: Boolean(callModeRef.current),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          sounds.playSuccess();
          const replyText = data.reply;
          setMessages((prev) => [
            ...prev,
            {
              id: botMsgId,
              sender: 'bot',
              text: replyText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              source: 'gemini-ai',
            },
          ]);
          setIsTyping(false);

          // If autoSpeak or live call mode, speak immediately!
          if (autoSpeakRef.current || callModeRef.current) {
            handleSpeakMessage(botMsgId, replyText);
          } else {
            setCallStatus('idle');
          }
          return;
        }
      }
    } catch (e) {
      console.warn('Could not connect to /api/chat, using local Kien Sang knowledge engine:', e);
    }

    // Fallback to intelligent local knowledge engine
    setTimeout(() => {
      const localResult = generateLocalKienSangReply(textToSend, currentLevel);
      sounds.playSuccess();
      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          sender: 'bot',
          text: localResult.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'local-expert',
          suggestedFollowups: localResult.followups,
        },
      ]);
      setIsTyping(false);

      if (autoSpeakRef.current || callModeRef.current) {
        handleSpeakMessage(botMsgId, localResult.text);
      } else {
        setCallStatus('idle');
      }
    }, 450);
  };

  // Start Voice Recognition (Speech-to-Text)
  const startVoiceRecognition = () => {
    // If bot is currently speaking, stop it first so mic doesn't pick up bot's voice
    if (speechService.isSpeaking()) {
      speechService.stopSpeaking();
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    }

    setVoiceError(null);
    setInterimSpokenText('');

    const ok = speechService.startListening({
      onStart: () => {
        sounds.playMicStart();
        setIsListening(true);
        setCallStatus('listening');
      },
      onResult: (transcript, isFinal) => {
        if (isFinal) {
          setInputValue(transcript);
          setInterimSpokenText('');
          setIsListening(false);
          sounds.playMicEnd();
          // Auto send final sentence!
          setTimeout(() => {
            handleSendMessage(transcript);
          }, 300);
        } else {
          setInterimSpokenText(transcript);
          setInputValue(transcript);
        }
      },
      onError: (errText) => {
        setIsListening(false);
        if (errText === 'no-speech') {
          if (callModeRef.current) {
            setCallStatus('idle');
          }
          return;
        }
        setVoiceError(errText);
        setCallStatus('idle');
        sounds.playError();
      },
      onEnd: () => {
        setIsListening(false);
        if (!isTyping && !isSpeaking) {
          setCallStatus('idle');
        }
      },
    });

    if (!ok) {
      setVoiceError('Trình duyệt chưa hỗ trợ nhận dạng giọng nói hoặc chưa cấp quyền Micro.');
    }
  };

  const stopVoiceRecognition = () => {
    sounds.playMicEnd();
    speechService.stopListening();
    setIsListening(false);
    setCallStatus('idle');
  };

  const toggleVoiceRecognition = () => {
    if (isListening) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  };

  // Start Live Phone Call Mode where Kiến Sáng answers
  const startLiveCall = () => {
    sounds.playPhoneRing();
    setIsLiveCallMode(true);
    setShowSettings(false);
    setCallStage('calling');
    setCallDuration(0);
    setCallStatus('idle');

    if (callDurationIntervalRef.current) clearInterval(callDurationIntervalRef.current);
    if (callConnectingTimeoutRef.current) clearTimeout(callConnectingTimeoutRef.current);

    // After ring delay (~1.5s), Kiến Sáng answers!
    callConnectingTimeoutRef.current = setTimeout(() => {
      sounds.playPhonePickup();
      setCallStage('connected');

      // Start call duration timer
      callDurationIntervalRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      const pickupGreeting = `A lô, Kiến Sáng xin nghe đây ạ! Chào bạn học sinh FPT School Hậu Giang, mình đã nhấc máy rồi nhé. Bạn muốn trò chuyện hay hỏi gì về sông Mê Kông, Địa lí 11 hay Ủy hội MRC nào?`;

      // Speak greeting out loud
      setCallStatus('speaking');
      setIsSpeaking(true);

      speechService.speak(pickupGreeting, {
        rate: speechRate,
        voice: selectedVoice,
        onStart: () => {
          setIsSpeaking(true);
          setCallStatus('speaking');
        },
        onEnd: () => {
          setIsSpeaking(false);
          setCallStatus('listening');
          // Automatically start microphone listening for user question
          setTimeout(() => {
            if (callModeRef.current) {
              startVoiceRecognition();
            }
          }, 400);
        },
        onError: () => {
          setIsSpeaking(false);
          setCallStatus('listening');
          startVoiceRecognition();
        },
      });
    }, 1500);
  };

  const endLiveCall = () => {
    sounds.playPhoneHangup();
    speechService.stopSpeaking();
    speechService.stopListening();
    if (callDurationIntervalRef.current) clearInterval(callDurationIntervalRef.current);
    if (callConnectingTimeoutRef.current) clearTimeout(callConnectingTimeoutRef.current);
    setIsSpeaking(false);
    setIsListening(false);
    setCallStatus('idle');
    setCallStage('idle');
    setIsLiveCallMode(false);
  };

  const handleReplayCallGreeting = () => {
    sounds.playClick();
    speechService.stopListening();
    setIsListening(false);
    const pickupGreeting = `A lô, Kiến Sáng xin nghe đây ạ! Mình luôn sẵn sàng giải đáp mọi câu hỏi về Địa lí 11 và sông Mê Kông. Bạn cứ tự nhiên nói câu hỏi nhé!`;
    setCallStatus('speaking');
    setIsSpeaking(true);
    speechService.speak(pickupGreeting, {
      rate: speechRate,
      voice: selectedVoice,
      onStart: () => {
        setIsSpeaking(true);
        setCallStatus('speaking');
      },
      onEnd: () => {
        setIsSpeaking(false);
        setCallStatus('listening');
        setTimeout(() => {
          if (callModeRef.current) {
            startVoiceRecognition();
          }
        }, 400);
      },
      onError: () => {
        setIsSpeaking(false);
        setCallStatus('listening');
        startVoiceRecognition();
      },
    });
  };

  // Toggle Live Call Mode
  const toggleLiveCallMode = () => {
    if (isLiveCallMode) {
      endLiveCall();
    } else {
      startLiveCall();
    }
  };

  const handleReplayLastAnswer = () => {
    sounds.playClick();
    const lastBotMsg = [...messages].reverse().find((m) => m.sender === 'bot');
    if (lastBotMsg) {
      handleSpeakMessage(lastBotMsg.id, lastBotMsg.text);
    } else {
      handleReplayCallGreeting();
    }
  };

  const handleSendCallInput = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!callInputText.trim()) return;
    const txt = callInputText.trim();
    setCallInputText('');
    handleSendMessage(txt);
  };

  const handleCopyText = (id: string, text: string) => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleResetChat = () => {
    sounds.playClick();
    speechService.stopSpeaking();
    speechService.stopListening();
    setIsSpeaking(false);
    setIsListening(false);
    setCallStatus('idle');

    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: 'bot',
        text: `Đã làm mới cuộc trò chuyện! Kiến Sáng 🐜💡 luôn sẵn sàng lắng nghe câu hỏi và trò chuyện bằng giọng nói cùng bạn về Sông Mê Kông, Địa lí 11 và Ủy hội MRC.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local-expert',
        suggestedFollowups: quickPrompts[currentLevel],
      },
    ]);
  };

  const formatBotText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} className="min-h-[1.2rem] leading-relaxed">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-extrabold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className={isFloatingDrawer ? 'h-full flex flex-col' : 'space-y-4'}>
      {!isFloatingDrawer && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/90 shadow-lg bg-white shrink-0">
              <img
                src={KIEN_SANG_AVATAR}
                alt="Bạn Kiến Sáng"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform ${isSpeaking ? 'scale-105' : ''}`}
              />
              {isSpeaking && (
                <span className="absolute inset-0 border-2 border-emerald-400 rounded-2xl animate-ping" />
              )}
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/20 text-amber-100 text-[11px] font-bold">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Trợ Lý AI Giao Tiếp Bằng Giọng Nói • Địa Lí 11 & MRC</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>Trò Chuyện Trực Tiếp Cùng Kiến Sáng AI</span>
                {isSpeaking && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-bold animate-pulse flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Đang nói...</span>
                  </span>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-amber-50/90 leading-relaxed max-w-xl">
                Bật micro và trò chuyện tự nhiên như người thật! Bạn có thể đặt câu hỏi về hành trình 4.763 km, 
                Ủy hội MRC 1995, hay giải pháp "Thuận thiên" thích ứng biến đổi khí hậu ở ĐBSCL.
              </p>
            </div>
          </div>

          {/* Direct Voice Call Trigger Action */}
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              onClick={toggleLiveCallMode}
              className={`px-4 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                isLiveCallMode
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                  : 'bg-white hover:bg-amber-50 text-amber-900 border-2 border-white'
              }`}
            >
              {isLiveCallMode ? (
                <>
                  <PhoneOff className="w-4 h-4" />
                  <span>Dừng Đàm Thoại</span>
                </>
              ) : (
                <>
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Bật Đàm Thoại Rảnh Tay 🎙️</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main Chat / Voice Container */}
      <div
        className={`flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative ${
          isFloatingDrawer ? 'h-full flex-1' : 'h-[650px]'
        }`}
      >
        {/* Top Header */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-teal-900 via-slate-900 to-cyan-950 text-white flex items-center justify-between border-b border-teal-800/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={KIEN_SANG_AVATAR}
                alt="Kiến Sáng Mascot"
                referrerPolicy="no-referrer"
                className={`w-11 h-11 rounded-2xl object-cover border-2 shadow-md transition-all ${
                  isSpeaking ? 'border-emerald-400 ring-2 ring-emerald-300/50' : 'border-amber-400'
                }`}
              />
              <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-slate-900 rounded-full flex items-center justify-center ${
                isSpeaking ? 'bg-emerald-400' : isListening ? 'bg-red-500 animate-ping' : 'bg-teal-400'
              }`} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base tracking-tight flex items-center gap-1.5">
                  <span>Chatbot Kiến Sáng</span>
                  {isSpeaking && (
                    <span className="flex items-center gap-0.5 ml-1 px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                      <span className="w-1 h-2 bg-emerald-400 animate-bounce" />
                      <span className="w-1 h-3 bg-emerald-400 animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1 h-2 bg-emerald-400 animate-bounce [animation-delay:0.3s]" />
                      <span className="ml-1">Đang nói</span>
                    </span>
                  )}
                  {isListening && (
                    <span className="flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded bg-red-500/30 text-red-300 text-[10px] font-bold animate-pulse">
                      <Radio className="w-2.5 h-2.5" />
                      <span>Đang nghe bạn</span>
                    </span>
                  )}
                </h3>
              </div>
              <p className="text-[11px] text-teal-200/80 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Nói chuyện & đối thoại trực tiếp bằng giọng nói</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Auto Speak Toggle */}
            <button
              onClick={() => {
                sounds.playClick();
                if (isSpeaking) handleStopSpeaking();
                setAutoSpeak(!autoSpeak);
              }}
              title={autoSpeak ? 'Tắt tự động đọc giọng nói' : 'Bật tự động đọc giọng nói'}
              className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                autoSpeak
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-white/10 text-slate-400 border-white/10 hover:bg-white/20'
              }`}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden md:inline text-[11px]">{autoSpeak ? 'Giọng nói: Bật' : 'Tắt tiếng'}</span>
            </button>

            {/* Live Call Toggle */}
            <button
              onClick={toggleLiveCallMode}
              title={isLiveCallMode ? 'Quay lại tin nhắn văn bản' : 'Chuyển sang chế độ gọi thoại'}
              className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold ${
                isLiveCallMode
                  ? 'bg-red-600 text-white border-red-500 animate-pulse'
                  : 'bg-teal-700/80 text-teal-200 border-teal-600 hover:bg-teal-600 hover:text-white'
              }`}
            >
              {isLiveCallMode ? <PhoneOff className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
              <span className="hidden sm:inline text-[11px]">
                {isLiveCallMode ? 'Thoát gọi thoại' : 'Đàm thoại rảnh tay'}
              </span>
            </button>

            {/* Voice Settings Dropdown Toggle */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowSettings(!showSettings);
              }}
              title="Cài đặt giọng đọc & tốc độ"
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                showSettings
                  ? 'bg-amber-400 text-slate-900 border-amber-300'
                  : 'bg-white/10 text-slate-300 hover:text-white border-white/10 hover:bg-white/20'
              }`}
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Reset Button */}
            <button
              onClick={handleResetChat}
              title="Làm mới cuộc trò chuyện"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {isFloatingDrawer && onCloseFloating && (
              <button
                onClick={onCloseFloating}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* MODE SWITCHER: NHẮN TIN vs ĐÀM THOẠI TRỰC TIẾP */}
        <div className="bg-slate-900/95 px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs gap-2">
          <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => {
                if (isLiveCallMode) endLiveCall();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                !isLiveCallMode
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Nhắn Tin & Tra Cứu</span>
            </button>
            <button
              onClick={() => {
                if (!isLiveCallMode) startLiveCall();
              }}
              className={`px-3.5 py-1.5 rounded-lg font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                isLiveCallMode
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400/50'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-700/60'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Đàm Thoại Trực Tiếp 🎙️</span>
              <span className="px-1.5 py-0.5 bg-emerald-400/20 text-emerald-300 rounded text-[10px] font-black uppercase">LIVE</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-teal-300/80">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>FPT School Hậu Giang • Địa Lí 11 & MRC</span>
          </div>
        </div>

        {/* Voice Settings Dropdown Drawer */}
        {showSettings && (
          <div className="bg-slate-900 text-slate-100 p-4 border-b border-slate-700 text-xs space-y-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-amber-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Cài Đặt Giọng Nói Kiến Sáng
              </h4>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Speed Rate */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300">
                  Tốc độ phát âm: <span className="text-teal-300 font-extrabold">{speechRate}x</span>
                </label>
                <div className="flex items-center gap-2">
                  {[0.8, 1.0, 1.2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => {
                        sounds.playClick();
                        setSpeechRate(rate);
                      }}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        speechRate === rate
                          ? 'bg-teal-600 text-white border-teal-500'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {rate === 0.8 ? '0.8x (Chậm)' : rate === 1.0 ? '1.0x (Chuẩn)' : '1.2x (Nhanh)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice selection */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300">
                  Giọng đọc hệ thống:
                </label>
                <select
                  value={selectedVoice?.name || ''}
                  onChange={(e) => {
                    const voice = availableVoices.find((v) => v.name === e.target.value);
                    if (voice) setSelectedVoice(voice);
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-400"
                >
                  {availableVoices.map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.name} ({v.lang}) {v.lang.includes('vi') ? '⭐ Tiếng Việt' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* VOICE ERROR BANNER */}
        {voiceError && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{voiceError}</span>
            </div>
            <button
              onClick={() => setVoiceError(null)}
              className="font-bold text-amber-800 hover:text-amber-950 ml-2 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: LIVE HANDS-FREE VOICE CALL MODE */}
        {/* ------------------------------------------------------------- */}
        {isLiveCallMode ? (
          <div className="flex-1 flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white select-none overflow-y-auto">
            {/* Call Header Status & Timer */}
            <div className="w-full flex items-center justify-between text-xs text-teal-300/80 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-bold text-white text-xs">
                  {callStage === 'calling' ? 'Đang đổ chuông...' : `Đàm thoại trực tiếp • ${Math.floor(callDuration / 60).toString().padStart(2, '0')}:${(callDuration % 60).toString().padStart(2, '0')}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Replay last bot answer button */}
                <button
                  onClick={handleReplayLastAnswer}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-teal-200 text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  title="Nghe lại câu trả lời vừa rồi"
                >
                  <RotateCcw className="w-3 h-3 text-amber-400" />
                  <span className="hidden sm:inline">Nghe lại</span>
                </button>

                <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full text-[11px] text-white">
                  <GraduationCap className="w-3 h-3 text-amber-400" />
                  <span>
                    {currentLevel === 'tieuhoc'
                      ? 'Tiểu học'
                      : currentLevel === 'thcs'
                      ? 'THCS'
                      : 'FPT School • Địa lí 11'}
                  </span>
                </div>
              </div>
            </div>

            {/* Central Stage: Animated Mascot + Sound Wave Visualizer */}
            <div className="relative flex flex-col items-center justify-center my-auto py-4 w-full max-w-lg">
              {/* Animated Outer Ripple Rings */}
              {callStatus === 'speaking' && (
                <>
                  <div className="absolute w-60 h-60 rounded-full bg-emerald-500/20 animate-ping" />
                  <div className="absolute w-52 h-52 rounded-full bg-teal-500/30 animate-pulse" />
                </>
              )}
              {callStatus === 'listening' && (
                <>
                  <div className="absolute w-60 h-60 rounded-full bg-red-500/25 animate-ping" />
                  <div className="absolute w-52 h-52 rounded-full bg-red-500/35 animate-pulse" />
                </>
              )}
              {callStatus === 'thinking' && (
                <div className="absolute w-52 h-52 rounded-full bg-amber-500/20 animate-spin" />
              )}

              {/* Center Mascot Avatar */}
              <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-teal-400 to-cyan-400 shadow-2xl">
                <img
                  src={KIEN_SANG_AVATAR}
                  alt="Kiến Sáng AI"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover border-4 border-slate-950 shadow-inner"
                />
              </div>

              {/* Dynamic Sound Equalizer Waveform */}
              <div className="flex items-center justify-center gap-1.5 mt-4 h-8">
                {[0.4, 0.7, 1.0, 0.6, 0.9, 1.2, 0.8, 0.5, 1.1, 0.7, 0.9, 0.4].map((scale, idx) => (
                  <span
                    key={idx}
                    className={`w-1.5 rounded-full transition-all duration-200 ${
                      callStatus === 'speaking'
                        ? 'bg-emerald-400 animate-pulse'
                        : callStatus === 'listening'
                        ? 'bg-red-400 animate-bounce'
                        : 'bg-teal-700/60'
                    }`}
                    style={{
                      height:
                        callStatus === 'speaking' || callStatus === 'listening'
                          ? `${Math.max(6, Math.min(28, scale * 24))}px`
                          : '6px',
                      animationDelay: `${(idx % 4) * 0.12}s`,
                    }}
                  />
                ))}
              </div>

              {/* Status Header */}
              <div className="mt-2 text-center space-y-1">
                <h4 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center justify-center gap-2">
                  <span>Kiến Sáng AI</span>
                  {callStatus === 'speaking' && <Volume2 className="w-5 h-5 text-emerald-400 animate-bounce" />}
                  {callStatus === 'listening' && <Mic className="w-5 h-5 text-red-400 animate-pulse" />}
                  {callStatus === 'thinking' && <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />}
                </h4>

                <p className="text-xs sm:text-sm font-medium">
                  {callStatus === 'speaking' && (
                    <span className="text-emerald-300 font-bold">Kiến Sáng đang phát âm trả lời bạn...</span>
                  )}
                  {callStatus === 'listening' && (
                    <span className="text-red-300 font-bold animate-pulse">
                      Đang lắng nghe... Hãy nói yêu cầu hoặc câu hỏi của bạn!
                    </span>
                  )}
                  {callStatus === 'thinking' && (
                    <span className="text-amber-300">Kiến Sáng đang xử lý thông tin theo yêu cầu...</span>
                  )}
                  {callStatus === 'idle' && (
                    <span className="text-teal-200/80">Sẵn sàng! Hãy nói trực tiếp hoặc chọn câu hỏi gợi ý bên dưới</span>
                  )}
                </p>
              </div>

              {/* Live Subtitle / Transcript Card */}
              {(interimSpokenText || messages.length > 0) && (
                <div className="mt-3 max-w-md w-full mx-auto px-4 py-2.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 text-center text-xs sm:text-sm text-slate-100 shadow-md">
                  {interimSpokenText ? (
                    <div className="flex items-center justify-center gap-1.5 text-teal-200 font-semibold">
                      <Mic className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                      <span>Bạn: "{interimSpokenText}"</span>
                    </div>
                  ) : (
                    <div className="text-slate-200">
                      <span className="text-amber-300 font-bold mr-1.5">
                        {messages[messages.length - 1]?.sender === 'user' ? 'Bạn:' : 'Kiến Sáng:'}
                      </span>
                      <span className="line-clamp-2">
                        {messages[messages.length - 1]?.text}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Spoken Topic Pills (One-touch trigger) */}
              <div className="w-full mt-4">
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <span className="text-[11px] font-bold text-teal-300/80 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-400" />
                    Chủ đề đàm thoại nhanh:
                  </span>
                  <button
                    onClick={() => setShowCallTextInput(!showCallTextInput)}
                    className="text-[11px] text-teal-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>{showCallTextInput ? 'Ẩn ô gõ chữ' : '✏️ Gõ chữ trong cuộc gọi'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {[
                    { label: '🏫 FPT School Hậu Giang', prompt: 'Giới thiệu về trường TH, THCS và THPT FPT School Hậu Giang' },
                    { label: '📖 Kể chuyện Mê Kông', prompt: 'Hãy kể cho mình một câu chuyện hoặc huyền thoại về dòng sông Mê Kông' },
                    { label: '🧩 Đố vui Địa lí 11', prompt: 'Hãy đố vui mình một câu hỏi thú vị về sông Mê Kông hoặc Địa lí 11' },
                    { label: '🌊 Sông Cửu Long', prompt: 'Vì sao khi vào Việt Nam sông Mê Kông lại có tên là sông Cửu Long?' },
                    { label: '🌾 NQ 120 Thuận thiên', prompt: 'Giải thích tóm tắt triết lý Thuận thiên trong Nghị quyết 120 thích ứng ĐBSCL' },
                    { label: '⚡ Thủy điện & phù sa', prompt: 'Các hồ thủy điện thượng nguồn giữ lại bao nhiêu phù sa của sông Mê Kông?' },
                  ].map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        sounds.playClick();
                        handleSendMessage(topic.prompt);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-teal-700/60 border border-white/10 hover:border-teal-400/50 text-[11px] text-left text-slate-200 hover:text-white font-medium transition-all truncate cursor-pointer shadow-xs"
                      title={topic.prompt}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Call Fast Text Bar (Optional text fallback) */}
              {showCallTextInput && (
                <form
                  onSubmit={handleSendCallInput}
                  className="w-full mt-3 flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-teal-500/40 animate-in fade-in"
                >
                  <input
                    type="text"
                    value={callInputText}
                    onChange={(e) => setCallInputText(e.target.value)}
                    placeholder="Nhập yêu cầu để Kiến Sáng trả lời bằng giọng nói..."
                    className="flex-1 bg-transparent px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!callInputText.trim()}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Gửi & Nói</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>

            {/* Call Controls Bar */}
            <div className="w-full flex items-center justify-center gap-4 pt-3 border-t border-white/10">
              {/* Mic Toggle Button */}
              <button
                onClick={toggleVoiceRecognition}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white ring-4 ring-red-400/40 animate-pulse scale-105'
                    : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/20'
                }`}
                title={isListening ? 'Dừng lắng nghe' : 'Bật Micro để nói câu hỏi'}
              >
                {isListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>

              {/* Stop / Interrupt Bot Speaking Button */}
              {isSpeaking && (
                <button
                  onClick={handleStopSpeaking}
                  className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer border border-white/20"
                  title="Dừng phát âm (ngắt lời Kiến Sáng để nói ngay)"
                >
                  <Square className="w-5 h-5 text-amber-400" />
                </button>
              )}

              {/* End Call Button */}
              <button
                onClick={toggleLiveCallMode}
                className="px-5 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Rời Cuộc Thoại</span>
              </button>
            </div>
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* VIEW 2: STANDARD CHAT STREAM WITH AUDIO PLAYBACK & MIC BAR    */
          /* ------------------------------------------------------------- */
          <>
            {/* Live Speaking / Listening Floating Alert */}
            {isSpeaking && (
              <div className="bg-emerald-600 text-white px-4 py-2 text-xs flex items-center justify-between shadow-xs z-10 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 animate-bounce" />
                  <span className="font-bold">Kiến Sáng đang phát âm câu trả lời...</span>
                </div>
                <button
                  onClick={handleStopSpeaking}
                  className="bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Square className="w-3 h-3" />
                  <span>Dừng nói</span>
                </button>
              </div>
            )}

            {isListening && (
              <div className="bg-red-600 text-white px-4 py-2 text-xs flex items-center justify-between shadow-xs z-10 animate-pulse">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 animate-spin" />
                  <span className="font-bold">
                    {interimSpokenText ? `Đang nghe: "${interimSpokenText}"` : 'Đang lắng nghe giọng nói của bạn... Hãy nói đi nào!'}
                  </span>
                </div>
                <button
                  onClick={stopVoiceRecognition}
                  className="bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors"
                >
                  Hoàn tất
                </button>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[88%] sm:max-w-[80%] ${
                      msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar Icon */}
                    {msg.sender === 'user' ? (
                      <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-sm shadow-xs bg-teal-600 text-white">
                        <User className="w-4 h-4" />
                      </div>
                    ) : (
                      <img
                        src={KIEN_SANG_AVATAR}
                        alt="Kiến Sáng"
                        referrerPolicy="no-referrer"
                        className={`w-8 h-8 rounded-xl shrink-0 object-cover border shadow-xs transition-all ${
                          speakingMessageId === msg.id
                            ? 'border-emerald-500 ring-2 ring-emerald-400/50 scale-110'
                            : 'border-amber-400'
                        }`}
                      />
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-xs relative ${
                        msg.sender === 'user'
                          ? 'bg-teal-600 text-white rounded-tr-xs'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                      }`}
                    >
                      {/* Active Speaking Indicator on Bubble */}
                      {speakingMessageId === msg.id && (
                        <div className="mb-2 pb-1.5 border-b border-emerald-100 flex items-center gap-1.5 text-emerald-700 font-extrabold text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <span>Kiến Sáng đang đọc câu này:</span>
                        </div>
                      )}

                      <div className="space-y-2">
                        {msg.sender === 'user' ? (
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        ) : (
                          formatBotText(msg.text)
                        )}
                      </div>

                      {/* Message Meta Info & Actions */}
                      <div
                        className={`mt-2.5 pt-1.5 flex items-center justify-between text-[10px] border-t ${
                          msg.sender === 'user'
                            ? 'border-teal-500/40 text-teal-200'
                            : 'border-slate-100 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{msg.timestamp}</span>
                          {msg.source === 'gemini-ai' && (
                            <span className="inline-flex items-center gap-1 text-teal-600 font-semibold">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>Gemini 3.8 Flash</span>
                            </span>
                          )}
                          {msg.source === 'local-expert' && (
                            <span className="inline-flex items-center gap-1 text-slate-500">
                              <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                              <span>Kiến thức chuẩn GDPT</span>
                            </span>
                          )}
                        </div>

                        {msg.sender === 'bot' && (
                          <div className="flex items-center gap-2">
                            {/* Speak / Stop Button on each message */}
                            <button
                              onClick={() => {
                                if (speakingMessageId === msg.id) {
                                  handleStopSpeaking();
                                } else {
                                  handleSpeakMessage(msg.id, msg.text);
                                }
                              }}
                              className={`flex items-center gap-1 font-semibold px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                                speakingMessageId === msg.id
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                              }`}
                              title={speakingMessageId === msg.id ? 'Dừng đọc' : 'Nghe Kiến Sáng đọc'}
                            >
                              {speakingMessageId === msg.id ? (
                                <>
                                  <Square className="w-3 h-3 text-red-600" />
                                  <span className="text-red-600 font-bold">Dừng đọc</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3 h-3 text-teal-600" />
                                  <span>Nghe đọc</span>
                                </>
                              )}
                            </button>

                            {/* Copy button */}
                            <button
                              onClick={() => handleCopyText(msg.id, msg.text)}
                              className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer p-0.5"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-600 font-bold">Đã chép</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Chép</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Suggested Followups */}
                  {msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                    <div className="mt-2.5 ml-11 flex flex-wrap gap-1.5">
                      {msg.suggestedFollowups.map((followup, fIdx) => (
                        <button
                          key={fIdx}
                          onClick={() => handleSendMessage(followup)}
                          className="text-[11px] bg-white hover:bg-teal-50 text-teal-800 border border-teal-200/80 rounded-full px-3 py-1 font-medium transition-all shadow-2xs hover:border-teal-400 cursor-pointer flex items-center gap-1"
                        >
                          <Lightbulb className="w-3 h-3 text-amber-500" />
                          <span>{followup}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 items-start">
                  <img
                    src={KIEN_SANG_AVATAR}
                    alt="Kiến Sáng"
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-xl shrink-0 object-cover border border-amber-400 shadow-xs animate-pulse"
                  />
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 text-slate-600 font-medium">Kiến Sáng đang suy nghĩ câu trả lời...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-4 py-2 bg-slate-100/90 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" />
                Gợi ý:
              </span>
              {quickPrompts[currentLevel].map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-3 py-1 bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-200 rounded-lg text-xs font-medium transition-all cursor-pointer shadow-2xs"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Input Bar with Microphone Button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              {/* MICROPHONE BUTTON */}
              <button
                id="kien-sang-mic-btn"
                type="button"
                onClick={toggleVoiceRecognition}
                className={`p-2.5 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                  isListening
                    ? 'bg-red-500 text-white ring-4 ring-red-300 animate-pulse scale-105'
                    : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200'
                }`}
                title={isListening ? 'Đang lắng nghe... Nhấn để dừng' : 'Nhấn vào đây để nói chuyện bằng giọng nói'}
              >
                {isListening ? <Mic className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-teal-700" />}
              </button>

              <input
                id="kien-sang-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  isListening
                    ? 'Đang lắng nghe giọng bạn... Hãy nói đi nào!'
                    : 'Nhắn tin hoặc bấm Micro để nói chuyện cùng Kiến Sáng...'
                }
                disabled={isTyping}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all ${
                  isListening
                    ? 'bg-red-50/70 border-2 border-red-300 text-red-900 placeholder:text-red-400'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400'
                }`}
              />

              <button
                id="kien-sang-send-btn"
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Gửi</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

