/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EducationLevel, TabType } from './types';
import { Header } from './components/Header';
import { OverviewSection } from './components/OverviewSection';
import { MekongMap } from './components/MekongMap';
import { MrcSection } from './components/MrcSection';
import { VietnamImpactSection } from './components/VietnamImpactSection';
import { ElementaryGame } from './components/games/ElementaryGame';
import { MiddleSchoolGame } from './components/games/MiddleSchoolGame';
import { HighSchoolGameHub } from './components/games/HighSchoolGameHub';
import { ComprehensiveQuiz } from './components/games/ComprehensiveQuiz';
import { KienSangChatbot } from './components/KienSangChatbot';
import { PromptBuilderModal } from './components/PromptBuilderModal';
import { MekongAtmosphereBackground } from './components/MekongAtmosphereBackground';
import { sounds } from './utils/audio';
import { KIEN_SANG_AVATAR } from './assets/mascot';
import { 
  Gamepad2, 
  GraduationCap, 
  Sparkles, 
  Waves, 
  Compass, 
  Landmark, 
  HeartHandshake,
  Bot,
  MessageCircle,
  X
} from 'lucide-react';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<EducationLevel>('thpt'); // Default to THPT Chuyên đề Địa lí 11
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState<boolean>(false);

  const handleToggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    sounds.enabled = newState;
    if (newState) sounds.playClick();
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 flex flex-col selection:bg-teal-100 selection:text-teal-900 font-sans relative">
      {/* Decorative Thematic Mekong River Atmosphere Background */}
      <MekongAtmosphereBackground />

      {/* Global Header */}
      <Header
        currentLevel={currentLevel}
        onLevelChange={setCurrentLevel}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenPromptBuilder={() => setIsPromptModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TAB 1: OVERVIEW */}
        {currentTab === 'overview' && (
          <OverviewSection
            currentLevel={currentLevel}
            onNavigateTab={setCurrentTab}
            onSelectLevel={setCurrentLevel}
          />
        )}

        {/* TAB 2: INTERACTIVE MAP */}
        {currentTab === 'map' && <MekongMap />}

        {/* TAB 3: GAMES HUB (Categorized by school levels) */}
        {currentTab === 'games' && (
          <div className="space-y-6">
            {/* Level Selector Bar for the Games Tab */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
                  Trung Tâm Trò Chơi Tương Tác Phân Hóa Cấp Học
                </span>
                <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Gamepad2 className="w-6 h-6 text-teal-600" />
                  Trò Chơi Địa Lí Sông Mê Kông
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Chọn cấp học bên dưới để trải nghiệm trò chơi phù hợp với trình độ của bạn
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                <button
                  id="game-tab-level-tieuhoc"
                  onClick={() => { sounds.playClick(); setCurrentLevel('tieuhoc'); }}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    currentLevel === 'tieuhoc'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🐬 Tiểu Học (Lớp 1-5)
                </button>
                <button
                  id="game-tab-level-thcs"
                  onClick={() => { sounds.playClick(); setCurrentLevel('thcs'); }}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    currentLevel === 'thcs'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🧭 THCS (Lớp 6-9)
                </button>
                <button
                  id="game-tab-level-thpt"
                  onClick={() => { sounds.playClick(); setCurrentLevel('thpt'); }}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    currentLevel === 'thpt'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⚖️ THPT (Địa Lí 11)
                </button>
              </div>
            </div>

            {/* Render Game by selected level */}
            {currentLevel === 'tieuhoc' && <ElementaryGame />}
            {currentLevel === 'thcs' && <MiddleSchoolGame />}
            {currentLevel === 'thpt' && <HighSchoolGameHub />}
          </div>
        )}

        {/* TAB 4: CHATBOT KIẾN SÁNG */}
        {currentTab === 'chatbot' && (
          <div className="space-y-6">
            <KienSangChatbot
              currentLevel={currentLevel}
              onLevelChange={setCurrentLevel}
            />
          </div>
        )}

        {/* TAB 5: MRC DOSSIER */}
        {currentTab === 'mrc' && <MrcSection />}

        {/* TAB 6: VIETNAM & MEKONG DELTA */}
        {currentTab === 'vietnam' && <VietnamImpactSection />}

        {/* TAB 7: COMPREHENSIVE QUIZ */}
        {currentTab === 'quiz' && (
          <ComprehensiveQuiz
            currentLevel={currentLevel}
            onLevelChange={setCurrentLevel}
          />
        )}
      </main>

      {/* Floating Chatbot Assistant Trigger & Window */}
      {currentTab !== 'chatbot' && (
        <>
          {/* Floating Action Button */}
          <div className="fixed bottom-6 right-6 z-40">
            <button
              id="open-floating-kien-sang-btn"
              onClick={() => {
                sounds.playClick();
                setIsFloatingChatOpen(!isFloatingChatOpen);
              }}
              className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 hover:from-teal-600 hover:to-slate-800 text-white rounded-full shadow-2xl hover:shadow-teal-500/25 border border-teal-500/30 transition-all hover:scale-105 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={KIEN_SANG_AVATAR}
                  alt="Kiến Sáng"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-md"
                />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-black tracking-tight leading-none text-white">
                  Nói Chuyện Với Kiến Sáng
                </p>
                <span className="text-[10px] text-teal-200/90 font-medium">
                  Giọng nói AI 🎙️ • Địa lí 11
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            </button>
          </div>

          {/* Floating Drawer Modal */}
          {isFloatingChatOpen && (
            <div className="fixed inset-x-4 bottom-22 sm:bottom-24 sm:right-6 sm:left-auto z-50 sm:w-[440px] h-[580px] max-h-[85vh] transition-all animate-in fade-in slide-in-from-bottom-5">
              <KienSangChatbot
                currentLevel={currentLevel}
                onLevelChange={setCurrentLevel}
                isFloatingDrawer={true}
                onCloseFloating={() => setIsFloatingChatOpen(false)}
              />
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200/80 bg-white/80 backdrop-blur-md py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-700">
            <Waves className="w-5 h-5 text-teal-600" />
            <span className="font-bold">Mekong River Explorer</span>
            <span className="text-slate-400">•</span>
            <span>Chuyên đề Địa lí 11 & Ủy hội Sông Mê Kông (MRC)</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <button
              onClick={() => setIsPromptModalOpen(true)}
              className="font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prompt AI Studio</span>
            </button>
            <span>•</span>
            <span>Nghị quyết 120/NQ-CP "Thuận thiên"</span>
            <span>•</span>
            <span>Hiệp định Mê Kông 1995</span>
          </div>
        </div>
      </footer>

      {/* Prompt Builder Modal */}
      <PromptBuilderModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />
    </div>
  );
}
