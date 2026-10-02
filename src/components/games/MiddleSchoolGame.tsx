import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';
import { ArrowDown, CheckCircle2, RotateCcw, Compass, Droplet, Sun, CloudRain } from 'lucide-react';

interface RiverOrderCountry {
  id: string;
  name: string;
  flag: string;
  correctOrder: number; // 1 to 6
  hint: string;
}

const INITIAL_COUNTRIES: RiverOrderCountry[] = [
  { id: 'laos', name: 'Lào', flag: '🇱🇦', correctOrder: 3, hint: 'Đóng góp 35% lưu lượng nước, quốc gia có đường sông dài bậc nhất.' },
  { id: 'vietnam', name: 'Việt Nam', flag: '🇻🇳', correctOrder: 6, hint: 'Hạ lưu cuối cùng, bồi đắp Đồng bằng sông Cửu Long rồi đổ ra Biển Đông.' },
  { id: 'china', name: 'Trung Quốc', flag: '🇨🇳', correctOrder: 1, hint: 'Ngọn nguồn cao nguyên Tây Tạng phủ đầy băng tuyết (Lan Thương Giang).' },
  { id: 'cambodia', name: 'Campuchia', flag: '🇰🇭', correctOrder: 5, hint: 'Nơi có Biển Hồ Tonle Sap điều hòa dòng chảy trước khi vào Việt Nam.' },
  { id: 'myanmar', name: 'Myanmar', flag: '🇲🇲', correctOrder: 2, hint: 'Đoạn sông biên giới tự nhiên 268km ở khu Tam Giác Vàng.' },
  { id: 'thailand', name: 'Thái Lan', flag: '🇹🇭', correctOrder: 4, hint: 'Sông chảy dọc theo ranh giới vùng Đông Bắc Thái Lan (Isan).' },
];

