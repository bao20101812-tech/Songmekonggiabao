import React, { useState } from 'react';
import { MillionaireGame } from './MillionaireGame';
import { HighSchoolSimulator } from './HighSchoolSimulator';
import { sounds } from '../../utils/audio';
import { Trophy, Sliders, Sparkles, Scale, GraduationCap } from 'lucide-react';

export const HighSchoolGameHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'millionaire' | 'simulator'>('millionaire');

  return (
    <div className="space-y-6">
      {/* Sub-tab switcher for High School (Địa lí 11) */}
      <div className="bg-white rounded-2xl p-2 sm:p-2.5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 pl-2">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
          <span className="text-xs sm:text-sm font-extrabold text-slate-800">
            Chuyên mục trò chơi Địa lí 11:
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            id="subtab-millionaire"
            onClick={() => {
              sounds.playClick();
              setActiveSubTab('millionaire');
            }}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeSubTab === 'millionaire'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md ring-2 ring-amber-400/50'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Trophy className="w-4 h-4 text-slate-950" />
            <span>Gameshow "Ai Là Triệu Phú"</span>
            <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black animate-pulse">
              HOT
            </span>
          </button>

          <button
            id="subtab-simulator"
            onClick={() => {
              sounds.playClick();
              setActiveSubTab('simulator');
            }}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeSubTab === 'simulator'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md ring-2 ring-blue-400/50'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Mô Phỏng Thủy Văn ĐBSCL</span>
          </button>
        </div>
      </div>

      {/* Render selected game */}
      {activeSubTab === 'millionaire' && <MillionaireGame />}
      {activeSubTab === 'simulator' && <HighSchoolSimulator />}
    </div>
  );
};
