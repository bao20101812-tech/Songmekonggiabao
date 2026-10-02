import React, { useState } from 'react';
import { Sparkles, Copy, Check, X, BookOpen, Laptop, GraduationCap } from 'lucide-react';
import { sounds } from '../utils/audio';

interface PromptBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptBuilderModal: React.FC<PromptBuilderModalProps> = ({ isOpen, onClose }) => {
  const [role, setRole] = useState<'developer' | 'teacher' | 'student'>('developer');
  const [levelFocus, setLevelFocus] = useState<string>('all');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const generatePrompt = () => {
    if (role === 'developer') {
      return `Xây dựng một ứng dụng web tương tác hoàn chỉnh trên Google AI Studio (React, TypeScript, Tailwind CSS) về đề tài: "Sông Mê Kông, Ủy Hội Sông Mê Kông (MRC) & Chuyên Đề Địa Lí 11 Liên Hệ Thực Tiễn Việt Nam".

Yêu cầu kỹ thuật & chức năng:
1. Phân hóa tương tác theo 3 cấp học:
   - Cấp Tiểu học (Lớp 1-5): Game khám phá chú cá heo Irrawaddy nước ngọt, giọt nước Mê Kông, ghép cờ 6 quốc gia (Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia, Việt Nam).
   - Cấp THCS (Lớp 6-9): Game sắp xếp thứ tự dòng chảy từ thượng nguồn đến hạ lưu, mô phỏng nhịp đập Biển Hồ Tonle Sap đảo chiều mùa lũ/mùa khô.
   - Cấp THPT (Chuyên đề Địa lí 11): Bộ mô phỏng quản lý thủy văn & xâm nhập mặn ĐBSCL (ranh mặn 4g/l, sụt giảm phù sa do thủy điện thượng nguồn, mực nước biển dâng, giải pháp "Thuận thiên" theo Nghị quyết 120/NQ-CP).
2. Bản đồ tương tác lưu vực Mê Kông: Hiển thị 6 quốc gia ven sông, trạm quan trắc thủy văn, số liệu diện tích lưu vực và tỷ lệ đóng góp dòng chảy.
3. Hồ sơ chuyên sâu về Ủy hội Sông Mê Kông Quốc tế (MRC): Lịch sử Hiệp định Mê Kông 1995, 4 thành viên sáng lập, 2 đối tác đối thoại, và 5 thủ tục cốt lõi (PNPCA, PWUM, PWQ, PMFM, PDIES).
4. Phần liên hệ thực tiễn Việt Nam: Vựa lúa - thủy sản ĐBSCL, hệ thống 9 cửa sông Cửu Long, 4 thách thức an ninh nguồn nước và chiến lược thích ứng thông minh.
5. Hệ thống trắc nghiệm chấm điểm tự động có giải thích chi tiết chuẩn chương trình GDPT 2018. Giao diện trực quan, âm thanh phản hồi nhẹ nhàng bằng Web Audio API.`;
    }

    if (role === 'teacher') {
      return `Đóng vai trò là Chuyên gia Phương pháp Dạy học Địa lí và Giáo viên dạy giỏi môn Địa lí THPT:
Hãy thiết kế kế hoạch bài dạy (giáo án) Chuyên đề Địa lí 11: "Ủy hội sông Mê Kông (MRC) và vấn đề phát triển bền vững lưu vực sông Mê Kông - Liên hệ thực tiễn Đồng bằng sông Cửu Long Việt Nam".

Cấu trúc giáo án theo định hướng phát triển năng lực gồm:
1. Mục tiêu bài học (Về kiến thức, năng lực địa lí, phẩm chất trách nhiệm bảo vệ môi trường sông Mê Kông).
2. Hoạt động khởi động: Trò chơi đố vui trực quan về 6 quốc gia lưu vực sông Mê Kông và 9 nhánh rồng Cửu Long.
3. Hoạt động hình thành kiến thức:
   - Thảo luận nhóm: Phân tích cơ chế hoạt động của Ủy hội MRC và 5 thủ tục pháp lý cốt lõi (đặc biệt là thủ tục tham vấn trước PNPCA).
   - Trực quan hóa dữ liệu: Nguyên nhân sụt giảm lượng phù sa từ 160 triệu tấn xuống dưới 47 triệu tấn do thủy điện bậc thang.
   - Xâm nhập mặn mùa khô & ranh mặn 4g/lít uy hiếp vựa lúa Việt Nam.
4. Hoạt động luyện tập & Vận dụng: Đóng vai nhà hoạch định chính sách đưa ra giải pháp "Thuận thiên" theo tinh thần Nghị quyết 120/NQ-CP của Chính phủ.
5. Bộ 10 câu hỏi trắc nghiệm khách quan 4 lựa chọn có đáp án và giải thích sư phạm chi tiết.`;
    }

    return `Em là học sinh đang nghiên cứu chuyên đề Địa lí 11 về "Lưu vực sông Mê Kông, Ủy hội MRC và vùng Đồng bằng sông Cửu Long Việt Nam".
Hãy hướng dẫn em xây dựng một bài thuyết trình đa phương tiện ấn tượng với bố cục:
1. Dòng sông Mê Kông qua 6 quốc gia: Ngọn nguồn từ cao nguyên Tây Tạng (Lan Thương) đến 9 cửa biển Chín Rồng tại Việt Nam.
2. Kỳ quan Biển Hồ Tonle Sap và cơ chế điều hòa dòng chảy mùa lũ, mùa khô.
3. Vì sao Ủy hội sông Mê Kông (MRC) lại là diễn đàn pháp lý quan trọng nhất để Việt Nam bảo vệ quyền lợi nông dân ĐBSCL?
4. Những thách thức thực tế em quan sát được tại ĐBSCL: Sạt lở bờ sông, ranh mặn 4g/lít lấn sâu làm cháy vườn cây ăn trái, sụt lún đất do khai thác nước ngầm.
5. Các mô hình sinh kế thích ứng thông minh: Lúa - Tôm, bảo tồn rừng ngập mặn đai chắn sóng, trữ nước ngọt mùa khô.
Hãy trình bày ngắn gọn, súc tích, có số liệu dẫn chứng cụ thể và gợi ý các hình ảnh/biểu đồ trực quan để bài báo cáo đạt điểm tối đa!`;
  };

