import React, { useState } from 'react';
import { RIVER_STATIONS, RIPARIAN_COUNTRIES, GEOGRAPHY_SCOPE_DATA, MEKONG_OVERVIEW } from '../data/mekongData';
import { RiverStation, CountryInfo } from '../types';
import { 
  MapPin, 
  Droplet, 
  Mountain, 
  Info, 
  Compass, 
  ArrowDown, 
  Globe, 
  Layers, 
  Maximize2, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles,
  Navigation,
  Scale,
  Satellite
} from 'lucide-react';
import { RealMekongMap } from './RealMekongMap';
import { sounds } from '../utils/audio';

type MapViewMode = 'scope' | 'hydrology' | 'dams';

interface DamLocation {
  id: string;
  name: string;
  country: string;
  capacityMW: number;
  heightM: number;
  coordinates: { x: number; y: number };
  status: string;
}

const UPSTREAM_DAMS: DamLocation[] = [
  { id: 'dam-xiaowan', name: 'Đập Tiểu Loan (Xiaowan)', country: 'Trung Quốc', capacityMW: 4200, heightM: 292, coordinates: { x: 23, y: 19 }, status: 'Hoạt động (Đập vòm cao 292m)' },
  { id: 'dam-nuozhadu', name: 'Đập Nọa Trát Độ (Nuozhadu)', country: 'Trung Quốc', capacityMW: 5850, heightM: 261, coordinates: { x: 26, y: 24 }, status: 'Hoạt động (Dung tích hồ 23,7 tỷ m³)' },
  { id: 'dam-jinghong', name: 'Đập Cảnh Hồng (Jinghong)', country: 'Trung Quốc', capacityMW: 1750, heightM: 108, coordinates: { x: 29, y: 29 }, status: 'Hoạt động (Điều tiết xả dòng sang Lào)' },
  { id: 'dam-xayaburi', name: 'Đập Xayaburi', country: 'Lào', capacityMW: 1285, heightM: 32, coordinates: { x: 44, y: 44 }, status: 'Hoạt động (Đập dòng chính đầu tiên ở LMB)' },
  { id: 'dam-donsahong', name: 'Đập Don Sahong', country: 'Lào', capacityMW: 260, heightM: 25, coordinates: { x: 62, y: 65 }, status: 'Hoạt động (Gần Thác Khone Phapheng)' },
];

