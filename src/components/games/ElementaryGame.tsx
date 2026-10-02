import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';
import { Sparkles, Trophy, Heart, RotateCcw, CheckCircle2, Star, ShieldCheck } from 'lucide-react';

interface CountryItem {
  id: string;
  name: string;
  flag: string;
  landmark: string;
}

const COUNTRIES: CountryItem[] = [
  { id: 'china', name: 'Trung Quốc', flag: '🇨🇳', landmark: 'Cao nguyên Tây Tạng tuyết trắng' },
  { id: 'myanmar', name: 'Myanmar', flag: '🇲🇲', landmark: 'Tam Giác Vàng huyền bí' },
  { id: 'laos', name: 'Lào', flag: '🇱🇦', landmark: 'Thác Khone Phapheng hùng vĩ' },
  { id: 'thailand', name: 'Thái Lan', flag: '🇹🇭', landmark: 'Chợ nổi nhộn nhịp ven sông' },
  { id: 'cambodia', name: 'Campuchia', flag: '🇰🇭', landmark: 'Biển Hồ cá tôm trù phú' },
  { id: 'vietnam', name: 'Việt Nam', flag: '🇻🇳', landmark: 'Đồng bằng Chín Rồng vựa lúa' },
];

const DOLPHIN_MISSIONS = [
  {
    question: 'Bé hãy giúp chú cá heo Irrawaddy tìm nước sạch nhé! Sông Mê Kông khi chảy vào miền Nam nước ta có tên là gì?',
    options: [
      { text: 'Sông Cửu Long (Chín Rồng)', correct: true },
      { text: 'Sông Hồng', correct: false },
      { text: 'Sông Hương', correct: false },
    ],
    hint: 'Dòng sông uốn lượn như chín con rồng thần thoại đổ ra biển lớn.'
  },
  {
    question: 'Hành động nào dưới đây giúp bảo vệ bạn Cá heo và dòng sông Mê Kông xanh sạch đẹp?',
    options: [
      { text: 'Vứt túi nilon xuống sông', correct: false },
      { text: 'Không vứt rác, trồng thêm cây xanh ven sông', correct: true },
      { text: 'Đổ nước thải bẩn ra kênh rạch', correct: false },
    ],
    hint: 'Bảo vệ nguồn nước là bảo vệ ngôi nhà của muôn loài sinh vật!'
  },
  {
    question: 'Ở miền Tây Việt Nam, mùa nào trong năm nước sông dâng cao mang theo tôm cá và hoa súng nở rộ?',
    options: [
      { text: 'Mùa bão tuyết', correct: false },
      { text: 'Mùa nước nổi yêu thương', correct: true },
      { text: 'Mùa hạn hán khô cằn', correct: false },
    ],
    hint: 'Nước dâng hiền hòa, người dân chèo xuồng giăng lưới bắt cá linh thơm ngon.'
  }
];

