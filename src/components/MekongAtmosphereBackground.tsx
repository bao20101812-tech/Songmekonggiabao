import React, { useState, useEffect, useMemo } from 'react';
import { 
  Palette, 
  Sparkles, 
  Waves, 
  Sun, 
  Moon, 
  Leaf, 
  Droplets, 
  Sliders, 
  Check,
  X,
  Compass,
  Eye
} from 'lucide-react';
import { sounds } from '../utils/audio';

export type BgThemeType = 'alluvial' | 'dawn' | 'night' | 'emerald';
export type BgIntensity = 'subtle' | 'moderate' | 'vibrant';

interface ThemeConfig {
  id: BgThemeType;
  name: string;
  tagline: string;
  icon: React.ElementType;
  gradientClass: string;
  orb1: string;
  orb2: string;
  orb3: string;
  riverStroke: string;
  contourStroke: string;
  accentColor: string;
  particleColor: string;
}

const THEMES: Record<BgThemeType, ThemeConfig> = {
  alluvial: {
    id: 'alluvial',
    name: 'Dòng Phù Sa Cửu Long',
    tagline: 'Hòa quyện nước ngọc lam & ánh vàng phù sa sông Mẹ',
    icon: Droplets,
    gradientClass: 'from-amber-50/70 via-teal-50/50 to-sky-100/60',
    orb1: 'bg-gradient-to-tr from-amber-400/25 to-yellow-300/20',
    orb2: 'bg-gradient-to-br from-teal-400/25 to-emerald-300/20',
    orb3: 'bg-gradient-to-tr from-cyan-400/20 to-sky-300/25',
    riverStroke: 'rgba(13, 148, 136, 0.22)',
    contourStroke: 'rgba(217, 119, 6, 0.18)',
    accentColor: 'text-amber-600',
    particleColor: 'bg-amber-400/60',
  },
  dawn: {
    id: 'dawn',
    name: 'Bình Minh Đất Chín Rồng',
    tagline: 'Sắc hồng cam rực rỡ phản chiếu 9 cửa sông vươn biển lớn',
    icon: Sun,
    gradientClass: 'from-orange-50/70 via-rose-50/50 to-cyan-50/70',
    orb1: 'bg-gradient-to-tr from-rose-400/25 to-orange-300/25',
    orb2: 'bg-gradient-to-br from-amber-400/25 to-yellow-200/25',
    orb3: 'bg-gradient-to-tr from-cyan-400/20 to-teal-300/20',
    riverStroke: 'rgba(225, 29, 72, 0.18)',
    contourStroke: 'rgba(234, 88, 12, 0.20)',
    accentColor: 'text-rose-600',
    particleColor: 'bg-rose-400/60',
  },
  night: {
    id: 'night',
    name: 'Đêm Huyền Ảo Vàm Sông',
    tagline: 'Màn đêm sâu thẳm với ánh đom đóm nước lấp lánh',
    icon: Moon,
    gradientClass: 'from-slate-900/90 via-indigo-950/80 to-slate-950/95',
    orb1: 'bg-gradient-to-tr from-teal-500/20 to-cyan-400/20',
    orb2: 'bg-gradient-to-br from-indigo-500/25 to-blue-400/20',
    orb3: 'bg-gradient-to-tr from-emerald-400/20 to-teal-300/15',
    riverStroke: 'rgba(45, 212, 191, 0.28)',
    contourStroke: 'rgba(99, 102, 241, 0.25)',
    accentColor: 'text-cyan-400',
    particleColor: 'bg-teal-300/70',
  },
  emerald: {
    id: 'emerald',
    name: 'Rừng Tràm & Sinh Thái Xanh',
    tagline: 'Xanh ngọc bích của rừng ngập mặn U Minh & sen Tháp Mười',
    icon: Leaf,
    gradientClass: 'from-emerald-50/70 via-teal-50/60 to-lime-50/50',
    orb1: 'bg-gradient-to-tr from-emerald-400/25 to-teal-300/25',
    orb2: 'bg-gradient-to-br from-lime-400/20 to-green-300/20',
    orb3: 'bg-gradient-to-tr from-teal-500/20 to-cyan-300/20',
    riverStroke: 'rgba(5, 150, 105, 0.22)',
    contourStroke: 'rgba(13, 148, 136, 0.20)',
    accentColor: 'text-emerald-600',
    particleColor: 'bg-emerald-400/60',
  },
};

