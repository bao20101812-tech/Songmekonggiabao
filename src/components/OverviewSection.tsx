import React from 'react';
import { MEKONG_OVERVIEW } from '../data/mekongData';
import { EducationLevel, TabType } from '../types';
import { 
  Waves, 
  Map, 
  Gamepad2, 
  Landmark, 
  Compass, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Fish, 
  Globe2, 
  ShieldCheck,
  Bot
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { KIEN_SANG_AVATAR, KIEN_SANG_BANNER } from '../assets/mascot';

interface OverviewSectionProps {
  currentLevel: EducationLevel;
  onNavigateTab: (tab: TabType) => void;
  onSelectLevel: (level: EducationLevel) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  currentLevel,
  onNavigateTab,
  onSelectLevel,
}) => {
  const handleAction = (tab: TabType) => {
    sounds.playClick();
    onNavigateTab(tab);
  };

  return (
    <div className="space-y-8">
      {/* Hero Showcase Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-sky-950 text-white p-6 sm:p-10 shadow-xl border border-teal-900/50">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>Nền Tảng Giáo Dục Số Tương Tác • Địa Lí 11 & MRC</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Sông Mê Kông & Ủy Hội Mê Kông (MRC)
          </h1>

          <p className="text-teal-100/90 text-sm sm:text-lg leading-relaxed">
            Hành trình dòng sông mẹ xuyên qua 6 quốc gia Đông Nam Á và Đông Á, bồi đắp vựa lúa Chín Rồng của Việt Nam. 
            Tìm hiểu địa lí, thủy văn học, hệ sinh thái và giải pháp thích ứng biến đổi khí hậu qua hệ thống trò chơi tương tác đa cấp học.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="hero-play-game-btn"
              onClick={() => handleAction('games')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-sm shadow-lg shadow-teal-500/25 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Chơi Game Tương Tác</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-chat-kien-sang-btn"
              onClick={() => handleAction('chatbot')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2.5 transition-all cursor-pointer"
            >
              <img
                src={KIEN_SANG_AVATAR}
                alt="Kiến Sáng"
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover border border-slate-950 shadow-xs"
              />
              <span>Hỏi Chatbot Kiến Sáng</span>
            </button>

            <button
              id="hero-view-map-btn"
              onClick={() => handleAction('map')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Map className="w-4 h-4 text-teal-300" />
              <span>Bản Đồ Vị Trí & Phạm Vi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metric Facts Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Chiều dài dòng sông
          </span>
          <p className="text-xl sm:text-2xl font-black text-slate-900">
            ~ 4.763 km
          </p>
          <span className="text-[11px] text-teal-700 font-semibold block mt-1">
            Dài thứ 12 thế giới, thứ 7 châu Á
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Diện tích lưu vực
          </span>
          <p className="text-xl sm:text-2xl font-black text-slate-900">
            795.000 km²
          </p>
          <span className="text-[11px] text-teal-700 font-semibold block mt-1">
            Gần 2,5 lần diện tích nước Việt Nam
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Lưu lượng nước / năm
          </span>
          <p className="text-xl sm:text-2xl font-black text-slate-900">
            ~ 475 tỉ m³
          </p>
          <span className="text-[11px] text-teal-700 font-semibold block mt-1">
            Đứng thứ 8 thế giới về lượng xả
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Sinh kế & Đa dạng loài
          </span>
          <p className="text-xl sm:text-2xl font-black text-slate-900">
            &gt; 70 triệu người
          </p>
          <span className="text-[11px] text-teal-700 font-semibold block mt-1">
            Hơn 1.100 loài cá nước ngọt
          </span>
        </div>
      </div>

      {/* 3 Education Level Guided Pathways */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900">
              Lộ Trình Học Tập & Game Tương Tác Theo 3 Cấp Học
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Nội dung thiết kế phù hợp với lứa tuổi và chuẩn kiến thức chương trình Giáo dục phổ thông 2018
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pathway 1: Elementary */}
          <div 
            onClick={() => { onSelectLevel('tieuhoc'); onNavigateTab('games'); }}
            className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between group ${
              currentLevel === 'tieuhoc'
                ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400 shadow-md'
                : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-sm'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🐬
              </div>
              <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block mb-2">
                Cấp Tiểu Học (Lớp 1 - 5)
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">
                Bé Cùng Cá Heo Khám Phá Mê Kông
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trò chơi giải cứu bạn Cá heo Irrawaddy, tìm nguồn nước sạch, ghép cờ 6 quốc gia anh em và nhận huy hiệu Nhà Thám Hiểm Nhí!
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>Chơi game Tiểu học</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pathway 2: Middle School */}
          <div 
            onClick={() => { onSelectLevel('thcs'); onNavigateTab('games'); }}
            className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between group ${
              currentLevel === 'thcs'
                ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-400 shadow-md'
                : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-sm'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🧭
              </div>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block mb-2">
                Cấp THCS (Lớp 6 - 9)
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">
                Dòng Chảy 6 Nước & Biển Hồ Tonle Sap
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thử thách sắp xếp thứ tự dòng chảy từ ngọn nguồn đến cửa biển, mô phỏng nhịp đập Biển Hồ điều hòa mùa nước nổi ĐBSCL.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Chơi game THCS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pathway 3: High School */}
          <div 
            onClick={() => { onSelectLevel('thpt'); onNavigateTab('games'); }}
            className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between group ${
              currentLevel === 'thpt'
                ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-400 shadow-md'
                : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                ⚖️
              </div>
              <span className="text-xs font-extrabold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full inline-block mb-2">
                Cấp THPT (Chuyên Đề Địa Lí 11)
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">
                Mô Phỏng Thủy Văn & Xâm Nhập Mặn
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trở thành nhà hoạch định chính sách: Điều tiết đập thượng nguồn, kiểm soát ranh mặn 4g/l, bảo vệ vựa lúa Việt Nam theo Nghị quyết 120.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Chơi mô phỏng Địa lí 11</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Kien Sang Mascot Spotlight Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center gap-6 overflow-hidden relative">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl shrink-0 overflow-hidden border-4 border-white/90 shadow-2xl bg-white rotate-1 hover:rotate-0 transition-transform">
          <img
            src={KIEN_SANG_AVATAR}
            alt="Bạn Kiến Sáng"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/20 text-amber-100 text-xs font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Trợ Lý Đồng Hành AI Đặc Biệt</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Gặp Gỡ Bạn Kiến Sáng Thông Thái!
          </h3>
          <p className="text-xs sm:text-sm text-amber-50/90 leading-relaxed max-w-2xl">
            Lấy cảm hứng từ nhân vật hoạt hình Kiến Sáng năng động, thông minh và hiếu kỳ. 
            Kiến Sáng được trang bị toàn bộ tri thức SGK Địa lí 11 mới, Hiệp định MRC 1995, 
            và liên hệ thực tiễn sinh thái ĐBSCL để sẵn sàng giải đáp mọi thắc mắc của bạn!
          </p>
        </div>
        <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
          <button
            id="spotlight-chat-kien-sang-btn"
            onClick={() => handleAction('chatbot')}
            className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-105"
          >
            <Bot className="w-4 h-4 text-amber-400" />
            <span>Trò Chuyện Cùng Kiến Sáng</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* 2 Focal Core Pillars: MRC and Vietnam Mekong Delta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: MRC */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">
              Ủy Hội Sông Mê Kông Quốc Tế (MRC)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Cơ chế liên chính phủ duy nhất ký kết năm 1995 giữa 4 nước thành viên Campuchia, Lào, Thái Lan, Việt Nam. 
              Tìm hiểu 5 thủ tục kỹ thuật bắt buộc (PNPCA, PWUM, PWQ, PMFM, PDIES) giúp kiểm soát công trình thủy điện thượng nguồn.
            </p>
          </div>
          <button
            id="overview-btn-mrc"
            onClick={() => handleAction('mrc')}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-teal-200"
          >
            <span>Xem Hồ Sơ Chi Tiết MRC</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2: Vietnam Mekong Delta */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">
              Liên Hệ Thực Tiễn: ĐBSCL & Vựa Lúa Việt Nam
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Đồng bằng sông Cửu Long đóng góp hơn 50% sản lượng lúa và 90% gạo xuất khẩu của Việt Nam. 
              Khám phá thực trạng suy giảm phù sa, ranh mặn 4g/lít và quyết sách "Thuận thiên" thích ứng BĐKH theo Nghị quyết 120/NQ-CP.
            </p>
          </div>
          <button
            id="overview-btn-vietnam"
            onClick={() => handleAction('vietnam')}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-emerald-200"
          >
            <span>Xem Chuyên Đề ĐBSCL Việt Nam</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
