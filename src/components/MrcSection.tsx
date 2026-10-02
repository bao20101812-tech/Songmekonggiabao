import React, { useState } from 'react';
import { MRC_DOSSIER } from '../data/mekongData';
import { Landmark, FileText, Globe2, ShieldCheck, CheckCircle2, ChevronRight, Scale } from 'lucide-react';
import { sounds } from '../utils/audio';

export const MrcSection: React.FC = () => {
  const [selectedProcIndex, setSelectedProcIndex] = useState<number>(0);

  const handleSelectProc = (idx: number) => {
    sounds.playClick();
    setSelectedProcIndex(idx);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30 mb-3">
            <Landmark className="w-3.5 h-3.5" />
            <span>Cơ Chế Liên Chính Phủ Quốc Tế Duy Nhất</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Ủy Hội Sông Mê Kông Quốc Tế (MRC)
          </h2>
          <p className="text-teal-100/90 text-xs sm:text-base leading-relaxed">
            Thành lập ngày 05/04/1995 thông qua Hiệp định Hợp tác Phát triển Bền vững Lưu vực Sông Mê Kông. 
            MRC đóng vai trò trung tâm trong quản trị tài nguyên nước, bảo tồn hệ sinh thái và hài hòa lợi ích giữa các quốc gia ven sông.
          </p>
        </div>
      </div>

      {/* Grid: Foundation Facts + Members */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Ngày thành lập
          </span>
          <p className="font-extrabold text-slate-900 text-lg sm:text-xl">
            {MRC_DOSSIER.foundationDate}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Hiệp định Mê Kông 1995 ký tại Chiang Rai (Thái Lan) bởi 4 quốc gia hạ lưu.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Thành viên chính thức (4 Nước)
          </span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl" title="Campuchia">🇰🇭</span>
            <span className="text-2xl" title="Lào">🇱🇦</span>
            <span className="text-2xl" title="Thái Lan">🇹🇭</span>
            <span className="text-2xl" title="Việt Nam">🇻🇳</span>
          </div>
          <p className="text-xs text-slate-600 mt-2 font-medium">
            Campuchia, Lào, Thái Lan, Việt Nam
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Đối tác Đối thoại (2 Nước Thượng nguồn)
          </span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl" title="Trung Quốc">🇨🇳</span>
            <span className="text-2xl" title="Myanmar">🇲🇲</span>
          </div>
          <p className="text-xs text-slate-600 mt-2 font-medium">
            Trung Quốc và Myanmar (tham gia đối thoại từ năm 1996)
          </p>
        </div>
      </div>

      {/* 5 Core Procedures of MRC (Trọng tâm chuyên đề thi và học Địa lí 11) */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>Trọng Tâm Kiến Thức Địa Lí 11</span>
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
            5 Thủ Tục Pháp Lý & Kỹ Thuật Cốt Lõi Của MRC
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Hệ thống quy định quốc tế ràng buộc trách nhiệm sử dụng nguồn nước công bằng và hợp lý.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Procedure Navigation List */}
          <div className="lg:col-span-5 space-y-2">
            {MRC_DOSSIER.coreProcedures.map((proc, idx) => {
              const isSelected = selectedProcIndex === idx;
              return (
                <button
                  key={proc.code}
                  id={`proc-btn-${proc.code}`}
                  onClick={() => handleSelectProc(idx)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 border-teal-500 text-teal-950 ring-1 ring-teal-400/50 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-14 text-center text-xs font-extrabold px-2 py-1 rounded-md ${
                      isSelected ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {proc.code}
                    </span>
                    <span className="text-xs sm:text-sm font-bold truncate">
                      {proc.name}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-teal-600' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Detailed Display of Selected Procedure */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-50 to-sky-50/50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-teal-600 text-white font-extrabold text-sm">
                  {MRC_DOSSIER.coreProcedures[selectedProcIndex].code}
                </span>
                <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  {MRC_DOSSIER.coreProcedures[selectedProcIndex].name}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
                {MRC_DOSSIER.coreProcedures[selectedProcIndex].desc}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/80 bg-white/70 p-3.5 rounded-xl text-xs text-slate-600">
              <strong className="text-teal-900 block mb-1">Ý nghĩa thực tiễn với Việt Nam:</strong>
              Thủ tục này là công cụ pháp lý quốc tế để Việt Nam yêu cầu các quốc gia thượng lưu (như các dự án đập Xayaburi, Don Sahong ở Lào hoặc đập thủy điện ở Trung Quốc) phải chia sẻ thiết kế bậc thang xả đáy, khoang cho cá di cư và đánh giá tác động xuyên biên giới trước khi tiến hành xây dựng.
            </div>
          </div>
        </div>
      </div>

      {/* Role of MRC to Vietnam and Lower Mekong Basin */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          Vai Trò Của MRC Đối Với Việt Nam & Đồng Bằng Sông Cửu Long
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MRC_DOSSIER.mrcSignificanceForVietnam.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