  const currentPromptText = generatePrompt();

  const handleCopy = () => {
    sounds.playSuccess();
    navigator.clipboard.writeText(currentPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-teal-900 to-cyan-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                Công Cụ Sinh Prompt Chuẩn Google AI Studio
              </h3>
              <p className="text-xs text-teal-200/80">
                Tối ưu hóa câu lệnh cho Gemini / AI Studio / ChatGPT theo từng mục tiêu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Target Role Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              1. Chọn Mục Đích & Đối Tượng Sử Dụng:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { sounds.playClick(); setRole('developer'); }}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                  role === 'developer'
                    ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Laptop className="w-4 h-4 text-teal-600" />
                <span className="text-xs">Lập trình Webapp</span>
                <span className="text-[10px] text-slate-500 font-normal">Cho Google AI Studio</span>
              </button>

              <button
                onClick={() => { sounds.playClick(); setRole('teacher'); }}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                  role === 'teacher'
                    ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span className="text-xs">Giáo viên Địa lí</span>
                <span className="text-[10px] text-slate-500 font-normal">Soạn giáo án, bài giảng</span>
              </button>

              <button
                onClick={() => { sounds.playClick(); setRole('student'); }}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                  role === 'student'
                    ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-teal-600" />
                <span className="text-xs">Học sinh Địa 11</span>
                <span className="text-[10px] text-slate-500 font-normal">Ôn tập, thuyết trình</span>
              </button>
            </div>
          </div>

          {/* Prompt Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Nội Dung Prompt Mẫu Hoàn Chỉnh:
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-lg transition-colors cursor-pointer border border-teal-200"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép!' : 'Sao chép Prompt'}</span>
              </button>
            </div>

            <textarea
              readOnly
              value={currentPromptText}
              rows={12}
              className="w-full p-4 rounded-xl bg-slate-900 text-teal-100 text-xs font-mono border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed resize-none shadow-inner"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            Dán trực tiếp prompt này vào ô chat của Google AI Studio hoặc Gemini để tạo mới ứng dụng!
          </p>
          <button
            onClick={handleCopy}
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã chép vào clipboard' : 'Sao chép ngay'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