export const ElementaryGame: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dolphin' | 'match'>('dolphin');

  // Dolphin game state
  const [missionIndex, setMissionIndex] = useState<number>(0);
  const [dolphinHealth, setDolphinHealth] = useState<number>(100);
  const [score, setScore] = useState<number>(0);
  const [dolphinGameOver, setDolphinGameOver] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  // Country Matching state
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [matchScore, setMatchScore] = useState<number>(0);

  // Dolphin answer handler
  const handleDolphinAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      sounds.playSuccess();
      setScore((prev) => prev + 10);
      setDolphinHealth((prev) => Math.min(100, prev + 10));
      setFeedback({
        message: 'Hoan hô bé! Bé đã chọn đáp án hoàn toàn chính xác. Bạn Cá heo rất vui!',
        isCorrect: true,
      });

      if (missionIndex < DOLPHIN_MISSIONS.length - 1) {
        setTimeout(() => {
          setMissionIndex((prev) => prev + 1);
          setFeedback(null);
        }, 1500);
      } else {
        setTimeout(() => {
          setDolphinGameOver(true);
          sounds.playFanfare();
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }, 1200);
      }
    } else {
      sounds.playError();
      setDolphinHealth((prev) => Math.max(20, prev - 25));
      setFeedback({
        message: 'Chưa đúng rồi bé ơi! Bé hãy đọc gợi ý và thử suy nghĩ lại nhé!',
        isCorrect: false,
      });
    }
  };

  const handleResetDolphin = () => {
    sounds.playClick();
    setMissionIndex(0);
    setDolphinHealth(100);
    setScore(0);
    setDolphinGameOver(false);
    setFeedback(null);
  };

  // Country match handler
  const handleCountryClick = (c: CountryItem) => {
    sounds.playClick();
    if (matchedIds.includes(c.id)) return;

    if (!selectedCountryId) {
      setSelectedCountryId(c.id);
    } else {
      if (selectedCountryId === c.id) {
        // Matched self clicked
        setSelectedCountryId(null);
      }
    }
  };

  const handleLandmarkClick = (landmarkCountryId: string) => {
    sounds.playClick();
    if (!selectedCountryId) return;

    if (selectedCountryId === landmarkCountryId) {
      sounds.playSuccess();
      const newMatched = [...matchedIds, selectedCountryId];
      setMatchedIds(newMatched);
      setMatchScore((prev) => prev + 20);
      setSelectedCountryId(null);

      if (newMatched.length === COUNTRIES.length) {
        sounds.playFanfare();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    } else {
      sounds.playError();
      setSelectedCountryId(null);
    }
  };

  const handleResetMatch = () => {
    sounds.playClick();
    setMatchedIds([]);
    setSelectedCountryId(null);
    setMatchScore(0);
  };

  return (
    <div className="space-y-6">
      {/* Game Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
        <div>
          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
            Dành cho Cấp Tiểu Học (Lớp 1 - 5)
          </span>
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Bé Khám Phá & Học Vui Cùng Sông Mê Kông
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-dolphin-game"
            onClick={() => { sounds.playClick(); setActiveTab('dolphin'); }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'dolphin'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-amber-100/60'
            }`}
          >
            🐬 Giải cứu Cá Heo Irrawaddy
          </button>
          <button
            id="btn-match-game"
            onClick={() => { sounds.playClick(); setActiveTab('match'); }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'match'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-amber-100/60'
            }`}
          >
            🚩 Ghép Nối 6 Quốc Gia
          </button>
        </div>
      </div>

      {/* GAME 1: DOLPHIN RESCUE */}
      {activeTab === 'dolphin' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs">
          {!dolphinGameOver ? (
            <div className="space-y-6">
              {/* Status bar: Health + Score */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-sky-50 p-4 rounded-xl border border-sky-100">
                <div className="flex items-center gap-3">
                  <div className="text-3xl animate-bounce">🐬</div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                      <span className="text-xs font-bold text-slate-700">Sức khỏe Cá heo: {dolphinHealth}%</span>
                    </div>
                    <div className="w-36 sm:w-48 h-2.5 bg-slate-200 rounded-full overflow-hidden mt-1">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
                        style={{ width: `${dolphinHealth}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-slate-800">Điểm: {score}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    Nhiệm vụ {missionIndex + 1}/{DOLPHIN_MISSIONS.length}
                  </div>
                </div>
              </div>

              {/* Mission Question Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 border border-teal-200">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-200/70 text-teal-800">
                  Câu hỏi khám phá số {missionIndex + 1}
                </span>
                <h4 className="text-base sm:text-xl font-bold text-slate-900 mt-2 mb-4 leading-relaxed">
                  {DOLPHIN_MISSIONS[missionIndex].question}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {DOLPHIN_MISSIONS[missionIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      id={`dolphin-opt-${idx}`}
                      onClick={() => handleDolphinAnswer(opt.correct)}
                      className="p-4 bg-white rounded-xl border-2 border-teal-200/80 hover:border-teal-500 hover:bg-teal-50/50 text-slate-800 font-bold text-sm text-left transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-between group"
                    >
                      <span>{opt.text}</span>
                      <Sparkles className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>

                {/* Hint */}
                <div className="mt-4 p-3 bg-white/80 rounded-xl border border-teal-100 text-xs text-teal-900 flex items-start gap-2">
                  <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Gợi ý nhỏ cho bé:</strong> {DOLPHIN_MISSIONS[missionIndex].hint}</span>
                </div>

                {/* Answer Feedback Banner */}
                {feedback && (
                  <div className={`mt-4 p-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                    feedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}>
                    {feedback.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                    <span>{feedback.message}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Victory Screen */
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex p-4 rounded-full bg-amber-100 text-amber-600 text-5xl animate-bounce">
                🏆
              </div>
              <h4 className="text-2xl font-extrabold text-slate-900">
                Chúc Mừng Bé Đã Hoàn Thành Xuất Sắc!
              </h4>
              <p className="text-slate-600 max-w-md mx-auto text-sm">
                Bé đã ghi được <strong className="text-teal-700">{score} điểm</strong> và bảo vệ dòng nước mát lành cho bạn Cá heo Irrawaddy cùng muôn loài thủy sản sông Mê Kông!
              </p>
              <button
                id="btn-retry-dolphin"
                onClick={handleResetDolphin}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chơi lại từ đầu</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: COUNTRY MATCHING */}
      {activeTab === 'match' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-base">
                Ghép Nối: Tên Quốc Gia & Nét Đặc Trưng Ven Sông
              </h4>
              <p className="text-xs text-slate-500">
                Nhấp vào tên quốc gia ở cột bên trái, sau đó nhấp vào hình ảnh đặc trưng tương ứng ở cột bên phải.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200">
                Điểm: {matchScore} / 120
              </span>
              <button
                id="btn-reset-match"
                onClick={handleResetMatch}
                title="Làm mới trò chơi"
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Column 1: Countries */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                1. Chọn Quốc Gia ven sông:
              </h5>
              {COUNTRIES.map((c) => {
                const isMatched = matchedIds.includes(c.id);
                const isSelected = selectedCountryId === c.id;

                return (
                  <button
                    key={c.id}
                    id={`country-card-${c.id}`}
                    disabled={isMatched}
                    onClick={() => handleCountryClick(c)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-80'
                        : isSelected
                        ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-400'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.flag}</span>
                      <span className="font-bold text-sm">{c.name}</span>
                    </div>
                    {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Column 2: Landmarks (shuffled visually) */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Nối với Nét Đặc Trưng:
              </h5>
              {COUNTRIES.slice().reverse().map((c) => {
                const isMatched = matchedIds.includes(c.id);

                return (
                  <button
                    key={c.id}
                    id={`landmark-card-${c.id}`}
                    disabled={isMatched}
                    onClick={() => handleLandmarkClick(c.id)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-80'
                        : selectedCountryId
                        ? 'bg-white border-teal-300 hover:border-teal-600 hover:bg-teal-50 text-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="font-medium text-xs sm:text-sm">📍 {c.landmark}</span>
                    {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {matchedIds.length === COUNTRIES.length && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center">
              <h5 className="font-extrabold text-emerald-900 text-lg">
                🎉 Bé thật thông minh!
              </h5>
              <p className="text-xs text-emerald-800 mt-1">
                Bé đã ghép đúng tất cả 6 quốc gia anh em trên dòng sông Mê Kông!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
