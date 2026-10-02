import React, { useState } from 'react';
import { VIETNAM_DELTA_DATA } from '../data/mekongData';
import { 
  Compass, 
  AlertOctagon, 
  Leaf, 
  Wheat, 
  Fish, 
  Sparkles,
  Waves,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { sounds } from '../utils/audio';

export const VietnamImpactSection: React.FC = () => {
  const [expandedChallengeIndex, setExpandedChallengeIndex] = useState<number | null>(0);

  const toggleChallenge = (idx: number) => {
    sounds.playClick();
    setExpandedChallengeIndex(expandedChallengeIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Liên Hệ Thực Tiễn Việt Nam - Chuyên Đề Địa Lí 11</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Đồng Bằng Sông Cửu Long: Trụ Cột An Ninh Lương Thực & Thách Thức Nguồn Nước
          </h2>
          <p className="text-emerald-100/90 text-xs sm:text-base leading-relaxed">
            Nơi dòng sông mẹ chia thành chín nhánh rồng ("Cửu Long") bồi đắp nên vùng châu thổ trù phú bậc nhất Đông Nam Á, 
            nhưng cũng là nơi chịu tổn thương nặng nề nhất ở cuối nguồn dòng chảy.
          </p>
        </div>
      </div>

      {/* Economic Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {VIETNAM_DELTA_DATA.economicRole.map((role, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                {idx === 0 ? <Wheat className="w-5 h-5" /> : idx === 1 ? <Fish className="w-5 h-5" /> : <Leaf className="w-5 h-5" />}
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {role.label}
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-800 mt-1">
                {role.value}
              </p>
            </div>
            <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
              {role.detail}
            </p>
          </div>
        ))}
      </div>

      {/* The Nine Estuaries of the Mekong (Chín Cửa Sông Cửu Long) */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Waves className="w-5 h-5 text-teal-600" />
              Chín Cửa Biển Thần Thoại ("Cửu Long Giang")
            </h3>
            <p className="text-xs text-slate-500">
              Các nhánh sông Tiền và sông Hậu đổ ra Biển Đông
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
            6 Cửa Sông Tiền + 3 Cửa Sông Hậu
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {VIETNAM_DELTA_DATA.cuuLongEstuaries.map((est, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-teal-800">#{idx + 1}</span>
                <span className="text-[10px] font-semibold text-slate-500">{est.river}</span>
              </div>
              <p className="font-extrabold text-slate-900 text-sm mt-1">{est.name}</p>
              <p className="text-[11px] text-slate-600 mt-0.5">{est.province}</p>
              <span className={`text-[10px] font-bold mt-2 inline-block px-1.5 py-0.5 rounded ${
                est.status.includes('ngăn') || est.status.includes('lấp')
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {est.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Critical Challenges Accordion */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
            Chuyên Đề Địa Lí 11
          </span>
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2 mt-0.5">
            <AlertOctagon className="w-5 h-5 text-rose-600" />
            4 Thách Thức An Ninh Nguồn Nước Sống Còn Đối Với ĐBSCL
          </h3>
        </div>

        <div className="space-y-3">
          {VIETNAM_DELTA_DATA.challenges.map((ch, idx) => {
            const isOpen = expandedChallengeIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleChallenge(idx)}
                  className="w-full p-4 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {ch.title}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>

                {isOpen && (
                  <div className="p-4 bg-white border-t border-slate-200 text-xs sm:text-sm space-y-2">
                    <p className="text-slate-700 leading-relaxed">
                      <strong className="text-slate-900">Thực trạng:</strong> {ch.impact}
                    </p>
                    <p className="text-rose-700 font-medium leading-relaxed bg-rose-50 p-3 rounded-lg border border-rose-100">
                      <strong className="text-rose-900">Hệ quả tiêu cực:</strong> {ch.consequence}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Government Strategic Solutions - Nghị Quyết 120/NQ-CP */}
      <div className="bg-gradient-to-br from-teal-50 via-emerald-50 to-sky-50 rounded-2xl p-5 sm:p-7 border border-teal-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-700" />
          <h3 className="font-extrabold text-teal-950 text-base sm:text-lg">
            Định Hướng Chiến Lược & Giải Pháp "Thuận Thiên" (Nghị Quyết 120/NQ-CP)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-teal-900/80 max-w-3xl leading-relaxed">
          Đồng bằng sông Cửu Long không thể tiếp tục mô hình phát triển cũ coi nước mặn chỉ là kẻ thù. 
          Chính phủ Việt Nam đã ban hành Nghị quyết 120 xác lập phương châm "Thuận thiên" và tái cơ cấu kinh tế:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {VIETNAM_DELTA_DATA.solutions.map((sol, idx) => (
            <div key={idx} className="bg-white/90 p-4 rounded-xl border border-teal-200 shadow-xs">
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200 inline-block mb-2">
                {sol.tag}
              </span>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">
                {sol.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {sol.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
