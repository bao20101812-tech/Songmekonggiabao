import React from 'react';
import { EducationLevel, TabType } from '../types';
import { 
  Waves, 
  Map, 
  Gamepad2, 
  BookOpen, 
  Landmark, 
  GraduationCap, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Compass,
  Bot,
  Palette
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { KIEN_SANG_AVATAR } from '../assets/mascot';

interface HeaderProps {
  currentLevel: EducationLevel;
  onLevelChange: (level: EducationLevel) => void;
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenPromptBuilder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLevel,
  onLevelChange,
  currentTab,
  onTabChange,
  soundEnabled,
  onToggleSound,
  onOpenPromptBuilder,
}) => {
  const handleTabClick = (tab: TabType) => {
    sounds.playClick();
    onTabChange(tab);
  };

  const handleLevelClick = (level: EducationLevel) => {
    sounds.playClick();
    onLevelChange(level);
  };

  const levelConfigs = [
    { id: 'tieuhoc' as EducationLevel, label: 'Tiểu học', badge: 'Lớp 1-5', color: 'from-amber-500 to-orange-500' },
    { id: 'thcs' as EducationLevel, label: 'THCS', badge: 'Lớp 6-9', color: 'from-emerald-500 to-teal-600' },
    { id: 'thpt' as EducationLevel, label: 'THPT', badge: 'Địa lí 11', color: 'from-blue-600 to-cyan-600' },
  ];

  const tabs = [
    { id: 'overview' as TabType, label: 'Tổng quan Sông', icon: Waves },
    { id: 'map' as TabType, label: 'Bản đồ Vị trí & Phạm vi', icon: Map },
    { id: 'games' as TabType, label: 'Game Tương tác', icon: Gamepad2 },
    { id: 'chatbot' as TabType, label: 'Trò Chuyện Cùng Kiến Sáng 🎙️', icon: Bot, isNew: true, highlight: true },
    { id: 'mrc' as TabType, label: 'Ủy hội Mê Kông (MRC)', icon: Landmark },
    { id: 'vietnam' as TabType, label: 'ĐBSCL & Việt Nam', icon: Compass },
    { id: 'quiz' as TabType, label: 'Trắc nghiệm & Đấu trí', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleTabClick('overview')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            id="app-logo-button"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Waves className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-800 text-base sm:text-lg tracking-tight">
                  Mekong River
                </span>
                <span className="bg-teal-50 text-teal-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-teal-200">
                  Địa lí 11 & MRC
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Hành trình dòng sông mẹ & Liên hệ thực tiễn Việt Nam
              </p>
            </div>
          </div>

          {/* Education Level Switcher (Tabs according to requested school grades) */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
            {levelConfigs.map((lvl) => {
              const isActive = currentLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  id={`level-btn-${lvl.id}`}
                  onClick={() => handleLevelClick(lvl.id)}
                  className={`relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-slate-800 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <GraduationCap className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{lvl.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {lvl.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Tools: Theme, Sound & Prompt Builder Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              id="header-bg-theme-btn"
              onClick={() => {
                sounds.playClick();
                document.getElementById('open-bg-customizer-btn')?.click();
              }}
              title="Trang trí nền đặc sắc Mê Kông"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-600 hover:text-teal-800 hover:bg-teal-50 rounded-lg text-xs font-semibold border border-transparent hover:border-teal-200 transition-all cursor-pointer"
            >
              <Palette className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">Nền đặc sắc</span>
            </button>

            <button
              id="toggle-sound-btn"
              onClick={onToggleSound}
              title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-teal-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
            </button>

            <button
              id="open-prompt-builder-btn"
              onClick={onOpenPromptBuilder}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 text-white rounded-lg text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tạo Prompt AI Studio</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 -mb-px border-t border-slate-100 text-xs sm:text-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-nav-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 font-semibold shadow-xs border border-teal-200/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.id === 'chatbot' ? (
                  <img
                    src={KIEN_SANG_AVATAR}
                    alt="Kiến Sáng"
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-full object-cover border border-amber-500 shadow-2xs"
                  />
                ) : (
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                )}
                <span>{tab.label}</span>
                {tab.isNew && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs">
                    AI
                  </span>
                )}
                {tab.highlight && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                )}
              </button>
            );
          })}
          
          <button
            id="mobile-prompt-tab-btn"
            onClick={onOpenPromptBuilder}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-teal-700 bg-teal-50 border border-teal-200 whitespace-nowrap ml-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Prompt AI</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