export const MiddleSchoolGame: React.FC = () => {
  const [items, setItems] = useState<RiverOrderCountry[]>(INITIAL_COUNTRIES);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Tonle Sap Pulse Simulator state
  const [season, setSeason] = useState<'flood' | 'dry'>('flood');

  const moveItem = (index: number, direction: 'up' | 'down') => {
    sounds.playClick();
    if (isSubmitted) setIsSubmitted(false);

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[newIndex];
    newItems[newIndex] = temp;
    setItems(newItems);
  };

  const handleCheckOrder = () => {
    sounds.playClick();
    let correctCount = 0;
    items.forEach((item, idx) => {
      if (item.correctOrder === idx + 1) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setIsSubmitted(true);

    if (correctCount === items.length) {
      sounds.playFanfare();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      sounds.playError();
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setItems(INITIAL_COUNTRIES);
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1">
            Chương Trình Địa Lí THCS (Lớp 6 - 9)
          </span>
          <h3 className="text-lg sm:text-2xl font-extrabold flex items-center gap-2">
            <Compass className="w-6 h-6 text-teal-400" />
            Thử Thách: Dòng Chảy 6 Nước & Kỳ Quan Biển Hồ
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl">
            Tìm hiểu nguyên lý thủy văn học: Dòng chảy tự nhiên từ cao xuống thấp và chiếc "van điều áp" Biển Hồ đối với miền Tây Nam Bộ.
          </p>
        </div>
      </div>

      {/* SECTION 1: ORDERING GAME */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Droplet className="w-5 h-5 text-teal-600" />
              Nhiệm Vụ 1: Sắp xếp thứ tự dòng chảy từ Thượng Nguồn đến Cửa Biển
            </h4>
            <p className="text-xs text-slate-500">
              Sử dụng các nút mũi tên [Lên ⬆️] và [Xuống ⬇️] để xếp đúng hành trình dòng sông Mê Kông qua 6 quốc gia.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isSubmitted && (
              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                score === 6 ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}>
                Kết quả: {score}/6 quốc gia đúng vị trí
              </span>
            )}
            <button
              onClick={handleReset}
              title="Xáo trộn lại"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ordering List */}
        <div className="space-y-2">
          {items.map((item, index) => {
            const isCorrect = isSubmitted && item.correctOrder === index + 1;
            const isWrong = isSubmitted && item.correctOrder !== index + 1;

            return (
              <div
                key={item.id}
                id={`order-item-${item.id}`}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-400'
                    : isWrong
                    ? 'bg-rose-50 border-rose-300'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-white'
                }`}
              >
                {/* Position Badge & Name */}
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-slate-500 hidden sm:block">
                      {item.hint}
                    </p>
                  </div>
                </div>

                {/* Status or Up/Down buttons */}
                <div className="flex items-center gap-1.5">
                  {isSubmitted && (
                    <span className="text-xs font-semibold mr-2">
                      {isCorrect ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Chính xác
                        </span>
                      ) : (
                        <span className="text-rose-600">
                          (Vị trí đúng: #{item.correctOrder})
                        </span>
                      )}
                    </span>
                  )}
                  <button
                    disabled={index === 0}
                    onClick={() => moveItem(index, 'up')}
                    className="p-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700"
                    title="Di chuyển lên"
                  >
                    ⬆️
                  </button>
                  <button
                    disabled={index === items.length - 1}
                    onClick={() => moveItem(index, 'down')}
                    className="p-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700"
                    title="Di chuyển xuống"
                  >
                    ⬇️
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            id="btn-check-river-order"
            onClick={handleCheckOrder}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Kiểm Tra Kết Quả Thứ Tự</span>
          </button>
        </div>
      </div>

      {/* SECTION 2: TONLE SAP SIMULATOR (BIỂN HỒ & ĐBSCL) */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Droplet className="w-5 h-5 text-sky-600" />
              Nhiệm Vụ 2: Khám Phá Kỳ Quan Thủy Văn Biển Hồ (Tonle Sap)
            </h4>
            <p className="text-xs text-slate-500">
              Chiếc "van điều áp" tự nhiên giữa Campuchia và Đồng bằng sông Cửu Long Việt Nam
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              id="btn-season-flood"
              onClick={() => { sounds.playClick(); setSeason('flood'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                season === 'flood' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>Mùa Lũ (Tháng 6 - 10)</span>
            </button>
            <button
              id="btn-season-dry"
              onClick={() => { sounds.playClick(); setSeason('dry'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                season === 'dry' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Mùa Khô (Tháng 11 - 5)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Graphic representation */}
        <div className={`p-5 rounded-2xl border transition-all ${
          season === 'flood' ? 'bg-sky-50/80 border-sky-200' : 'bg-amber-50/80 border-amber-200'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Box 1: Mekong Flow */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                Dòng Sông Mê Kông Chính
              </span>
              <p className="font-extrabold text-slate-900 text-lg">
                {season === 'flood' ? '🌊 Nước Lũ Cuồn Cuộn' : '💧 Nước Giảm Dần'}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                {season === 'flood'
                  ? 'Mưa lớn ở thượng nguồn khiến mực nước dâng cao hơn đáy Biển Hồ.'
                  : 'Lưu lượng sông suy giảm, mực nước sông Mê Kông xuống rất thấp.'}
              </p>
            </div>

            {/* Box 2: Pulse Arrow Interaction */}
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <span className="text-xs font-bold text-slate-700 mb-1">
                Hướng dòng chảy sông Tonle Sap:
              </span>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md my-1 ${
                season === 'flood' ? 'bg-sky-600' : 'bg-amber-600'
              }`}>
                {season === 'flood' ? (
                  <ArrowDown className="w-6 h-6 rotate-45 animate-bounce" />
                ) : (
                  <ArrowDown className="w-6 h-6 -rotate-135 animate-bounce" />
                )}
              </div>
              <span className={`text-xs font-extrabold ${season === 'flood' ? 'text-sky-700' : 'text-amber-800'}`}>
                {season === 'flood' ? 'Nước CHẢY NGƯỢC vào Biển Hồ (Cắt lũ)' : 'Nước RÚT RA Mê Kông (Tiếp nước ngọt)'}
              </span>
            </div>

            {/* Box 3: Tonle Sap & Mekong Delta Impact */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                Tác động đến ĐBSCL Việt Nam
              </span>
              <p className="font-extrabold text-slate-900 text-lg">
                {season === 'flood' ? '🌾 Đón Mùa Nước Nổi' : '🛡️ Chống Hạn Mặn'}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                {season === 'flood'
                  ? 'Nhờ Biển Hồ chứa bớt 20% lượng nước lũ, ĐBSCL tránh được ngập lụt thảm khốc và nhận lượng phù sa màu mỡ hiền hòa.'
                  : 'Biển Hồ xả nước bổ sung nguồn nước ngọt quý báu đẩy lùi mặn xâm nhập tại các cửa sông Tiền và sông Hậu.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
