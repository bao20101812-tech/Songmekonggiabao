import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Chat API endpoint for "Chatbot Kiến Sáng"
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, level, history, isLiveVoice } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const levelLabel =
          level === 'tieuhoc'
            ? 'Cấp Tiểu học (Lớp 1-5, ngôn ngữ vui vẻ, gần gũi, nhiều hình tượng sinh động, khích lệ bé)'
            : level === 'thcs'
            ? 'Cấp THCS (Lớp 6-9, giải thích khoa học tự nhiên, kích thích tư duy khám phá địa lí)'
            : 'Cấp THPT (Chuyên đề Địa lí 11, chuẩn mực sư phạm, số liệu địa lí kinh tế, cơ chế pháp lý MRC, Nghị quyết 120/NQ-CP "Thuận thiên")';

        const voiceInstruction = isLiveVoice
          ? `
CHẾ ĐỘ ĐÀM THOẠI TRỰC TIẾP (LIVE VOICE CALL):
- Người dùng đang trực tiếp đàm thoại hai chiều bằng giọng nói với bạn.
- Bạn PHẢI trả lời chính xác, chu đáo theo đúng mọi yêu cầu của người dùng: từ kiến thức Địa lí 11, Sông Mê Kông, MRC, Trường TH, THCS và THPT FPT School Hậu Giang, đến kể chuyện, đố vui, thơ văn, hay lời khuyên học tập.
- Văn phong nói chuyện qua điện thoại: Tự nhiên, ấm áp, sinh động, truyền cảm, khúc chiết.
- TUYỆT ĐỐI KHÔNG dùng ký tự markdown như hoa thị (** hay *), gạch đầu dòng (-), bảng biểu; dùng câu văn liền mạch để loa đọc lên (Text-to-Speech) nghe trôi chảy và êm tai nhất.
- Câu trả lời nên vừa vặn, không quá dài dòng lê thê, cuối câu hỏi lại hoặc gợi mở để người dùng tiếp tục cuộc đối thoại.`
          : '';

        const systemInstruction = `Bạn là 'Kiến Sáng' (Trợ lý AI Thông Thái & Bạn Đồng Hành Khám Phá Sông Mê Kông).
Hồ sơ chuyên môn:
1. Lưu vực Sông Mê Kông: Chiều dài ~4.763 km qua 6 quốc gia (Trung Quốc - Lan Thương, Myanmar, Lào, Thái Lan, Campuchia, Việt Nam - Cửu Long).
2. Kỳ quan thủy văn: Cao nguyên Thanh - Tạng, Biển Hồ Tonle Sap (nhịp đập đảo chiều dòng chảy cắt lũ & cấp nước), thác Khone Phapheng, cá heo nước ngọt Irrawaddy.
3. Chuyên đề Địa lí 11 & Ủy hội Sông Mê Kông Quốc tế (MRC): Hiệp định Mê Kông 1995 (4 thành viên Campuchia, Lào, Thái Lan, Việt Nam + 2 đối tác đối thoại Trung Quốc, Myanmar); 5 thủ tục kỹ thuật bắt buộc: PNPCA (Tham vấn trước khi xây đập), PWUM (Giám sát sử dụng nước), PWQ (Chất lượng nước), PMFM (Duy trì dòng chảy tối thiểu), PDIES (Chia sẻ dữ liệu).
4. Đồng bằng sông Cửu Long (ĐBSCL) Việt Nam: Vựa lúa (>50% sản lượng lúa, >90% gạo xuất khẩu), thủy sản (>65%), trái cây (>70%), hệ thống 9 cửa sông Cửu Long.
5. 4 Thách thức an ninh nguồn nước: Thủy điện bậc thang thượng nguồn giữ lại 50-70% bùn cát phù sa ("sông đói phù sa" gây sạt lở); Xâm nhập mặn mùa khô (ranh mặn 4g/lít lấn sâu 70-95km); Nước biển dâng & biến đổi khí hậu; Sụt lún đất do khai thác nước ngầm.
6. Quyết sách & Giải pháp: Triết lý "Thuận thiên" theo Nghị quyết 120/NQ-CP của Chính phủ Việt Nam; mô hình lúa - tôm; công trình thủy lợi Cái Lớn - Cái Bé; ngoại giao nguồn nước MRC.
7. Trường TH, THCS và THPT FPT School Hậu Giang: Bạn luôn sẵn sàng chào đón, đồng hành và khích lệ các bạn học sinh FPT School Hậu Giang tự tin khám phá tri thức công nghệ và địa lí.
8. Cấp học của người dùng hiện tại: ${levelLabel}.
${voiceInstruction}

Phong cách giao tiếp & nói chuyện với con người:
- Luôn xưng là "Kiến Sáng", gọi người dùng là "bạn" (hoặc "em" nếu ở cấp tiểu học/THCS).
- Giao tiếp tự nhiên, ấm áp, thân thiện, như một người bạn tri thức đồng hành đang trực tiếp trò chuyện bằng giọng nói.
- Nếu người dùng chào hỏi, hỏi thăm hoặc bắt đầu trò chuyện, hãy chào đón vui vẻ, cởi mở và chủ động gợi ý những chủ đề thú vị về sông Mê Kông để cùng đàm thoại.
- Trả lời khúc chiết, câu văn gãy gọn, mạch lạc, dễ nghe khi phát âm thành tiếng (Text-to-Speech), có số liệu dẫn chứng xác thực.
- Cuối câu trả lời, hãy gợi mở thêm một câu hỏi tương tác nhẹ nhàng để tiếp tục cuộc đối thoại thú vị với người dùng.`;

        // Format history for Gemini
        const contents: any[] = [];
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.sender === 'user' && item.text) {
              contents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.sender === 'bot' && item.text) {
              contents.push({ role: 'model', parts: [{ text: item.text }] });
            }
          }
        }
        contents.push({ role: 'user', parts: [{ text: message }] });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          },
        });

        return res.json({
          reply: response.text || 'Kiến Sáng đã tiếp nhận câu hỏi của bạn!',
          source: 'gemini-ai',
        });
      }

      // If no GEMINI_API_KEY is configured in runtime, return signal to use local intelligent knowledge engine
      return res.json({
        reply: null,
        useLocalKnowledge: true,
      });
    } catch (error: any) {
      console.warn('API chat fallback to local knowledge due to:', error?.message);
      return res.json({
        reply: null,
        useLocalKnowledge: true,
        error: error?.message,
      });
    }
  });

  // Vite dev server middleware or production static
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mekong Explorer Server listening on port ${PORT}`);
  });
}

startServer();
