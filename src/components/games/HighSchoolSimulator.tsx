import React, { useState, useMemo } from 'react';
import { SimulationParams, SimulationResult } from '../../types';
import { sounds } from '../../utils/audio';
import { 
  Sliders, 
  AlertTriangle, 
  ShieldCheck, 
  Droplet, 
  TreePine, 
  Sparkles,
  Waves,
  RefreshCw,
  Landmark,
  Scale
} from 'lucide-react';

export const HighSchoolSimulator: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    upstreamDamDischarge: 80, // 80% of normal
    drySeasonRainfall: 0, // Normal
    seaLevelRiseCm: 15, // 15 cm
    mangroveRestoration: 50, // 50%
    freshwaterStorageProject: true, // Sluice gates active
  });

  // Calculate dynamic hydrological and policy results based on real scientific data
  const result: SimulationResult = useMemo(() => {
    // Baseline salinity intrusion in natural conditions: ~40 km
    let salinity = 45;

    // Upstream dam discharge effect: low discharge drastically increases salinity
    // If discharge < 100%, salinity increases up to +35km
    const dischargeDeficit = 100 - params.upstreamDamDischarge;
    salinity += dischargeDeficit * 0.35;

    // Rainfall effect: drought adds up to +15km
    salinity -= params.drySeasonRainfall * 0.2;

    // Sea level rise pushes salt water further inland
    salinity += params.seaLevelRiseCm * 0.35;

    // Mangrove buffer dampens tidal surge slightly (-5km max)
    salinity -= (params.mangroveRestoration / 100) * 5;

    // Smart sluice gates (Cái Lớn - Cái Bé) can hold back ~12km of salinity
    if (params.freshwaterStorageProject) {
      salinity -= 12;
    }

    // Clamp salinity between 25km and 95km
    const finalSalinity = Math.round(Math.max(25, Math.min(95, salinity)));

    // Sediment calculation: heavily dependent on upstream dams trapping silt
    // Dams currently trap 50-70% of silt
    let sediment = Math.round(params.upstreamDamDischarge * 0.38);
    if (sediment > 65) sediment = 65; // Max under current dam infrastructure
    if (sediment < 15) sediment = 15;

    // Agricultural Risk Category
    let risk: 'An toàn' | 'Cảnh báo thấp' | 'Nguy cơ cao' | 'Khủng hoảng nghiêm trọng' = 'An toàn';
    let freshwaterStatus = 'Ổn định, bảo đảm nguồn nước tưới cho 1.5 triệu ha lúa và cây ăn trái.';

    if (finalSalinity >= 75) {
      risk = 'Khủng hoảng nghiêm trọng';
      freshwaterStatus = 'Báo động đỏ! Mặn 4g/l xâm nhập sâu >75km. Hơn 300.000 ha lúa, vườn cây ăn trái và hàng triệu hộ dân thiếu nước sinh hoạt.';
    } else if (finalSalinity >= 60) {
      risk = 'Nguy cơ cao';
      freshwaterStatus = 'Nguy cơ cao: Mặn lấn sâu vào Tiền Giang, Bến Tre, Trà Vinh, Sóc Trăng. Cần đóng cống khẩn cấp và trữ nước.';
    } else if (finalSalinity >= 45) {
      risk = 'Cảnh báo thấp';
      freshwaterStatus = 'Cần chủ động giám sát đo mặn tại các trạm đầu nguồn sông Tiền và sông Hậu.';
    }

    const recommendations: string[] = [];
    if (params.upstreamDamDischarge < 80) {
      recommendations.push('Kích hoạt cơ chế tham vấn khẩn cấp của Ủy hội Sông Mê Kông (MRC), đề nghị Trung Quốc và Lào tăng cường xả nước điều tiết từ thủy điện.');
    }
    if (finalSalinity > 55) {
      recommendations.push('Triển khai mô hình thích ứng "Thuận thiên" theo Nghị quyết 120/NQ-CP: chủ động chuyển đổi vụ mùa lúa sang nuôi tôm nước lợ.');
    }
    if (params.mangroveRestoration < 60) {
      recommendations.push('Đẩy mạnh trồng rừng ngập mặn đai chắn sóng ven biển Tây và biển Đông để giảm sạt lở và hấp thu triều cường.');
    }
    if (!params.freshwaterStorageProject) {
      recommendations.push('Cần kích hoạt và vận hành liên hồ chứa, các âu thuyền thủy lợi (Cái Lớn - Cái Bé) để giữ ngọt cho nội đồng.');
    }
    if (recommendations.length === 0) {
      recommendations.push('Hệ thống thủy văn và quyết sách đang ở trạng thái cân bằng sinh thái tối ưu theo nguyên tắc quản lý tổng hợp nguồn nước (IWRM).');
    }

    return {
      salinityIntrusionKm: finalSalinity,
      sedimentDepositPercent: sediment,
      agriculturalRisk: risk,
      freshwaterSupplyStatus: freshwaterStatus,
      recommendations,
    };
  }, [params]);

  const handleReset = () => {
    sounds.playClick();
    setParams({
      upstreamDamDischarge: 80,
      drySeasonRainfall: 0,
      seaLevelRiseCm: 15,
      mangroveRestoration: 50,
      freshwaterStorageProject: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Simulation Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-5 sm:p-7 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Chuyên Đề Địa Lí 11 - Mô Phỏng Tương Tác Cấp Cao</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Mô Phỏng Quản Trị Thủy Văn & Xâm Nhập Mặn ĐBSCL
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl">
              Học sinh đóng vai trò nhà hoạch định chính sách môi trường: Điều chỉnh các biến số thượng nguồn và biến đổi khí hậu để kiểm soát ranh mặn 4g/l, bảo vệ vựa lúa Việt Nam.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Mặc định ban đầu</span>
          </button>
        </div>
      </div>

      {/* Simulator Interface: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Parameter Controls */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
          <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="w-5 h-5 text-blue-600" />
            Các Biến Số Đầu Vào Thủy Văn & Khí Hậu
          </h4>

          {/* Slider 1: Upstream Dam Discharge */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-blue-500" />
                Lưu lượng xả đập thủy điện thượng nguồn:
              </span>
              <span className="text-blue-700 font-extrabold">{params.upstreamDamDischarge}% (bình thường)</span>
            </div>
            <input
              type="range"
              min="30"
              max="120"
              step="5"
              value={params.upstreamDamDischarge}
              onChange={(e) => {
                sounds.playClick();
                setParams({ ...params, upstreamDamDischarge: Number(e.target.value) });
              }}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-medium">
              <span>Đóng đập giữ nước (30%)</span>
              <span>Xả điều tiết tối đa (120%)</span>
            </div>
          </div>

          {/* Slider 2: Dry Season Rainfall */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-sky-500" />
                Biến động lượng mưa mùa khô (El Niño / La Niña):
              </span>
              <span className="text-sky-700 font-extrabold">
                {params.drySeasonRainfall > 0 ? `+${params.drySeasonRainfall}%` : `${params.drySeasonRainfall}%`}
              </span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="10"
              value={params.drySeasonRainfall}
              onChange={(e) => {
                sounds.playClick();
                setParams({ ...params, drySeasonRainfall: Number(e.target.value) });
              }}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-medium">
              <span>Hạn hán lịch sử (-40%)</span>
              <span>Mưa trái mùa nhiều (+40%)</span>
            </div>
          </div>

          {/* Slider 3: Sea Level Rise */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Mực nước biển dâng (Kịch bản BĐKH):
              </span>
              <span className="text-amber-700 font-extrabold">+{params.seaLevelRiseCm} cm</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={params.seaLevelRiseCm}
              onChange={(e) => {
                sounds.playClick();
                setParams({ ...params, seaLevelRiseCm: Number(e.target.value) });
              }}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-medium">
              <span>Hiện tại (0 cm)</span>
              <span>Kịch bản cực đoan (+40 cm)</span>
            </div>
          </div>

          {/* Slider 4: Mangrove restoration */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <TreePine className="w-4 h-4 text-emerald-600" />
                Độ che phủ đai rừng ngập mặn phòng hộ:
              </span>
              <span className="text-emerald-700 font-extrabold">{params.mangroveRestoration}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={params.mangroveRestoration}
              onChange={(e) => {
                sounds.playClick();
                setParams({ ...params, mangroveRestoration: Number(e.target.value) });
              }}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-medium">
              <span>Suy thoái nặng (10%)</span>
              <span>Phục hồi dày đặc (100%)</span>
            </div>
          </div>

          {/* Toggle: Freshwater project */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-xs text-slate-800 block">
                Công trình kiểm soát mặn Cái Lớn - Cái Bé
              </span>
              <span className="text-[11px] text-slate-500">
                Đóng van ngăn triều biển Tây, bảo vệ nguồn nước ngọt nội đồng
              </span>
            </div>
            <button
              id="toggle-sluice-project"
              onClick={() => {
                sounds.playClick();
                setParams({ ...params, freshwaterStorageProject: !params.freshwaterStorageProject });
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                params.freshwaterStorageProject
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {params.freshwaterStorageProject ? 'ĐANG BẬT' : 'ĐÃ TẮT'}
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Simulation Results & Map Gauges */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Kết Quả Tác Động Thực Tế Đến ĐBSCL
            </h4>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              result.agriculturalRisk === 'Khủng hoảng nghiêm trọng'
                ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                : result.agriculturalRisk === 'Nguy cơ cao'
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}>
              {result.agriculturalRisk}
            </span>
          </div>

          {/* 2 Big Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Salinity intrusion gauge */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
              <span className="text-xs font-bold text-amber-800 block mb-1">
                Ranh Mặn 4g/lít Lấn Sâu Vào Đất Liền
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-amber-900">
                  {result.salinityIntrusionKm}
                </span>
                <span className="font-bold text-amber-700 text-sm">km từ cửa biển</span>
              </div>
              <p className="text-[11px] text-amber-800 mt-2">
                {result.salinityIntrusionKm > 70
                  ? 'Vượt mốc lịch sử năm 2016 & 2020! Mặn uy hiếp đến tận Tiền Giang, Vĩnh Long, Cần Thơ.'
                  : result.salinityIntrusionKm > 50
                  ? 'Mặn lấn sâu vào hệ thống kênh rạch Bến Tre, Trà Vinh, Sóc Trăng.'
                  : 'Nằm trong ngưỡng kiểm soát tự nhiên của mùa khô thông thường.'}
              </p>
            </div>

            {/* Sediment deposit */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200">
              <span className="text-xs font-bold text-teal-800 block mb-1">
                Lượng Phù Sa Về Đồng Bằng
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-teal-900">
                  {result.sedimentDepositPercent}%
                </span>
                <span className="font-bold text-teal-700 text-sm">so với tự nhiên</span>
              </div>
              <p className="text-[11px] text-teal-800 mt-2">
                Hơn 100 đập thủy điện bậc thang giữ lại hàng chục triệu tấn bùn cát, gây hiện tượng sông đói phù sa làm sạt lở nghiêm trọng.
              </p>
            </div>
          </div>

          {/* Dynamic River Salinity Visual Progress Bar */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Cửa Biển Đông (0km - 35g/l)</span>
              <span className="text-amber-700">Ranh 4g/l: {result.salinityIntrusionKm}km</span>
              <span>Thượng Nguồn Tân Châu (120km - Nước ngọt 0g/l)</span>
            </div>
            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 transition-all duration-500"
                style={{ width: `${(result.salinityIntrusionKm / 120) * 100}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-teal-500 transition-all duration-500 flex-1"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-600 font-semibold mt-1">
              <span>Vùng nước mặn / lợ (Nguy hại cây trồng)</span>
              <span>Vùng nước ngọt an toàn</span>
            </div>
          </div>

          {/* Water status statement */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
            <Droplet className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-slate-900">Hiện trạng sinh kế ĐBSCL:</strong>
              <p className="mt-0.5 leading-relaxed">{result.freshwaterSupplyStatus}</p>
            </div>
          </div>

          {/* Policy Recommendations (Địa lí 11 Analysis) */}
          <div>
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-indigo-600" />
              Khuyến Nghị Quyết Sách (Nghị Quyết 120/NQ-CP & Ủy Hội MRC):
            </h5>
            <div className="space-y-1.5">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