export const MekongMap: React.FC = () => {
  const [mapEngine, setMapEngine] = useState<'real' | 'schematic'>('real');
  const [viewMode, setViewMode] = useState<MapViewMode>('scope');
  const [selectedStation, setSelectedStation] = useState<RiverStation>(RIVER_STATIONS[0]);
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(RIPARIAN_COUNTRIES[5]); // Default Vietnam
  const [selectedDam, setSelectedDam] = useState<DamLocation | null>(null);
  const [activeRegionCode, setActiveRegionCode] = useState<'ALL' | 'UMB' | 'LMB'>('ALL');

  // Layer Toggles
  const [showCoordinatesGrid, setShowCoordinatesGrid] = useState<boolean>(true);
  const [showExtremePoints, setShowExtremePoints] = useState<boolean>(true);
  const [showBasinBoundary, setShowBasinBoundary] = useState<boolean>(true);
  const [showAdjacentBorders, setShowAdjacentBorders] = useState<boolean>(true);

  const handleSelectStation = (station: RiverStation) => {
    sounds.playClick();
    setSelectedStation(station);
    setSelectedDam(null);
  };

  const handleSelectCountry = (country: CountryInfo) => {
    sounds.playClick();
    setSelectedCountry(country);
  };

  const handleSelectDam = (dam: DamLocation) => {
    sounds.playClick();
    setSelectedDam(dam);
  };

  // 1. Phân Vùng Tự Nhiên (UMB vs LMB)
  const renderRegionSection = () => (
    <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
          <Compass className="w-4 h-4 text-teal-600" />
          Phân Vùng Tự Nhiên Lưu Vực
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
          Địa lí 11
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveRegionCode(activeRegionCode === 'UMB' ? 'ALL' : 'UMB');
          }}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            activeRegionCode === 'UMB'
              ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300'
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-lg">🇨🇳 🇲🇲</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">
              24% DT
            </span>
          </div>
          <h4 className="font-black text-slate-900 text-xs sm:text-sm">
            Thượng Lưu Vực (UMB)
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Lan Thương Giang • 2.429 km
          </p>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveRegionCode(activeRegionCode === 'LMB' ? 'ALL' : 'LMB');
          }}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            activeRegionCode === 'LMB'
              ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300'
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-lg">🇱🇦 🇹🇭 🇰🇭 🇻🇳</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
              76% DT
            </span>
          </div>
          <h4 className="font-black text-slate-900 text-xs sm:text-sm">
            Hạ Lưu Vực (LMB)
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Vùng Hiệp định MRC 1995 • 2.334 km
          </p>
        </button>
      </div>

      {/* Region Detail Comparison Card */}
      {activeRegionCode === 'UMB' && (
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-indigo-950">
              {GEOGRAPHY_SCOPE_DATA.regions.upperBasin.name}
            </h4>
            <span className="font-bold text-indigo-700">195.000 km²</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            <strong>Địa hình & Khí hậu:</strong> {GEOGRAPHY_SCOPE_DATA.regions.upperBasin.terrain}. {GEOGRAPHY_SCOPE_DATA.regions.upperBasin.climate}.
          </p>
          <p className="text-slate-700 leading-relaxed">
            <strong>Nguồn cung cấp nước:</strong> {GEOGRAPHY_SCOPE_DATA.regions.upperBasin.waterSource}.
          </p>
          <ul className="space-y-1 text-slate-600 pt-1">
            {GEOGRAPHY_SCOPE_DATA.regions.upperBasin.keyCharacteristics.map((char, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-indigo-600 font-bold">•</span>
                <span>{char}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeRegionCode === 'LMB' && (
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-emerald-950">
              {GEOGRAPHY_SCOPE_DATA.regions.lowerBasin.name}
            </h4>
            <span className="font-bold text-emerald-700">600.000 km²</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            <strong>Địa hình & Khí hậu:</strong> {GEOGRAPHY_SCOPE_DATA.regions.lowerBasin.terrain}. {GEOGRAPHY_SCOPE_DATA.regions.lowerBasin.climate}.
          </p>
          <p className="text-slate-700 leading-relaxed">
            <strong>Nguồn cung cấp nước:</strong> {GEOGRAPHY_SCOPE_DATA.regions.lowerBasin.waterSource}.
          </p>
          <ul className="space-y-1 text-slate-600 pt-1">
            {GEOGRAPHY_SCOPE_DATA.regions.lowerBasin.keyCharacteristics.map((char, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{char}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeRegionCode === 'ALL' && (
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
          <p className="font-bold text-slate-800 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-teal-600" />
            Quy mô giới hạn không gian lưu vực Mê Kông:
          </p>
          <p className="leading-relaxed">
            Trải dài hơn <strong>25 độ vĩ tuyến</strong> (từ 8°30'B đến 33°50'B) và hơn <strong>12 độ kinh tuyến</strong> (từ 94°00'Đ đến 106°15'Đ). 
            Sự chênh lệch cao độ từ &gt;5.000m đến 0m tạo nên sự phân hóa khí hậu, thổ nhưỡng và cảnh quan sinh thái vô cùng độc đáo giữa Thượng lưu và Hạ lưu.
          </p>
        </div>
      )}
    </div>
  );

  // 2. 6 Quốc Gia Ven Sông
  const renderCountriesSection = () => (
    <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
      <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
        <span>6 Quốc Gia Trong Phạm Vi Lưu Vực</span>
        <span className="text-xs text-slate-400 font-normal">Nhấp để xem tỷ lệ lưu vực</span>
      </h3>

      <div className="grid grid-cols-3 gap-2">
        {RIPARIAN_COUNTRIES.map((c) => {
          const isSelected = selectedCountry.id === c.id;
          return (
            <button
              key={c.id}
              id={`country-btn-${c.id}`}
              onClick={() => handleSelectCountry(c)}
              className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-teal-600 bg-teal-50 ring-1 ring-teal-500/20'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="text-xl">{c.flag}</span>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
                  {c.vietnameseName}
                </p>
                <p className="text-[10px] text-slate-500">
                  {c.basinSharePercent}% DT
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Country Profile Card */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedCountry.flag}</span>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                {selectedCountry.vietnameseName}
              </h4>
              <p className="text-[11px] text-teal-700 italic">
                Tên sông: "{selectedCountry.localRiverName}"
              </p>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            selectedCountry.mrcStatus === 'Thành viên sáng lập'
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : 'bg-amber-100 text-amber-800 border-amber-300'
          }`}>
            {selectedCountry.mrcStatus}
          </span>
        </div>

        {/* Progress Comparison Bars */}
        <div className="space-y-2 text-xs">
          <div>
            <div className="flex justify-between text-[11px] text-slate-600 mb-1">
              <span>Tỷ lệ diện tích lưu vực:</span>
              <span className="font-bold text-slate-900">{selectedCountry.basinSharePercent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${selectedCountry.basinSharePercent * 2.5}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-600 mb-1">
              <span>Tỷ lệ đóng góp dòng chảy:</span>
              <span className="font-bold text-teal-700">~ {selectedCountry.flowContributionPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-teal-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${selectedCountry.flowContributionPercent * 2.5}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {selectedCountry.description}
        </p>

        <div className="pt-1">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
            Đặc điểm nổi bật:
          </span>
          <ul className="space-y-1 text-xs text-slate-700">
            {selectedCountry.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-teal-600 font-bold">•</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // 3. Ý Nghĩa Với Việt Nam
  const renderVietnamNote = () => (
    <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 border border-teal-200 rounded-3xl p-5 space-y-2">
      <h4 className="font-black text-teal-950 text-sm flex items-center gap-2">
        <Mountain className="w-4 h-4 text-teal-600" />
        Ý Nghĩa Vị Trí Lưu Vực Đối Với Việt Nam (Địa Lí 11):
      </h4>
      <p className="text-xs text-teal-900/90 leading-relaxed">
        Việt Nam nằm ở tận cùng hạ lưu (chiếm 8% diện tích lưu vực). Do đó, hơn <strong>60% tổng lượng dòng chảy</strong> và 
        hầu như toàn bộ lượng phù sa nuôi dưỡng ĐBSCL đều phụ thuộc vào sự hợp tác nguồn nước của các quốc gia thượng nguồn. 
        Vị trí địa lí này đòi hỏi Việt Nam luôn giữ vai trò chủ động, tích cực trong <strong>Ủy hội Sông Mê Kông (MRC)</strong> và thực hiện chiến lược <strong>"Thuận thiên"</strong> (Nghị quyết 120/NQ-CP).
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Banner: Geographical Position & Basin Scope */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-cyan-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-teal-800/40">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <Compass className="w-96 h-96 text-teal-300" />
        </div>
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30">
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <span>Chuyên Đề Địa Lí 11 • Ủy Hội Sông Mê Kông (MRC)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Bản Đồ Vị Trí Địa Lí & Phạm Vi Khu Vực Sông Mê Kông
          </h1>
          <p className="text-teal-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
            Sông Mê Kông bắt nguồn từ vùng núi cao trên 5.000m thuộc cao nguyên Thanh Tạng (Tây Tạng, Trung Quốc), 
            chảy theo hướng Tây Bắc – Đông Nam qua 6 quốc gia với chiều dài khoảng 4.763 km và diện tích lưu vực 
            rộng tới 795.000 km², đổ ra Biển Đông qua hệ thống 9 cửa sông Cửu Long trù phú.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/15">
              <span className="text-[11px] text-teal-200 block font-medium">Tọa độ địa lí lưu vực:</span>
              <p className="text-sm sm:text-base font-extrabold text-white">8°30'B – 33°50'B</p>
              <span className="text-[10px] text-teal-300">94°00'Đ – 106°15'Đ</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/15">
              <span className="text-[11px] text-teal-200 block font-medium">Diện tích lưu vực:</span>
              <p className="text-sm sm:text-base font-extrabold text-amber-300">795.000 km²</p>
              <span className="text-[10px] text-slate-300">Thứ 21 trên thế giới</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/15">
              <span className="text-[11px] text-teal-200 block font-medium">Chiều dài dòng chảy:</span>
              <p className="text-sm sm:text-base font-extrabold text-white">~ 4.763 km</p>
              <span className="text-[10px] text-teal-300">Thứ 12 TG • Thứ 7 Châu Á</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/15">
              <span className="text-[11px] text-teal-200 block font-medium">Dân số phụ thuộc:</span>
              <p className="text-sm sm:text-base font-extrabold text-emerald-300">70+ Triệu người</p>
              <span className="text-[10px] text-slate-300">6 Quốc gia ven sông</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Engine Switcher */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            id="map-engine-real"
            onClick={() => {
              sounds.playClick();
              setMapEngine('real');
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              mapEngine === 'real'
                ? 'bg-slate-900 text-teal-300 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Satellite className="w-4 h-4 text-teal-400" />
            <span>1. Bản Đồ Vệ Tinh Chân Thật (Real Satellite WGS84)</span>
          </button>

          <button
            id="map-engine-schematic"
            onClick={() => {
              sounds.playClick();
              setMapEngine('schematic');
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              mapEngine === 'schematic'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>2. Sơ Đồ Phân Tích Địa Lí 11 (Schematic)</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-semibold px-1 flex items-center gap-1.5">
          {mapEngine === 'real' ? (
            <span className="flex items-center gap-1 text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Ảnh vệ tinh địa cầu độ phân giải cao Esri World Imagery & Tọa độ WGS84
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              Sơ đồ sư phạm phân tích ranh giới UMB - LMB & chuỗi thủy điện
            </span>
          )}
        </div>
      </div>

      {mapEngine === 'real' ? (
        <div className="space-y-6">
          <RealMekongMap />

          {/* Regional Analysis & 6 Countries Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              {renderCountriesSection()}
            </div>
            <div className="lg:col-span-5 space-y-4">
              {renderRegionSection()}
              {renderVietnamNote()}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* View Mode Switcher + Layer Controls */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Mode Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            id="map-mode-scope"
            onClick={() => {
              sounds.playClick();
              setViewMode('scope');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              viewMode === 'scope'
                ? 'bg-teal-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>1. Vị Trí & Phạm Vi Lưu Vực</span>
          </button>

          <button
            id="map-mode-hydrology"
            onClick={() => {
              sounds.playClick();
              setViewMode('hydrology');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              viewMode === 'hydrology'
                ? 'bg-teal-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Droplet className="w-4 h-4" />
            <span>2. Thủy Văn & Trạm Quan Trắc</span>
          </button>

          <button
            id="map-mode-dams"
            onClick={() => {
              sounds.playClick();
              setViewMode('dams');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              viewMode === 'dams'
                ? 'bg-teal-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>3. Bậc Thang Thủy Điện & Hạn Mặn</span>
          </button>
        </div>

        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 border-t md:border-t-0 pt-2 md:pt-0">
          <span className="font-bold flex items-center gap-1 text-slate-700">
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            Lớp bản đồ:
          </span>
          <button
            onClick={() => setShowCoordinatesGrid(!showCoordinatesGrid)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
              showCoordinatesGrid ? 'bg-sky-50 border-sky-300 text-sky-800' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            🌐 Lưới tọa độ
          </button>
          <button
            onClick={() => setShowExtremePoints(!showExtremePoints)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
              showExtremePoints ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            📍 4 Điểm cực
          </button>
          <button
            onClick={() => setShowBasinBoundary(!showBasinBoundary)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
              showBasinBoundary ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            📐 Viền phạm vi 795.000 km²
          </button>
        </div>
      </div>

      {/* Main Interactive Map Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Graphic Vector Map Canvas */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-600" />
                {viewMode === 'scope' && 'Bản Đồ Phân Bố Vị Trí & Ranh Giới Lưu Vực Mê Kông'}
                {viewMode === 'hydrology' && 'Mạng Lưới Dòng Chảy & Các Trạm Thủy Văn Trọng Yếu'}
                {viewMode === 'dams' && 'Phân Bố Chuỗi Thủy Điện Bậc Thang & Vùng Ranh Mặn'}
              </h2>
              <p className="text-xs text-slate-500">
                {viewMode === 'scope' && 'Xem ranh giới Thượng lưu vực (UMB), Hạ lưu vực (LMB), các điểm cực và vùng tiếp giáp.'}
                {viewMode === 'hydrology' && 'Nhấp vào các trạm quan trắc (tròn vàng) để tra cứu lưu lượng m³/giây và độ cao.'}
                {viewMode === 'dams' && 'Nhấp vào biểu tượng đập (vuông cam/đỏ) để xem công suất MW và chiều cao thân đập.'}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
              <Navigation className="w-3.5 h-3.5 text-teal-600" />
              <span>Hướng: TB - ĐN</span>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-slate-950 via-slate-900 to-sky-950 rounded-2xl overflow-hidden border border-slate-800 p-2 sm:p-4 shadow-2xl">
            {/* Compass Rose Indicator */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none flex flex-col items-center bg-slate-900/80 p-2 rounded-xl border border-slate-700 text-white shadow-lg backdrop-blur-xs">
              <span className="text-[10px] font-black text-rose-400">B (N)</span>
              <Compass className="w-6 h-6 text-teal-400 animate-spin-slow" />
              <div className="flex justify-between w-full text-[9px] text-slate-400 px-1">
                <span>T</span>
                <span>Đ</span>
              </div>
              <span className="text-[9px] text-slate-400">N (S)</span>
            </div>

            {/* Geographical Grid Lines & Coordinates Labels */}
            {showCoordinatesGrid && (
              <div className="absolute inset-0 pointer-events-none z-0">
                {/* Horizontal Latitude Lines */}
                <div className="absolute top-[8%] left-0 right-0 border-t border-sky-500/20 flex justify-between px-3 text-[9px] text-sky-400/70 font-mono">
                  <span>30° B (Bắc)</span>
                  <span>Vĩ tuyến 30°B</span>
                </div>
                <div className="absolute top-[35%] left-0 right-0 border-t border-sky-500/20 flex justify-between px-3 text-[9px] text-sky-400/70 font-mono">
                  <span>20° B (Bắc)</span>
                  <span>Vĩ tuyến 20°B (Biên giới Lào - TQ)</span>
                </div>
                <div className="absolute top-[70%] left-0 right-0 border-t border-sky-500/20 flex justify-between px-3 text-[9px] text-sky-400/70 font-mono">
                  <span>10° B (Bắc)</span>
                  <span>Vĩ tuyến 10°B (ĐBSCL Việt Nam)</span>
                </div>

                {/* Vertical Longitude Lines */}
                <div className="absolute top-0 bottom-0 left-[25%] border-l border-sky-500/15 flex flex-col justify-end pb-2 pl-1 text-[9px] text-sky-400/60 font-mono">
                  <span>95° Đ</span>
                </div>
                <div className="absolute top-0 bottom-0 left-[55%] border-l border-sky-500/15 flex flex-col justify-end pb-2 pl-1 text-[9px] text-sky-400/60 font-mono">
                  <span>100° Đ</span>
                </div>
                <div className="absolute top-0 bottom-0 left-[80%] border-l border-sky-500/15 flex flex-col justify-end pb-2 pl-1 text-[9px] text-sky-400/60 font-mono">
                  <span>105° Đ</span>
                </div>
              </div>
            )}

            {/* Adjacent Geographical Areas (Water & Mountains) */}
            {showAdjacentBorders && (
              <div className="absolute inset-0 pointer-events-none z-10 text-[10px] font-bold">
                {/* North: Tibet Plateau */}
                <div className="absolute top-3 left-4 text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                  🏔️ Cao nguyên Thanh – Tạng (&gt;5.000m)
                </div>
                {/* West: Salween & Thailand */}
                <div className="absolute top-[48%] left-2 text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  ← Lưu vực sông Salween & Chao Phraya
                </div>
                {/* East: Annamite Range */}
                <div className="absolute top-[42%] right-2 text-amber-200/80 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                  Dãy Trường Sơn (Biên giới Việt - Lào) →
                </div>
                {/* Southwest: Gulf of Thailand */}
                <div className="absolute bottom-16 left-3 text-cyan-300 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/50">
                  🌊 Vịnh Thái Lan
                </div>
                {/* Southeast: South China Sea */}
                <div className="absolute bottom-3 right-4 text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-700 shadow-md">
                  🌊 BIỂN ĐÔNG (Thái Bình Dương)
                </div>
              </div>
            )}

            {/* SVG Render Stage */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full relative z-10"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Gradients */}
                <linearGradient id="riverStreamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="30%" stopColor="#06b6d4" />
                  <stop offset="65%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>

                <linearGradient id="upperBasinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.10" />
                </linearGradient>

                <linearGradient id="lowerBasinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.12" />
                </linearGradient>

                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* BASIN BOUNDARY POLYGONS */}
              {showBasinBoundary && (
                <g>
                  {/* Upper Mekong Basin (UMB - 24% Area) */}
                  <polygon
                    points="14,6 26,6 31,18 34,30 40,36 34,40 22,32 16,18"
                    fill="url(#upperBasinGrad)"
                    stroke="#818cf8"
                    strokeWidth="0.6"
                    strokeDasharray="1.5,1"
                    className="transition-all"
                  />
                  <text x="16" y="14" fill="#a5b4fc" fontSize="2.3" fontWeight="bold">
                    UMB: Thượng Lưu Vực (24% DT)
                  </text>

                  {/* Lower Mekong Basin (LMB - 76% Area) */}
                  <polygon
                    points="40,36 58,40 70,50 78,64 80,78 88,94 72,96 58,86 48,82 46,62 38,44"
                    fill="url(#lowerBasinGrad)"
                    stroke="#34d399"
                    strokeWidth="0.8"
                    strokeDasharray="2,1"
                  />
                  <text x="48" y="58" fill="#6ee7b7" fontSize="2.5" fontWeight="bold">
                    LMB: Hạ Lưu Vực (76% DT - Vùng MRC)
                  </text>
                </g>
              )}

              {/* TRIBUTARY RIVERS (Phụ lưu lớn) */}
              {/* Nam Ou (Lào) */}
              <path d="M 44,38 Q 42,42 46,45" fill="none" stroke="#38bdf8" strokeWidth="0.9" opacity="0.7" />
              <text x="36" y="44" fill="#93c5fd" fontSize="1.8">S. Nam Ou</text>

              {/* Sông Mun / Chi (Thái Lan) */}
              <path d="M 48,56 Q 54,58 60,60" fill="none" stroke="#38bdf8" strokeWidth="1.1" opacity="0.8" />
              <text x="46" y="55" fill="#93c5fd" fontSize="1.8">S. Mun (Thái Lan)</text>

              {/* Sông Sê San - Sông Sơ-rê-pôk - Sê Kông (3S Basin: Lào - Cam - VN) */}
              <path d="M 76,64 Q 70,68 64,72" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />
              <text x="73" y="68" fill="#93c5fd" fontSize="1.8">Lưu vực 3S</text>

              {/* MAIN MEKONG RIVER STEM (Dòng chính Mê Kông 4.763 km) */}
              <path
                d="M 18,8 
                   C 22,16 24,20 28,26 
                   C 32,32 33,36 38,38 
                   C 44,42 46,45 50,47 
                   C 56,52 58,58 62,64 
                   C 64,70 65,74 67,76 
                   C 70,80 72,82 74,84 
                   C 76,87 78,89 82,92"
                fill="none"
                stroke="url(#riverStreamGrad)"
                strokeWidth="2.8"
                strokeLinecap="round"
                filter="url(#glowFilter)"
              />

              {/* Tonle Sap Lake (Biển Hồ Campuchia) */}
              <path
                d="M 67,76 C 59,73 52,70 48,74 C 48,80 57,81 67,76"
                fill="#0284c7"
                fillOpacity="0.45"
                stroke="#38bdf8"
                strokeWidth="0.9"
              />
              <text x="47" y="73" fill="#7dd3fc" fontSize="2.4" fontWeight="bold">
                Biển Hồ (Tonle Sap)
              </text>

              {/* Vietnam Mekong Delta: 9 Estuaries (Chín nhánh Cửu Long) */}
              <g stroke="#10b981" strokeWidth="1.1" strokeLinecap="round">
                {/* Sông Tiền & 6 cửa */}
                <path d="M 74,84 L 79,91" />
                <path d="M 74,84 L 81,92" />
                <path d="M 74,84 L 83,93" />
                <path d="M 74,84 L 85,93" />
                {/* Sông Hậu & 3 cửa */}
                <path d="M 74,84 L 77,93" />
                <path d="M 74,84 L 79,95" />
                <path d="M 74,84 L 82,96" />
              </g>
              <text x="73" y="98" fill="#34d399" fontSize="2.3" fontWeight="bold">
                ĐBSCL (9 Cửa Sông Cửu Long)
              </text>

              {/* SALINITY INTRUSION ZONE (Ranh mặn 4g/lít) in DAMS Mode */}
              {viewMode === 'dams' && (
                <g>
                  <path
                    d="M 70,91 Q 76,88 84,90 Q 86,95 76,96 Z"
                    fill="#f43f5e"
                    fillOpacity="0.3"
                    stroke="#f43f5e"
                    strokeWidth="0.7"
                    strokeDasharray="1,1"
                  />
                  <text x="64" y="90" fill="#fda4af" fontSize="2.1" fontWeight="bold">
                    ⚠️ Ranh mặn 4g/l xâm nhập 60-90km
                  </text>
                </g>
              )}

              {/* 4 EXTREME POINTS (Điểm cực giới hạn phạm vi) */}
              {showExtremePoints && (
                <g>
                  {/* Cực Bắc: 33°50'B */}
                  <g className="cursor-pointer">
                    <circle cx="18" cy="8" r="2.2" fill="#ef4444" stroke="#ffffff" strokeWidth="0.8" />
                    <text x="21" y="8" fill="#fca5a5" fontSize="2.3" fontWeight="bold">
                      CỰC BẮC: 33°50'B (Tanggula)
                    </text>
                  </g>

                  {/* Cực Nam: 8°30'B */}
                  <g className="cursor-pointer">
                    <circle cx="75" cy="95" r="2.2" fill="#ef4444" stroke="#ffffff" strokeWidth="0.8" />
                    <text x="50" y="96" fill="#fca5a5" fontSize="2.3" fontWeight="bold">
                      CỰC NAM: 8°30'B (Mũi Cà Mau)
                    </text>
                  </g>

                  {/* Cực Tây: 94°00'Đ */}
                  <g className="cursor-pointer">
                    <circle cx="15" cy="12" r="1.8" fill="#f59e0b" stroke="#ffffff" strokeWidth="0.6" />
                    <text x="3" y="16" fill="#fde68a" fontSize="2.1">
                      CỰC TÂY: 94°00'Đ
                    </text>
                  </g>

                  {/* Cực Đông: 106°15'Đ */}
                  <g className="cursor-pointer">
                    <circle cx="85" cy="92" r="1.8" fill="#f59e0b" stroke="#ffffff" strokeWidth="0.6" />
                    <text x="73" y="89" fill="#fde68a" fontSize="2.1">
                      CỰC ĐÔNG: 106°15'Đ
                    </text>
                  </g>
                </g>
              )}

              {/* HYDROLOGY STATIONS MARKERS (In Hydrology or Scope View) */}
              {(viewMode === 'hydrology' || viewMode === 'scope') &&
                RIVER_STATIONS.map((st) => {
                  const isSelected = selectedStation.id === st.id;
                  return (
                    <g 
                      key={st.id} 
                      className="cursor-pointer transition-transform hover:scale-125"
                      onClick={() => handleSelectStation(st)}
                    >
                      {isSelected && (
                        <circle
                          cx={st.coordinates.x}
                          cy={st.coordinates.y}
                          r="3.8"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="0.9"
                          className="animate-ping"
                        />
                      )}
                      <circle
                        cx={st.coordinates.x}
                        cy={st.coordinates.y}
                        r={isSelected ? "2.4" : "1.6"}
                        fill={isSelected ? "#38bdf8" : "#ffffff"}
                        stroke="#0f172a"
                        strokeWidth="0.8"
                      />
                      <text
                        x={st.coordinates.x + 3}
                        y={st.coordinates.y + 0.8}
                        fill={isSelected ? "#7dd3fc" : "#e2e8f0"}
                        fontSize="2.1"
                        fontWeight={isSelected ? "bold" : "normal"}
                      >
                        {st.name.split('(')[0]}
                      </text>
                    </g>
                  );
                })}

              {/* UPSTREAM DAMS MARKERS (In Dams View) */}
              {viewMode === 'dams' &&
                UPSTREAM_DAMS.map((dam) => {
                  const isSelected = selectedDam?.id === dam.id;
                  return (
                    <g
                      key={dam.id}
                      className="cursor-pointer transition-transform hover:scale-125"
                      onClick={() => handleSelectDam(dam)}
                    >
                      {isSelected && (
                        <rect
                          x={dam.coordinates.x - 3}
                          y={dam.coordinates.y - 3}
                          width="6"
                          height="6"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="0.8"
                          className="animate-pulse"
                        />
                      )}
                      <rect
                        x={dam.coordinates.x - 1.8}
                        y={dam.coordinates.y - 1.8}
                        width="3.6"
                        height="3.6"
                        fill={isSelected ? "#f59e0b" : "#ef4444"}
                        stroke="#ffffff"
                        strokeWidth="0.6"
                      />
                      <text
                        x={dam.coordinates.x + 3}
                        y={dam.coordinates.y + 1}
                        fill={isSelected ? "#fde68a" : "#fca5a5"}
                        fontSize="2.1"
                        fontWeight="bold"
                      >
                        ⚡ {dam.name.split('(')[0]}
                      </text>
                    </g>
                  );
                })}
            </svg>

            {/* Quick Flow Hint / Scale Bar */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 backdrop-blur-xs">
              <Scale className="w-3.5 h-3.5 text-teal-400" />
              <span>Tỷ lệ xích: 0 ——— 500 km</span>
            </div>
          </div>

          {/* Selected Station / Dam Detail Card */}
          <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {selectedDam ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      {selectedDam.name} ({selectedDam.country})
                    </h3>
                    <p className="text-xs text-slate-600">{selectedDam.status}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[11px] text-slate-500">Công suất phát điện:</span>
                  <p className="font-extrabold text-amber-600 text-sm">
                    {selectedDam.capacityMW.toLocaleString()} MW • Cao {selectedDam.heightM}m
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">
                      {selectedStation.name}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {selectedStation.country} • Độ cao: {selectedStation.elevationM}m • Cách ngọn nguồn: {selectedStation.distanceFromSourceKm} km
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[11px] text-slate-500">Lưu lượng xả ước tính:</span>
                  <p className="font-extrabold text-teal-700 text-sm">
                    ~ {selectedStation.flowM3s.toLocaleString()} m³/giây
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Geographical Scope & Region Breakdown (Địa lí 11) */}
        <div className="lg:col-span-5 space-y-4">
          {renderRegionSection()}
          {renderCountriesSection()}
          {renderVietnamNote()}
        </div>
      </div>
    </div>
  )}

      {/* Comprehensive Geography 11 Deep Dive Table: Scope & Location Analysis */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-teal-600" />
              Bảng Tổng Hợp Vị Trí Địa Lí & Phạm Vi Khu Vực (Chuẩn SGK Địa Lí 11)
            </h3>
            <p className="text-xs text-slate-500">
              Hệ thống hóa kiến thức phục vụ học tập, ôn thi và kiểm tra chuyên đề Sông Mê Kông
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
            Tổng diện tích: 795.000 km²
          </span>
        </div>

        {/* 4 Cards: Geographical Boundaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-teal-700 block mb-1">1. Tọa độ giới hạn</span>
            <p className="text-sm font-extrabold text-slate-900">8°30'B — 33°50'B</p>
            <p className="text-xs text-slate-600 mt-1">
              Trải dài hơn 25 vĩ độ và 12 kinh độ (94°00'Đ đến 106°15'Đ), tạo nên tính đa dạng khí hậu từ hàn đới núi cao đến nhiệt đới gió mùa ẩm.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-teal-700 block mb-1">2. Hướng dòng chảy chính</span>
            <p className="text-sm font-extrabold text-slate-900">Tây Bắc — Đông Nam</p>
            <p className="text-xs text-slate-600 mt-1">
              Chảy theo hướng nghiêng chung của địa hình khu vực, từ cao nguyên Thanh Tạng dốc xuống các thung lũng đứt gãy và đồng bằng ven biển.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-teal-700 block mb-1">3. Phạm vi tiếp giáp</span>
            <p className="text-sm font-extrabold text-slate-900">Đông Á & Đông Nam Á</p>
            <p className="text-xs text-slate-600 mt-1">
              Phía Bắc giáp lưu vực Hoàng Hà, Trường Giang; phía Tây giáp lưu vực sông Salween & Chao Phraya; phía Đông và Nam giáp Biển Đông.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-teal-700 block mb-1">4. Vai trò sinh thái & kinh tế</span>
            <p className="text-sm font-extrabold text-slate-900">Huyết mạch 70+ triệu dân</p>
            <p className="text-xs text-slate-600 mt-1">
              Là hệ thống sông nước ngọt đa dạng thứ 2 thế giới, nguồn cung cấp lúa gạo và thủy sản nước ngọt quan trọng bậc nhất hành tinh.
            </p>
          </div>
        </div>

        {/* Detailed Comparison Table: UMB vs LMB */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3.5">Tiêu chí phân tích</th>
                <th className="p-3.5 bg-indigo-50/80 text-indigo-900">Thượng lưu vực (UMB - Lan Thương)</th>
                <th className="p-3.5 bg-emerald-50/80 text-emerald-900">Hạ lưu vực (LMB - Vùng MRC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">Các quốc gia</td>
                <td className="p-3.5">Trung Quốc (Thanh Hải, Tây Tạng, Vân Nam) và Myanmar</td>
                <td className="p-3.5 font-semibold text-emerald-900">Lào, Thái Lan, Campuchia, Việt Nam</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">Diện tích & Tỷ lệ</td>
                <td className="p-3.5">195.000 km² (~ 24% tổng diện tích lưu vực)</td>
                <td className="p-3.5 font-semibold text-emerald-900">600.000 km² (~ 76% tổng diện tích lưu vực)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">Chiều dài dòng sông</td>
                <td className="p-3.5">~ 2.429 km (chiếm hơn 50% chiều dài dòng chính)</td>
                <td className="p-3.5 font-semibold text-emerald-900">~ 2.334 km (từ Tam Giác Vàng đổ ra Biển Đông)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">Độ cao & Địa hình</td>
                <td className="p-3.5">&gt; 5.000m xuống 500m. Hẻm núi sâu dốc, Tam Giang Song Hành</td>
                <td className="p-3.5">500m xuống 0m. Cao nguyên Khorat, trũng Biển Hồ và châu thổ ĐBSCL</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">Nguồn cấp nước chính</td>
                <td className="p-3.5">Băng tuyết tan (mùa hè) kết hợp mưa núi</td>
                <td className="p-3.5">Mưa gió mùa nhiệt đới trên các phụ lưu lớn (Nam Ou, 3S, Sông Mun)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">Khung khổ thể chế</td>
                <td className="p-3.5">Đối tác Đối thoại của MRC (từ năm 1996)</td>
                <td className="p-3.5 font-semibold text-emerald-900">4 Quốc gia thành viên ký Hiệp định Mê Kông 1995</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">Vấn đề trọng tâm</td>
                <td className="p-3.5">Chuỗi đập thủy điện bậc thang giữ phù sa và điều tiết dòng chảy</td>
                <td className="p-3.5">An ninh nguồn nước, đạm cá thủy sản, sạt lở bờ sông và xâm nhập mặn ĐBSCL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
