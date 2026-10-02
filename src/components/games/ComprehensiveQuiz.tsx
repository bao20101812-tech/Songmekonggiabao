import React, { useState } from 'react';
import { EducationLevel, QuizQuestion } from '../../types';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Trophy, 
  ChevronRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';

interface ComprehensiveQuizProps {
  currentLevel: EducationLevel;
  onLevelChange: (level: EducationLevel) => void;
}

export const ComprehensiveQuiz: React.FC<ComprehensiveQuizProps> = ({
  currentLevel,
  onLevelChange,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isAnswered, setIsAnswered] = useState<Record<string, boolean>>({});

  // Filter questions according to current level
  const questions = QUIZ_QUESTIONS.filter((q) => q.level === currentLevel);

  const handleSelectOption = (questionId: string, optionIndex: number, correctIndex: number) => {
    if (isAnswered[questionId]) return;

    sounds.playClick();
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setIsAnswered((prev) => ({ ...prev, [questionId]: true }));

    if (optionIndex === correctIndex) {
      sounds.playSuccess();
    } else {
      sounds.playError();
    }

    // Check if all answered
    const totalAnswered = Object.keys(isAnswered).length + 1;
    if (totalAnswered === questions.length) {
      setTimeout(() => {
        sounds.playFanfare();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }, 500);
    }
  };

  const handleResetQuiz = () => {
    sounds.playClick();
    setSelectedAnswers({});
    setIsAnswered({});
  };

  // Calculate score
  let correctCount = 0;
  questions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctIndex) {
      correctCount++;
    }
  });

  return (
    <div className="space-y-6">
      {/* Quiz Header & Level Switcher */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
            Hệ Thống Trắc Nghiệm & Đấu Trí Kiến Thức
          </span>
          <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-teal-600" />
            Đố Vui & Ôn Tập Chuyên Đề Mê Kông - Địa Lí 11
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Bộ câu hỏi phân hóa theo 3 cấp học, bám sát chuẩn chương trình Giáo dục phổ thông 2018.
          </p>
        </div>

        {/* Level Switch buttons */}
        <div className="flex items-center gap-2">
          {(['tieuhoc', 'thcs', 'thpt'] as EducationLevel[]).map((lvl) => {
            const label = lvl === 'tieuhoc' ? 'Tiểu học' : lvl === 'thcs' ? 'THCS' : 'THPT Địa 11';
            const isActive = currentLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => {
                  sounds.playClick();
                  onLevelChange(lvl);
                  setSelectedAnswers({});
                  setIsAnswered({});
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress & Score Tracker */}
      <div className="bg-sky-50/70 rounded-xl p-4 border border-sky-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="text-xs sm:text-sm font-bold text-slate-800">
            Kết quả: <strong className="text-teal-700">{correctCount}</strong> / {questions.length} câu đúng
          </span>
        </div>

        <button
          onClick={handleResetQuiz}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Làm lại bộ đề</span>
        </button>
      </div>

      {/* Question Cards List */}
      <div className="space-y-5">
        {questions.map((q, qIndex) => {
          const answered = isAnswered[q.id];
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all ${
                answered
                  ? isCorrect
                    ? 'border-emerald-300 ring-1 ring-emerald-200'
                    : 'border-rose-300 ring-1 ring-rose-200'
                  : 'border-slate-200 shadow-xs'
              }`}
            >
              {/* Question Category & Level */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  Câu {qIndex + 1}: {q.category}
                </span>
                <span className="text-[11px] font-medium text-slate-600">
                  {q.gradeLabel}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-4 leading-relaxed">
                {q.question}
              </h4>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = userChoice === optIdx;
                  const isThisCorrect = q.correctIndex === optIdx;

                  let btnStyle = 'bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300';
                  if (answered) {
                    if (isThisCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isThisSelected && !isCorrect) {
                      btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={answered}
                      onClick={() => handleSelectOption(q.id, optIdx, q.correctIndex)}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white border border-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {answered && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {answered && isThisSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box when answered */}
              {answered && (
                <div className={`mt-4 p-4 rounded-xl text-xs space-y-1.5 border ${
                  isCorrect ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-rose-50/60 border-rose-200 text-rose-950'
                }`}>
                  <p className="font-semibold flex items-center gap-1.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>{q.explanation}</span>
                  </p>

                  {q.practicalVietnamNote && (
                    <div className="pt-2 border-t border-slate-200/50 text-slate-700">
                      <strong className="text-teal-900">📍 Liên hệ thực tiễn Việt Nam: </strong>
                      <span>{q.practicalVietnamNote}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