export const MekongAtmosphereBackground: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<BgThemeType>(() => {
    try {
      const saved = localStorage.getItem('mekong_bg_theme') as BgThemeType;
      return saved && THEMES[saved] ? saved : 'alluvial';
    } catch {
      return 'alluvial';
    }
  });

  const [intensity, setIntensity] = useState<BgIntensity>(() => {
    try {
      const saved = localStorage.getItem('mekong_bg_intensity') as BgIntensity;
      return saved || 'moderate';
    } catch {
      return 'moderate';
    }
  });

  const [showWaves, setShowWaves] = useState<boolean>(true);
  const [showParticles, setShowParticles] = useState<boolean>(true);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  const activeTheme = THEMES[currentTheme];

  const handleSelectTheme = (themeId: BgThemeType) => {
    sounds.playClick();
    setCurrentTheme(themeId);
    try {
      localStorage.setItem('mekong_bg_theme', themeId);
    } catch {}
  };

  const handleSelectIntensity = (lvl: BgIntensity) => {
    sounds.playClick();
    setIntensity(lvl);
    try {
      localStorage.setItem('mekong_bg_intensity', lvl);
    } catch {}
  };

  // Generate stable particle coordinates
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: (i * 17 + 7) % 100,
      y: (i * 23 + 13) % 100,
      size: 3 + (i % 4) * 2,
      duration: 8 + (i % 5) * 3,
      delay: (i % 6) * 1.5,
    }));
  }, []);

  const opacityMultiplier = intensity === 'subtle' ? 'opacity-40' : intensity === 'vibrant' ? 'opacity-90' : 'opacity-65';

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* FIXED ATMOSPHERE BACKGROUND LAYER (Behind all app views)       */}
      {/* ------------------------------------------------------------- */}
      <div 
        id="mekong-atmosphere-backdrop"
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-colors duration-1000 select-none"
        aria-hidden="true"
      >
        {/* Base Ambient Flow Mesh */}
        <div className={`absolute inset-0 bg-gradient-to-br ${activeTheme.gradientClass} transition-all duration-1000`} />

        {/* Ambient Floating Luminous Orbs */}
        <div className={`absolute inset-0 ${opacityMultiplier} transition-opacity duration-700`}>
          {/* Orb 1 - Top Right Current */}
          <div 
            className={`absolute -top-32 -right-32 w-96 sm:w-[540px] h-96 sm:h-[540px] rounded-full blur-3xl ${activeTheme.orb1} animate-pulse`}
            style={{ animationDuration: '9s' }}
          />

          {/* Orb 2 - Lower Left Delta */}
          <div 
            className={`absolute -bottom-36 -left-36 w-96 sm:w-[600px] h-96 sm:h-[600px] rounded-full blur-3xl ${activeTheme.orb2} animate-pulse`}
            style={{ animationDuration: '11s', animationDelay: '2s' }}
          />

          {/* Orb 3 - Mid Basin Floating Shimmer */}
          <div 
            className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full blur-3xl ${activeTheme.orb3} animate-pulse`}
            style={{ animationDuration: '14s', animationDelay: '4s' }}
          />
        </div>

        {/* Topographic & River Meander Waves SVG */}
        {showWaves && (
          <svg
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${opacityMultiplier}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mekongRiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentTheme === 'night' ? '#38bdf8' : '#0d9488'} stopOpacity="0.4" />
                <stop offset="50%" stopColor={currentTheme === 'night' ? '#2dd4bf' : '#d97706'} stopOpacity="0.3" />
                <stop offset="100%" stopColor={currentTheme === 'night' ? '#818cf8' : '#0284c7'} stopOpacity="0.4" />
              </linearGradient>

              <pattern id="riverWaterRipples" width="100" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 0 20 Q 25 10, 50 20 T 100 20"
                  fill="none"
                  stroke={activeTheme.contourStroke}
                  strokeWidth="0.75"
                  strokeDasharray="4 6"
                />
              </pattern>
            </defs>

            {/* Subtle River Water Ripple Grid */}
            <rect width="100%" height="100%" fill="url(#riverWaterRipples)" opacity="0.35" />

            {/* Topographic Contour Lines representing the Mekong Basin Elevation (Plateau to Delta) */}
            <g fill="none" stroke={activeTheme.contourStroke} strokeWidth="1.2">
              <path d="M-100,120 C200,60 400,240 800,140 C1100,50 1300,180 1600,80" opacity="0.6" />
              <path d="M-100,260 C180,180 460,340 880,220 C1200,140 1380,310 1600,190" opacity="0.5" />
              <path d="M-100,420 C260,320 520,490 940,360 C1260,260 1420,440 1600,340" opacity="0.45" />
              <path d="M-100,580 C320,460 600,640 1020,510 C1320,410 1460,590 1600,490" opacity="0.4" />
              <path d="M-100,740 C380,620 680,790 1100,660 C1380,560 1500,740 1600,640" opacity="0.35" />
            </g>

            {/* Mighty Mekong River Ribbon Stream with Tributaries (Dòng Chảy Sông Mẹ uốn lượn) */}
            <g fill="none" className="animate-water-drift">
              {/* Main River Trunk Stream */}
              <path
                d="M 320,-50 C 420,150 280,300 520,480 C 680,600 780,700 920,820 C 1040,920 1200,980 1500,950"
                stroke="url(#mekongRiverGrad)"
                strokeWidth={intensity === 'vibrant' ? '18' : '12'}
                strokeLinecap="round"
                opacity="0.65"
              />

              {/* Glowing Inner River Current */}
              <path
                d="M 320,-50 C 420,150 280,300 520,480 C 680,600 780,700 920,820 C 1040,920 1200,980 1500,950"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray="16 28"
                opacity="0.6"
              />

              {/* Tonle Sap & Nine Dragons Delta Estuary Branches (9 Nhánh Sông Cửu Long) */}
              <path
                d="M 520,480 C 420,540 340,610 260,680"
                stroke={activeTheme.riverStroke}
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M 780,700 C 860,740 980,760 1120,770"
                stroke={activeTheme.riverStroke}
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.55"
              />
              <path
                d="M 920,820 C 980,870 1060,910 1180,940"
                stroke={activeTheme.riverStroke}
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M 920,820 C 880,880 940,940 1020,980"
                stroke={activeTheme.riverStroke}
                strokeWidth="5.5"
                strokeLinecap="round"
                opacity="0.5"
              />
            </g>

            {/* Cultural & Geographic River Motif Emblem in Corner */}
            <g transform="translate(1360, 40) scale(0.65)" opacity={intensity === 'vibrant' ? '0.55' : '0.35'}>
              <circle cx="50" cy="50" r="45" fill="none" stroke={activeTheme.contourStroke} strokeWidth="2" />
              <circle cx="50" cy="50" r="35" fill="none" stroke={activeTheme.riverStroke} strokeWidth="1" strokeDasharray="3 4" />
              <path d="M 50 15 L 50 85 M 15 50 L 85 50" stroke={activeTheme.contourStroke} strokeWidth="1.5" />
              <polygon points="50,10 56,25 50,21 44,25" fill={currentTheme === 'night' ? '#38bdf8' : '#0d9488'} />
            </g>
          </svg>
        )}

        {/* Floating Glowing Motes & Silt Droplets (Đom đóm & Bụi phù sa lấp lánh) */}
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <span
                key={p.id}
                className={`absolute rounded-full ${activeTheme.particleColor} blur-2xs transition-all animate-pulse`}
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  boxShadow: `0 0 10px ${currentTheme === 'night' ? 'rgba(56, 189, 248, 0.6)' : 'rgba(245, 158, 11, 0.4)'}`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FLOATING THEME SELECTOR BUTTON & QUICK CUSTOMIZER PANEL        */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed bottom-6 left-6 z-40">
        {!isPanelOpen ? (
          <button
            id="open-bg-customizer-btn"
            onClick={() => {
              sounds.playClick();
              setIsPanelOpen(true);
            }}
            title="Tùy chỉnh trang trí nền đặc sắc Mê Kông"
            className="group flex items-center gap-2 px-3.5 py-2.5 bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-lg hover:shadow-xl border border-teal-200/80 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-teal-500 to-amber-400 flex items-center justify-center text-white shadow-2xs group-hover:rotate-45 transition-transform">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <span className="text-xs font-black block leading-none text-slate-800 flex items-center gap-1">
                <span>Nền: {activeTheme.name.split(' ')[0]} {activeTheme.name.split(' ')[1]}</span>
                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
              </span>
            </div>
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border border-slate-200 text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-amber-400 flex items-center justify-center text-white shadow-xs">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                    Trang Trí Nền Đặc Sắc
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Cảnh quan & Dòng chảy Sông Mê Kông
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsPanelOpen(false);
                }}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Thematic Background Presets */}
            <div className="mt-3.5 space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Chọn phong cách cảnh quan:
              </label>

              <div className="grid grid-cols-1 gap-2">
                {(Object.values(THEMES) as ThemeConfig[]).map((thm) => {
                  const Icon = thm.icon;
                  const isSelected = currentTheme === thm.id;
                  return (
                    <button
                      key={thm.id}
                      onClick={() => handleSelectTheme(thm.id)}
                      className={`w-full p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-50/80 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-extrabold truncate ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
                            {thm.name}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-teal-600 shrink-0" />}
                        </div>
                        <p className="text-[10.5px] text-slate-500 line-clamp-1 mt-0.5">
                          {thm.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Controls: Intensity & Toggles */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
              {/* Intensity Picker */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-teal-600" />
                    Độ đậm nổi bật:
                  </span>
                  <span className="text-[10px] text-slate-400 capitalize">
                    {intensity === 'subtle' ? 'Dịu nhẹ' : intensity === 'moderate' ? 'Vừa vặn' : 'Nổi bật rực rỡ'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {(['subtle', 'moderate', 'vibrant'] as BgIntensity[]).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => handleSelectIntensity(lvl)}
                      className={`py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        intensity === lvl
                          ? 'bg-white text-teal-800 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {lvl === 'subtle' ? 'Dịu nhẹ' : lvl === 'moderate' ? 'Tiêu chuẩn' : 'Rực rỡ'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setShowWaves(!showWaves);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    showWaves 
                      ? 'bg-teal-50 text-teal-700 border-teal-200' 
                      : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  <Waves className="w-3.5 h-3.5" />
                  <span>Dòng chảy Sông Mẹ</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setShowParticles(!showParticles);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    showParticles 
                      ? 'bg-amber-50 text-amber-700 border-amber-200' 
                      : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bụi Phù Sa / Đom Đóm</span>
                </button>
              </div>
            </div>

            {/* Hint Footer */}
            <div className="mt-3 pt-2 text-center text-[10.5px] text-slate-400 flex items-center justify-center gap-1">
              <Compass className="w-3 h-3 text-teal-600" />
              <span>Cảm hứng từ 6 quốc gia lưu vực & Đồng bằng sông Cửu Long</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
