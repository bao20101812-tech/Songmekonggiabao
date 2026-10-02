import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../../utils/audio';
import { speechService } from '../../utils/speechService';
import { KIEN_SANG_AVATAR } from '../../assets/mascot';
import { 
  Trophy, 
  HelpCircle, 
  PhoneCall, 
  PhoneOff,
  Users, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Square,
  Radio,
  Sparkles, 
  GraduationCap, 
  Award, 
  ArrowRight, 
  Clock, 
  AlertTriangle,
  Play,
  Flame,
  ShieldCheck,
  Compass,
  Shuffle
} from 'lucide-react';

interface Question {
  id: number;
  level: number;
  prize: string;
  prizeNumber: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  category: string;
}

// 15 Standard Questions for Địa lí 11 & Mekong Basin
const MILLIONAIRE_QUESTIONS: Question[] = [
  {
    id: 1,
    level: 1,
    prize: '200.000 đ',
    prizeNumber: 200000,
    question: 'Sông Mê Kông là con sông dài thứ mấy trên thế giới và đứng thứ mấy ở châu Á?',
    options: {
      A: 'Thứ 5 thế giới, thứ 2 châu Á',
      B: 'Thứ 1 thế giới, thứ 1 châu Á',
      C: 'Thứ 12 thế giới, thứ 3 châu Á',
      D: 'Thứ 20 thế giới, thứ 10 châu Á',
    },
    correct: 'C',
    explanation: 'Với chiều dài khoảng 4.763 km, sông Mê Kông đứng thứ 12 thế giới và thứ 3 châu Á (sau sông Dương Tử và Hoàng Hà).',
    category: 'Tổng quan Địa lí 11',
  },
  {
    id: 2,
    level: 2,
    prize: '400.000 đ',
    prizeNumber: 400000,
    question: 'Sông Mê Kông bắt nguồn từ khu vực địa hình hiểm trở nào ở độ cao trên 5.000 mét?',
    options: {
      A: 'Sơn nguyên Tây Tạng (Trung Quốc)',
      B: 'Dãy núi Hymalaya (Nepal)',
      C: 'Cao nguyên Korat (Thái Lan)',
      D: 'Dãy núi An Nam (Lào)',
    },
    correct: 'A',
    explanation: 'Sông Mê Kông bắt nguồn từ cao nguyên Thanh Tạng (Tây Tạng, Trung Quốc) ở độ cao khoảng 5.000m từ các dòng sông băng tuyết tan.',
    category: 'Vị trí địa lí',
  },
  {
    id: 3,
    level: 3,
    prize: '600.000 đ',
    prizeNumber: 600000,
    question: 'Ở phần thượng lưu chảy qua lãnh thổ Trung Quốc, sông Mê Kông được gọi bằng tên bản địa là gì?',
    options: {
      A: 'Hoàng Hà (Huang He)',
      B: 'Trường Giang (Chang Jiang)',
      C: 'Mê Nam (Mae Nam)',
      D: 'Lan Thương Giang (Lancang Jiang)',
    },
    correct: 'D',
    explanation: 'Tại Trung Quốc, đoạn thượng lưu dài khoảng 2.161 km được gọi là sông Lan Thương (Lancang Jiang - dòng sông cuộn sóng dữ).',
    category: 'Địa danh & Tên gọi',
  },
  {
    id: 4,
    level: 4,
    prize: '1.000.000 đ',
    prizeNumber: 1000000,
    question: 'Toàn bộ lưu vực sông Mê Kông (795.000 km²) trải dài qua lãnh thổ của bao nhiêu quốc gia?',
    options: {
      A: '4 quốc gia',
      B: '6 quốc gia',
      C: '8 quốc gia',
      D: '10 quốc gia',
    },
    correct: 'B',
    explanation: 'Lưu vực sông Mê Kông trải rộng qua 6 quốc gia: Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia và Việt Nam.',
    category: 'Phạm vi lưu vực',
  },
  {
    id: 5,
    level: 5,
    prize: '2.000.000 đ',
    prizeNumber: 2000000,
    question: 'Quốc gia nào sau đây KHÔNG THUỘC lưu vực sông Mê Kông?',
    options: {
      A: 'Lào',
      B: 'Campuchia',
      C: 'Malaysia',
      D: 'Myanmar',
    },
    correct: 'C',
    explanation: 'Malaysia nằm ở vùng đảo và bán đảo Mã Lai, không thuộc hệ thống lưu vực sông Mê Kông.',
    category: 'Mốc An Toàn Số 1',
  },
  {
    id: 6,
    level: 6,
    prize: '3.000.000 đ',
    prizeNumber: 3000000,
    question: 'Quốc gia nào có tỷ lệ đóng góp lượng nước (dòng chảy) lớn nhất cho sông Mê Kông, chiếm khoảng 35%?',
    options: {
      A: 'Lào',
      B: 'Thái Lan',
      C: 'Trung Quốc',
      D: 'Campuchia',
    },
    correct: 'A',
    explanation: 'Lào được ví là "nguồn phát điện và kho nước của Đông Nam Á", đóng góp tới ~35% tổng lưu lượng nước của toàn lưu vực Mê Kông.',
    category: 'Thủy văn & Dòng chảy',
  },
  {
    id: 7,
    level: 7,
    prize: '6.000.000 đ',
    prizeNumber: 6000000,
    question: 'Hồ nước ngọt tự nhiên lớn nhất Đông Nam Á có vai trò "túi chứa nước" điều tiết lũ cho hạ lưu sông Mê Kông là gì?',
    options: {
      A: 'Hồ Inle (Myanmar)',
      B: 'Biển Hồ Tonle Sap (Campuchia)',
      C: 'Hồ Ba Bể (Việt Nam)',
      D: 'Hồ Songkhla (Thái Lan)',
    },
    correct: 'B',
    explanation: 'Biển Hồ Tonle Sap nối với sông Mê Kông qua sông Tonle Sap. Mùa lũ, nước Mê Kông chảy ngược vào hồ; mùa khô, hồ xả nước ngược lại ra Mê Kông tiếp nước cho ĐBSCL.',
    category: 'Điều tiết sinh thái',
  },
  {
    id: 8,
    level: 8,
    prize: '10.000.000 đ',
    prizeNumber: 10000000,
    question: 'Ủy hội Sông Mê Kông Quốc tế (MRC) được thành lập trên cơ sở Hiệp định hợp tác phát triển bền vững ký vào năm nào?',
    options: {
      A: 'Năm 1975',
      B: 'Năm 2000',
      C: 'Năm 1957',
      D: 'Năm 1995 (Hiệp định Chiang Rai)',
    },
    correct: 'D',
    explanation: 'Hiệp định Mê Kông được ký ngày 5/4/1995 tại Chiang Rai (Thái Lan) bởi 4 nước hạ lưu: Campuchia, Lào, Thái Lan và Việt Nam.',
    category: 'Ủy hội MRC 1995',
  },
  {
    id: 9,
    level: 9,
    prize: '14.000.000 đ',
    prizeNumber: 14000000,
    question: 'Khi chảy vào lãnh thổ Việt Nam tại tỉnh An Giang và Đồng Tháp, sông Mê Kông chia thành hai nhánh chính là gì?',
    options: {
      A: 'Sông Tiền và Sông Hậu',
      B: 'Sông Hồng và Sông Đà',
      C: 'Sông Đồng Nai và Sông Sài Gòn',
      D: 'Sông Mã và Sông Chu',
    },
    correct: 'A',
    explanation: 'Sông Mê Kông chảy vào Việt Nam phân thành 2 nhánh sông Tiền và sông Hậu (Bassac), tạo nên vùng phù sa màu mỡ bậc nhất nước ta.',
    category: 'Địa lí ĐBSCL',
  },
  {
    id: 10,
    level: 10,
    prize: '22.000.000 đ',
    prizeNumber: 22000000,
    question: 'Tác động tiêu cực trực tiếp và đáng lo ngại nhất của chuỗi đập thủy điện bậc thang thượng nguồn đối với ĐBSCL là gì?',
    options: {
      A: 'Làm tăng nhiệt độ không khí ở Nam Bộ',
      B: 'Làm nước sông Mê Kông đổi sang màu đỏ vĩnh viễn',
      C: 'Giữ lại 50 - 70% lượng bùn cát phù sa gây sạt lở bờ sông, bờ biển',
      D: 'Làm biến mất hoàn toàn mùa mưa ở Việt Nam',
    },
    correct: 'C',
    explanation: 'Các hồ chứa đập thủy điện giữ lại hạt thô và bùn cát khiến dòng chảy về hạ lưu thành "nước đói phù sa", gây xói lở dữ dội bờ sông Tiền, sông Hậu và bờ biển ĐBSCL.',
    category: 'Mốc An Toàn Số 2',
  },
  {
    id: 11,
    level: 11,
    prize: '30.000.000 đ',
    prizeNumber: 30000000,
    question: 'Theo số liệu nghiên cứu của MRC và Bộ TN&MT, trong các đợt hạn mặn kỷ lục (2016, 2020), ranh mặn 4g/lít đã xâm nhập sâu nhất bao nhiêu km vào ĐBSCL?',
    options: {
      A: 'Chỉ 10 đến 15 km',
      B: 'Từ 70 đến 95 km',
      C: 'Trên 200 km',
      D: 'Khoảng 30 km',
    },
    correct: 'B',
    explanation: 'Ranh mặn 4g/lít (ngưỡng cây lúa không chịu được) đã lấn sâu tới 70-95 km trên các nhánh sông Vàm Cỏ, sông Hàm Luông, Cổ Chiên, uy hiếp nước sinh hoạt và nông nghiệp.',
    category: 'An ninh nguồn nước',
  },
  {
    id: 12,
    level: 12,
    prize: '40.000.000 đ',
    prizeNumber: 40000000,
    question: 'Thủ đô của hai quốc gia nào sau đây tọa lạc trực tiếp bên bờ sông Mê Kông?',
    options: {
      A: 'Bangkok (Thái Lan) và Hà Nội (Việt Nam)',
      B: 'Naypyidaw (Myanmar) và Bắc Kinh (Trung Quốc)',
      C: 'Kuala Lumpur (Malaysia) và Jakarta (Indonesia)',
      D: 'Viêng Chăn (Lào) và Phnom Penh (Campuchia)',
    },
    correct: 'D',
    explanation: 'Thủ đô Viêng Chăn (Lào) nằm sát bờ sông Mê Kông giáp Thái Lan, và thủ đô Phnom Penh (Campuchia) nằm tại ngã tư sông Bốn Mặt (Chaktomuk).',
    category: 'Địa lí Đô thị & Chính trị',
  },
  {
    id: 13,
    level: 13,
    prize: '60.000.000 đ',
    prizeNumber: 60000000,
    question: 'Hệ thống thủy lợi ngăn mặn, kiểm soát nguồn nước quy mô lớn nhất Việt Nam khánh thành tại Kiên Giang - Hậu Giang mang tên gì?',
    options: {
      A: 'Hệ thống thủy lợi Cái Lớn - Cái Bé',
      B: 'Hồ Dầu Tiếng',
      C: 'Kênh Vĩnh Tế',
      D: 'Hồ Trị An',
    },
    correct: 'A',
    explanation: 'Cống Cái Lớn và Cái Bé là siêu công trình thủy lợi kiểm soát nguồn nước cho hơn 384.000 ha đất nông nghiệp vùng bán đảo Cà Mau và Tây sông Hậu.',
    category: 'Công trình Thủy lợi ĐBSCL',
  },
  {
    id: 14,
    level: 14,
    prize: '85.000.000 đ',
    prizeNumber: 85000000,
    question: 'Nghị quyết số 120/NQ-CP (năm 2017) của Chính phủ về phát triển bền vững ĐBSCL mang tính bước ngoặt với triết lý cốt lõi nào?',
    options: {
      A: 'Ngăn chặn tuyệt đối mọi nguồn nước mặn từ biển vào đất liền',
      B: 'Chuyển toàn bộ diện tích trồng lúa sang khai thác cát xuất khẩu',
      C: '"Thuận thiên" - Tôn trọng quy luật tự nhiên, coi nước mặn - lợ cũng là tài nguyên',
      D: 'Đắp đê bao bê tông khép kín toàn bộ 13 tỉnh Tây Nam Bộ',
    },
    correct: 'C',
    explanation: 'Nghị quyết 120 chuyển từ tư duy "chống lại tự nhiên" sang "thuận thiên": chủ động thích ứng, biến thách thức thành cơ hội, phân vùng sinh thái ngọt - lợ - mặn hợp lí.',
    category: 'Chính sách & Tầm nhìn',
  },
  {
    id: 15,
    level: 15,
    prize: '150.000.000 đ',
    prizeNumber: 150000000,
    question: 'Quy chế bắt buộc nào của MRC yêu cầu các quốc gia thành viên phải tham vấn kỹ thuật và nhận ý kiến trước khi xây đập trên dòng chính Mê Kông?',
    options: {
      A: 'Hiệp ước Không phổ biến vũ khí hạt nhân NPT',
      B: 'Quy trình PNPCA (Thông báo, Tham vấn trước và Thỏa thuận)',
      C: 'Công ước Luật Biển UNCLOS 1982',
      D: 'Nghị định thư Kyoto',
    },
    correct: 'B',
    explanation: 'PNPCA (Procedures for Notification, Prior Consultation and Agreement) là quy chế pháp lý then chốt của MRC nhằm đảm bảo việc xây dựng công trình trên dòng chính không gây tổn hại xuyên biên giới.',
    category: 'ĐỈNH VINH QUANG TRIỆU PHÚ',
  },
];

// Backup replacement questions when user uses "Đổi câu hỏi"
const BACKUP_QUESTIONS: Record<number, Question> = {
  5: {
    id: 105,
    level: 5,
    prize: '2.000.000 đ',
    prizeNumber: 2000000,
    question: 'Hai tỉnh đầu nguồn tiếp nhận dòng nước sông Mê Kông đầu tiên khi vào lãnh thổ Việt Nam là gì?',
    options: {
      A: 'Cà Mau và Bạc Liêu',
      B: 'Tiền Giang và Bến Tre',
      C: 'An Giang và Đồng Tháp',
      D: 'Hậu Giang và Sóc Trăng',
    },
    correct: 'C',
    explanation: 'Sông Tiền chảy qua Tân Châu (An Giang) và Hồng Ngự (Đồng Tháp); sông Hậu chảy qua An Phú (An Giang).',
    category: 'Mốc An Toàn Số 1 (Dự phòng)',
  },
  10: {
    id: 110,
    level: 10,
    prize: '22.000.000 đ',
    prizeNumber: 22000000,
    question: 'Đập thủy điện vòm bê tông cao 292 mét lớn nhất trên dòng chính Lan Thương (Trung Quốc) có tên là gì?',
    options: {
      A: 'Đập Tam Hiệp (Three Gorges)',
      B: 'Đập Tiểu Loan (Xiaowan)',
      C: 'Đập Xayaburi',
      D: 'Đập Don Sahong',
    },
    correct: 'B',
    explanation: 'Đập Tiểu Loan (Xiaowan) tại Vân Nam là một trong những con đập vòm cao nhất thế giới (292m) với dung tích hồ chứa khổng lồ gần 15 tỷ m³.',
    category: 'Mốc An Toàn Số 2 (Dự phòng)',
  },
  15: {
    id: 115,
    level: 15,
    prize: '150.000.000 đ',
    prizeNumber: 150000000,
    question: 'Theo Địa lí 11, giải pháp nông nghiệp thích ứng "Thuận thiên" tiêu biểu ở vùng chuyển tiếp nước lợ ĐBSCL là mô hình nào?',
    options: {
      A: 'Mô hình trồng trọt nhà kính sa mạc Israel',
      B: 'Mô hình bậc thang lúa nước Tây Bắc',
      C: 'Mô hình đắp đê ngăn mặn tuyệt đối quanh năm',
      D: 'Mô hình Lúa - Tôm luân canh (Mùa mưa trồng lúa ngọt, mùa khô nuôi tôm nước lợ)',
    },
    correct: 'D',
    explanation: 'Mô hình lúa - tôm thông minh: Mùa mưa phù sa ngọt trồng lúa đặc sản ST24, ST25; mùa khô độ mặn cao lấy nước nuôi tôm sinh thái sạch, đem lại giá trị kinh tế gấp 3-5 lần.',
    category: 'ĐỈNH VINH QUANG TRIỆU PHÚ (Dự phòng)',
  },
};

/**
 * Fisher-Yates shuffle algorithm to scramble the 4 answer options (A, B, C, D)
 * and accurately map the correct answer key to its new option slot.
 */
export function shuffleQuestionOptions(q: Question): Question {
  const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const items = [
    { text: q.options.A, isCorrect: q.correct === 'A' },
    { text: q.options.B, isCorrect: q.correct === 'B' },
    { text: q.options.C, isCorrect: q.correct === 'C' },
    { text: q.options.D, isCorrect: q.correct === 'D' },
  ];

  // Fisher-Yates shuffle
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  const correctIndex = shuffled.findIndex((item) => item.isCorrect);
  const newCorrect = letters[correctIndex];

  return {
    ...q,
    options: {
      A: shuffled[0].text,
      B: shuffled[1].text,
      C: shuffled[2].text,
      D: shuffled[3].text,
    },
    correct: newCorrect,
  };
}

/**
 * Shuffles answer options for an entire array of questions
 */
export function shuffleAllQuestions(list: Question[]): Question[] {
  return list.map((q) => shuffleQuestionOptions(q));
}

export const MillionaireGame: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [revealedResult, setRevealedResult] = useState<'correct' | 'wrong' | null>(null);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'gameover' | 'victory' | 'stopped' | 'completed'>('intro');
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Track results for each question (key: question index 0..14, value: true if correct, false if wrong/timeout)
  const [questionResults, setQuestionResults] = useState<Record<number, boolean>>({});
  const autoNextTimeoutRef = useRef<any>(null);
  const currentIdxRef = useRef(currentIdx);

  useEffect(() => {
    currentIdxRef.current = currentIdx;
  }, [currentIdx]);

  // Lifelines
  const [usedLifelines, setUsedLifelines] = useState({
    fiftyFifty: false,
    phoneCall: false,
    askAudience: false,
    swapQuestion: false,
  });

  const [hiddenOptions, setHiddenOptions] = useState<('A' | 'B' | 'C' | 'D')[]>([]);
  const [lifelineModal, setLifelineModal] = useState<{
    type: 'phone' | 'audience';
    data: any;
  } | null>(null);

  // Phone Call States
  const [phoneCallStatus, setPhoneCallStatus] = useState<'idle' | 'calling' | 'connected'>('idle');
  const [isPhoneSpeaking, setIsPhoneSpeaking] = useState(false);
  const [phoneCallDuration, setPhoneCallDuration] = useState(0);
  const phoneCallTimeoutRef = useRef<any>(null);
  const phoneDurationIntervalRef = useRef<any>(null);

  // Question array (dynamically shuffled so options A, B, C, D are unpredictable and fresh every game)
  const [questions, setQuestions] = useState<Question[]>(() => shuffleAllQuestions(MILLIONAIRE_QUESTIONS));

  const currentQ = questions[currentIdx];

  // Cleanup speech and timers on unmount
  useEffect(() => {
    return () => {
      speechService.stopSpeaking();
      if (phoneCallTimeoutRef.current) clearTimeout(phoneCallTimeoutRef.current);
      if (phoneDurationIntervalRef.current) clearInterval(phoneDurationIntervalRef.current);
      if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    };
  }, []);

  // Sounds & Timers
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timer > 0 && gameState === 'playing' && !isAnswerLocked) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 6 && prev > 1) {
            sounds.playSuspense();
          }
          if (prev <= 1) {
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, gameState, isAnswerLocked]);

  const handleTimeOut = () => {
    sounds.playError();
    setIsTimerRunning(false);
    setIsAnswerLocked(true);
    setRevealedResult('wrong');
    setQuestionResults((prev) => ({ ...prev, [currentIdx]: false }));

    if (currentIdx === 14) {
      setTimeout(() => {
        const totalCorrect = Object.values({ ...questionResults, [14]: false }).filter(Boolean).length;
        setGameState(totalCorrect === 15 ? 'victory' : 'completed');
      }, 2500);
    } else {
      // Auto advance to next question after 5 seconds if student doesn't click
      if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = setTimeout(() => {
        handleNextQuestion();
      }, 5000);
    }
  };

  const handleStartGame = () => {
    sounds.playFanfare();
    if (autoNextTimeoutRef.current) {
      clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = null;
    }
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerLocked(false);
    setRevealedResult(null);
    setQuestionResults({});
    setUsedLifelines({
      fiftyFifty: false,
      phoneCall: false,
      askAudience: false,
      swapQuestion: false,
    });
    setHiddenOptions([]);
    setLifelineModal(null);
    // Shuffle all 15 questions and their answer choices A, B, C, D for this new game session
    setQuestions(shuffleAllQuestions(MILLIONAIRE_QUESTIONS));
    setTimer(30);
    setIsTimerRunning(true);
    setGameState('playing');
  };

  // Feature: Allow user to manually reshuffle the current question's options if desired
  const handleShuffleCurrentOptions = () => {
    if (isAnswerLocked) return;
    sounds.playClick();
    const shuffledQ = shuffleQuestionOptions(currentQ);

    // If 50:50 is active, preserve which option texts were hidden
    if (hiddenOptions.length > 0) {
      const hiddenTexts = hiddenOptions.map((k) => currentQ.options[k]);
      const newHidden: ('A' | 'B' | 'C' | 'D')[] = [];
      (['A', 'B', 'C', 'D'] as ('A' | 'B' | 'C' | 'D')[]).forEach((k) => {
        if (hiddenTexts.includes(shuffledQ.options[k])) {
          newHidden.push(k);
        }
      });
      setHiddenOptions(newHidden);
    }

    const newQuestions = [...questions];
    newQuestions[currentIdx] = shuffledQ;
    setQuestions(newQuestions);
  };

  const handleSelectOption = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerLocked || hiddenOptions.includes(optionKey)) return;

    sounds.playClick();
    setSelectedOption(optionKey);
    setIsAnswerLocked(true);
    setIsTimerRunning(false);

    // Dramatic tension sound
    sounds.playLockAnswer();

    // Dramatic delay before revealing answer (like the TV show)
    setTimeout(() => {
      const isCorrect = optionKey === currentQ.correct;
      setQuestionResults((prev) => ({ ...prev, [currentIdx]: isCorrect }));

      if (isCorrect) {
        // Correct answer
        sounds.playSuccess();
        setRevealedResult('correct');

        if (currentIdx === 14) {
          // Reached Question 15 -> Check for victory or complete
          setTimeout(() => {
            const allCorrect = Object.values({ ...questionResults, [14]: true }).filter(Boolean).length === 15;
            if (allCorrect) {
              sounds.playFanfare();
              setGameState('victory');
            } else {
              sounds.playFanfare();
              setGameState('completed');
            }
          }, 2500);
        } else {
          // Reached safe milestones sound
          if (currentIdx === 4 || currentIdx === 9) {
            setTimeout(() => {
              sounds.playFanfare();
            }, 500);
          }
          // Auto advance to next question after 5 seconds if not clicked
          if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
          autoNextTimeoutRef.current = setTimeout(() => {
            handleNextQuestion();
          }, 5000);
        }
      } else {
        // Wrong answer: DO NOT GO BACK TO START!
        sounds.playError();
        setRevealedResult('wrong');

        if (currentIdx === 14) {
          // Reached Question 15 -> finish all 15 questions
          setTimeout(() => {
            setGameState('completed');
          }, 2500);
        } else {
          // Auto advance to next question after 5 seconds if not clicked
          if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
          autoNextTimeoutRef.current = setTimeout(() => {
            handleNextQuestion();
          }, 5000);
        }
      }
    }, 2000);
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (autoNextTimeoutRef.current) {
      clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = null;
    }
    if (currentIdxRef.current < 14) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerLocked(false);
      setRevealedResult(null);
      setHiddenOptions([]);
      setTimer(30);
      setIsTimerRunning(true);
    } else {
      const totalCorrect = Object.values(questionResults).filter(Boolean).length;
      setGameState(totalCorrect === 15 ? 'victory' : 'completed');
    }
  };

  const handleStopGame = () => {
    sounds.playClick();
    setIsTimerRunning(false);
    setGameState('stopped');
  };

  // LIFELINES IMPLEMENTATION
  // 1. 50:50 Lifeline
  const useFiftyFifty = () => {
    if (usedLifelines.fiftyFifty || isAnswerLocked) return;
    sounds.playLifeline();
    setUsedLifelines((prev) => ({ ...prev, fiftyFifty: true }));

    const wrongOptions = (['A', 'B', 'C', 'D'] as ('A' | 'B' | 'C' | 'D')[]).filter(
      (opt) => opt !== currentQ.correct
    );
    // Pick 2 random wrong options to hide
    const shuffled = [...wrongOptions].sort(() => Math.random() - 0.5);
    setHiddenOptions([shuffled[0], shuffled[1]]);
  };

  // 2. Phone Call Lifeline
  const usePhoneCall = () => {
    if (usedLifelines.phoneCall || isAnswerLocked) return;
    sounds.playLifeline();
    setUsedLifelines((prev) => ({ ...prev, phoneCall: true }));

    if (phoneCallTimeoutRef.current) clearTimeout(phoneCallTimeoutRef.current);
    if (phoneDurationIntervalRef.current) clearInterval(phoneDurationIntervalRef.current);

    // Kiến Sáng advice content
    const correctLetter = currentQ.correct;
    const spokenAdvice = `A lô! Kiến Sáng xin nghe đây ạ! Chào bạn tại trường quay Ai Là Triệu Phú. Ở câu hỏi số ${currentQ.level}, đáp án chính xác chắc chắn là phương án ${correctLetter}: ${currentQ.options[correctLetter]}. Bởi vì: ${currentQ.explanation}. Bạn hãy tự tin chọn phương án ${correctLetter} nhé! Chúc bạn giành chiến thắng 150 triệu đồng!`;
    const displayText = `A lô! Kiến Sáng xin nghe đây ạ! Theo sách giáo khoa Địa lí 11 và cơ sở dữ liệu Ủy hội MRC, ở câu hỏi số ${currentQ.level}, đáp án chính xác chắc chắn là phương án [ ${correctLetter}: ${currentQ.options[correctLetter]} ]. Bởi vì: ${currentQ.explanation}. Bạn hãy tự tin chọn phương án ${correctLetter} nhé!`;

    setPhoneCallStatus('calling');
    setPhoneCallDuration(0);
    sounds.playPhoneRing();

    setLifelineModal({
      type: 'phone',
      data: {
        caller: 'Bạn Kiến Sáng (Trợ Lý AI Địa Lí 11)',
        advice: displayText,
        spokenAdvice: spokenAdvice,
        confidence: 98,
      },
    });

    // Ringing for 1.8 seconds then Kiến Sáng picks up
    phoneCallTimeoutRef.current = setTimeout(() => {
      setPhoneCallStatus('connected');
      sounds.playPhonePickup();

      phoneDurationIntervalRef.current = setInterval(() => {
        setPhoneCallDuration((prev) => prev + 1);
      }, 1000);

      // Kiến Sáng speaks aloud!
      speechService.speak(spokenAdvice, {
        onStart: () => setIsPhoneSpeaking(true),
        onEnd: () => setIsPhoneSpeaking(false),
        onError: () => setIsPhoneSpeaking(false),
      });
    }, 1800);
  };

  const handleReplayPhoneVoice = () => {
    if (lifelineModal?.type === 'phone' && lifelineModal.data?.spokenAdvice) {
      sounds.playClick();
      speechService.speak(lifelineModal.data.spokenAdvice, {
        onStart: () => setIsPhoneSpeaking(true),
        onEnd: () => setIsPhoneSpeaking(false),
        onError: () => setIsPhoneSpeaking(false),
      });
    }
  };

  const handleStopPhoneVoice = () => {
    sounds.playClick();
    speechService.stopSpeaking();
    setIsPhoneSpeaking(false);
  };

  const handleHangupPhoneCall = () => {
    sounds.playPhoneHangup();
    speechService.stopSpeaking();
    setIsPhoneSpeaking(false);
    if (phoneCallTimeoutRef.current) clearTimeout(phoneCallTimeoutRef.current);
    if (phoneDurationIntervalRef.current) clearInterval(phoneDurationIntervalRef.current);
    setPhoneCallStatus('idle');
    setLifelineModal(null);
  };

  // 3. Ask Audience Lifeline
  const useAskAudience = () => {
    if (usedLifelines.askAudience || isAnswerLocked) return;
    sounds.playLifeline();
    setUsedLifelines((prev) => ({ ...prev, askAudience: true }));

    // Generate biased audience votes towards correct answer
    const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    const correctPercent = Math.floor(Math.random() * 20) + 65; // 65% - 85%
    const remaining = 100 - correctPercent;
    const wrong1 = Math.floor(Math.random() * (remaining - 10));
    const wrong2 = Math.floor(Math.random() * (remaining - wrong1 - 5));
    const wrong3 = remaining - wrong1 - wrong2;

    const votes: Record<string, number> = {};
    const wrongLetters = letters.filter((l) => l !== currentQ.correct);
    votes[currentQ.correct] = correctPercent;
    votes[wrongLetters[0]] = wrong1;
    votes[wrongLetters[1]] = wrong2;
    votes[wrongLetters[2]] = wrong3;

    setLifelineModal({
      type: 'audience',
      data: { votes },
    });
  };

  // 4. Swap Question Lifeline (Available after Question 5)
  const useSwapQuestion = () => {
    if (usedLifelines.swapQuestion || isAnswerLocked || currentIdx < 4) return;
    sounds.playLifeline();
    setUsedLifelines((prev) => ({ ...prev, swapQuestion: true }));

    const backup = BACKUP_QUESTIONS[currentQ.level] || BACKUP_QUESTIONS[5];
    const shuffledBackup = shuffleQuestionOptions(backup);
    const newQuestions = [...questions];
    newQuestions[currentIdx] = {
      ...shuffledBackup,
      level: currentQ.level,
      prize: currentQ.prize,
      prizeNumber: currentQ.prizeNumber,
    };
    setQuestions(newQuestions);
    setSelectedOption(null);
    setHiddenOptions([]);
    setTimer(30);
  };

  // Calculate guaranteed milestone prize when game ends
  const getGuaranteedPrize = () => {
    const totalCorrect = Object.values(questionResults).filter(Boolean).length;
    if (gameState === 'victory' || totalCorrect === 15) return '150.000.000 đ';
    if (gameState === 'stopped') return currentQ.prize;

    if (totalCorrect >= 14) return '85.000.000 đ';
    if (totalCorrect >= 13) return '60.000.000 đ';
    if (totalCorrect >= 12) return '40.000.000 đ';
    if (totalCorrect >= 11) return '30.000.000 đ';
    if (totalCorrect >= 10) return '22.000.000 đ (Mốc an toàn số 2)';
    if (totalCorrect >= 9) return '14.000.000 đ';
    if (totalCorrect >= 8) return '10.000.000 đ';
    if (totalCorrect >= 7) return '6.000.000 đ';
    if (totalCorrect >= 6) return '3.000.000 đ';
    if (totalCorrect >= 5) return '2.000.000 đ (Mốc an toàn số 1)';
    if (totalCorrect >= 4) return '1.000.000 đ';
    if (totalCorrect >= 3) return '600.000 đ';
    if (totalCorrect >= 2) return '400.000 đ';
    if (totalCorrect >= 1) return '200.000 đ';
    return '0 đ';
  };

  return (
    <div className="space-y-6">
      {/* Game Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 rounded-3xl p-6 text-white border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-1 shadow-lg shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center border border-amber-300">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/40 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gameshow Trí Tuệ • Chuyên Đề Địa Lí 11</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
                AI LÀ TRIỆU PHÚ: SÔNG MÊ KÔNG & MRC
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Chinh phục 15 câu hỏi đỉnh cao về thủy văn, hiệp định MRC 1995, an ninh nguồn nước và 
                triết lý "Thuận thiên" thích ứng BĐKH ở Đồng bằng sông Cửu Long!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-900/90 border border-amber-400/30 px-4 py-2.5 rounded-2xl text-center shadow-inner">
              <span className="text-[10px] uppercase tracking-wider text-amber-400 font-extrabold block">
                Giải thưởng cao nhất
              </span>
              <span className="text-lg sm:text-xl font-black text-white">
                150.000.000 đ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SCREEN 1: INTRO SCREEN */}
      {/* ----------------------------------------------------------------- */}
      {gameState === 'intro' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-white shadow-2xl space-y-8 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="space-y-3">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-amber-500 p-1 shadow-2xl">
              <img
                src={KIEN_SANG_AVATAR}
                alt="Kiến Sáng"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[22px]"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-400">
              Chào mừng bạn đến với ghế nóng Ai Là Triệu Phú!
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
              Chinh phục 15 câu hỏi trắc nghiệm Địa lí 11! Đặc biệt: Nếu trả lời chưa đúng, hệ thống sẽ giải thích cặn kẽ và cho bạn tiếp tục ngay sang câu tiếp theo để trải nghiệm trọn vẹn 15 câu mà không bị quay lại từ đầu!
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/40">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chế độ học tập tích cực: Trả lời sai vẫn được đi tiếp câu tiếp theo</span>
            </div>
          </div>

          {/* Rules and 4 Lifelines */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                <HelpCircle className="w-4 h-4" />
                <span>50:50</span>
              </div>
              <p className="text-[11px] text-slate-400">Máy tính loại bỏ 2 phương án sai ngẫu nhiên.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <div className="flex items-center gap-1.5 text-teal-400 font-bold text-xs">
                <PhoneCall className="w-4 h-4" />
                <span>Gọi Kiến Sáng</span>
              </div>
              <p className="text-[11px] text-slate-400">Hỏi ý kiến trợ lý AI Kiến Sáng thông thái.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs">
                <Users className="w-4 h-4" />
                <span>Khán giả</span>
              </div>
              <p className="text-[11px] text-slate-400">Xin ý kiến biểu quyết từ trường quay.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <RefreshCw className="w-4 h-4" />
                <span>Đổi câu hỏi</span>
              </div>
              <p className="text-[11px] text-slate-400">Mở khóa sau câu số 5 để đổi câu khác.</p>
            </div>
          </div>

          <div className="pt-2 flex flex-col items-center gap-3">
            <button
              id="start-millionaire-btn"
              onClick={handleStartGame}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-lg shadow-xl hover:shadow-amber-500/25 transition-all transform hover:scale-105 cursor-pointer flex items-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>SẴN SÀNG NGỒI VÀO GHẾ NÓNG</span>
            </button>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-medium">
              <Shuffle className="w-3.5 h-3.5 text-amber-400" />
              <span>Các đáp án A, B, C, D được đảo vị trí ngẫu nhiên mỗi ván chơi</span>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* SCREEN 2: ACTIVE GAMEPLAY SCREEN */}
      {/* ----------------------------------------------------------------- */}
      {gameState === 'playing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Hot Seat Area (Left 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            {/* Top Hot Seat Bar: Level, Timer, and Lifelines */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
              {/* Question Level Badge */}
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                  {currentQ.level}
                </span>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    Câu hỏi số {currentQ.level} / 15
                  </p>
                  <p className="text-sm sm:text-base font-black text-amber-400">
                    Trị giá: {currentQ.prize}
                  </p>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-black text-lg shadow-inner ${
                    timer <= 5
                      ? 'border-red-500 text-red-400 bg-red-950/40 animate-ping'
                      : timer <= 10
                      ? 'border-amber-400 text-amber-300 bg-amber-950/30'
                      : 'border-teal-500 text-teal-300 bg-slate-950'
                  }`}
                >
                  {timer}
                </div>
              </div>

              {/* 4 Lifeline Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* 50:50 */}
                <button
                  id="lifeline-50-50"
                  onClick={useFiftyFifty}
                  disabled={usedLifelines.fiftyFifty || isAnswerLocked}
                  title="Trợ giúp 50:50"
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                    usedLifelines.fiftyFifty
                      ? 'opacity-30 line-through border-slate-700 bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'border-amber-400/60 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>50:50</span>
                </button>

                {/* Phone call */}
                <button
                  id="lifeline-phone"
                  onClick={usePhoneCall}
                  disabled={usedLifelines.phoneCall || isAnswerLocked}
                  title="Gọi điện cho trợ lý Kiến Sáng"
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                    usedLifelines.phoneCall
                      ? 'opacity-30 line-through border-slate-700 bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'border-teal-400/60 bg-teal-500/20 text-teal-300 hover:bg-teal-500/30'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Kiến Sáng</span>
                </button>

                {/* Audience */}
                <button
                  id="lifeline-audience"
                  onClick={useAskAudience}
                  disabled={usedLifelines.askAudience || isAnswerLocked}
                  title="Hỏi ý kiến khán giả"
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                    usedLifelines.askAudience
                      ? 'opacity-30 line-through border-slate-700 bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'border-blue-400/60 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Khán giả</span>
                </button>

                {/* Swap Question (after Q5) */}
                <button
                  id="lifeline-swap"
                  onClick={useSwapQuestion}
                  disabled={usedLifelines.swapQuestion || isAnswerLocked || currentIdx < 4}
                  title={currentIdx < 4 ? 'Mở khóa sau mốc câu số 5' : 'Đổi sang câu hỏi khác'}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                    currentIdx < 4 || usedLifelines.swapQuestion
                      ? 'opacity-30 border-slate-700 bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'border-emerald-400/60 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Đổi câu</span>
                </button>
              </div>
            </div>

            {/* Question Card (Classic Studio Frame) */}
            <div className="relative bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-8 text-white shadow-2xl min-h-[160px] flex items-center justify-center text-center">
              <span className="absolute -top-3 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-widest border border-indigo-400">
                {currentQ.category}
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl font-black leading-relaxed text-amber-100 max-w-2xl">
                {currentQ.question}
              </h3>
            </div>

            {/* Shuffle bar and indicator */}
            <div className="flex items-center justify-between px-1 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <Shuffle className="w-3.5 h-3.5 text-amber-400" />
                <span>Thứ tự đáp án: <strong className="text-amber-300">Đã đảo ngẫu nhiên</strong></span>
              </div>
              {!isAnswerLocked && (
                <button
                  id="shuffle-options-btn"
                  type="button"
                  onClick={handleShuffleCurrentOptions}
                  title="Đảo lại thứ tự các đáp án A, B, C, D của câu hỏi này"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-amber-400/80 text-slate-300 hover:text-amber-300 text-xs font-bold transition-all hover:bg-slate-800 cursor-pointer shadow-sm"
                >
                  <Shuffle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Đảo đáp án</span>
                </button>
              )}
            </div>

            {/* 4 Options (A, B, C, D) in 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(['A', 'B', 'C', 'D'] as ('A' | 'B' | 'C' | 'D')[]).map((key) => {
                const isSelected = selectedOption === key;
                const isCorrect = currentQ.correct === key;
                const isHidden = hiddenOptions.includes(key);

                // Option Styling based on game show states
                let btnStyle = 'bg-slate-900 border-indigo-900/80 text-slate-100 hover:bg-indigo-950/80 hover:border-amber-400';

                if (isSelected && !revealedResult) {
                  // Flashing yellow/orange when locked before result
                  btnStyle = 'bg-amber-500 border-amber-300 text-slate-950 animate-pulse font-black shadow-lg';
                } else if (revealedResult) {
                  if (isCorrect) {
                    // Correct answer turns green
                    btnStyle = 'bg-emerald-600 border-emerald-400 text-white font-black ring-4 ring-emerald-400/40 shadow-xl';
                  } else if (isSelected && !isCorrect) {
                    // Wrong selection turns red
                    btnStyle = 'bg-red-600 border-red-400 text-white font-black';
                  }
                }

                if (isHidden) {
                  return (
                    <div
                      key={key}
                      className="p-4 rounded-2xl border border-slate-800/40 bg-slate-950/30 opacity-10 cursor-not-allowed select-none min-h-[64px]"
                    />
                  );
                }

                return (
                  <button
                    key={key}
                    id={`option-btn-${key}`}
                    onClick={() => handleSelectOption(key)}
                    disabled={isAnswerLocked}
                    className={`p-4 rounded-2xl border-2 text-left flex items-center gap-3.5 transition-all cursor-pointer shadow-md select-none ${btnStyle}`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                        isSelected && !revealedResult
                          ? 'bg-slate-950 text-amber-400'
                          : isCorrect && revealedResult
                          ? 'bg-white text-emerald-700'
                          : 'bg-indigo-950 text-amber-400 border border-amber-400/40'
                      }`}
                    >
                      {key}
                    </span>
                    <span className="text-xs sm:text-sm font-bold leading-snug">
                      {currentQ.options[key]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Result / Explanation Box & Next Button */}
            {revealedResult && (
              <div
                className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-2 animate-in fade-in slide-in-from-bottom-2 ${
                  revealedResult === 'correct'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100'
                    : 'bg-red-950/80 border-red-500 text-red-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-black text-base flex items-center gap-2">
                      {revealedResult === 'correct' ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          <span>CHÍNH XÁC! Chúc mừng bạn đã vượt qua câu số {currentQ.level}!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                          <span>
                            RẤT TIẾC! Đáp án chính xác là phương án [{currentQ.correct}]: {currentQ.options[currentQ.correct]}.
                          </span>
                        </>
                      )}
                    </span>
                    {revealedResult === 'wrong' && currentIdx < 14 && (
                      <p className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Đừng nản lòng! Bạn được đi tiếp sang câu số {currentIdx + 2}, không quay lại từ đầu.</span>
                      </p>
                    )}
                  </div>

                  {currentIdx < 14 ? (
                    <button
                      id="next-question-btn"
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer shrink-0"
                    >
                      <span>Qua câu tiếp theo ({currentIdx + 2}/15)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      id="finish-game-btn"
                      onClick={() => {
                        sounds.playClick();
                        const totalCorrect = Object.values(questionResults).filter(Boolean).length;
                        setGameState(totalCorrect === 15 ? 'victory' : 'completed');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer shrink-0"
                    >
                      <Trophy className="w-4 h-4" />
                      <span>Xem kết quả 15 câu</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                  <strong>Kiến thức ghi nhớ:</strong> {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Safe Exit: Stop Game Button */}
            {!isAnswerLocked && (
              <div className="flex justify-end">
                <button
                  onClick={handleStopGame}
                  className="text-xs text-slate-400 hover:text-amber-400 font-bold px-3 py-1.5 rounded-lg border border-slate-800 hover:border-amber-400/40 transition-colors cursor-pointer"
                >
                  Dừng cuộc chơi và bảo toàn số tiền thưởng
                </button>
              </div>
            )}
          </div>

          {/* Right Prize Ladder Bar (Col 4) */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-4 text-white shadow-2xl flex flex-col justify-between">
            <div className="space-y-1 mb-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 text-center pb-2 border-b border-slate-800 flex items-center justify-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Thang Tiền Thưởng (15 Mốc)</span>
              </h4>
            </div>

            {/* 15 Steps (15 on top down to 1 at bottom) */}
            <div className="space-y-1 overflow-y-auto max-h-[480px] pr-1">
              {[...questions].reverse().map((q) => {
                const qIdx = q.level - 1;
                const isCurrent = q.level === currentQ.level;
                const result = questionResults[qIdx];
                const hasAnswered = result !== undefined;
                const isCorrect = result === true;
                const isMilestone = q.level === 5 || q.level === 10 || q.level === 15;

                let rowStyle = 'bg-slate-950/60 text-slate-400 border border-slate-800';

                if (isCurrent) {
                  rowStyle = 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg ring-2 ring-amber-300 scale-102';
                } else if (hasAnswered) {
                  if (isCorrect) {
                    rowStyle = 'bg-emerald-950/50 text-emerald-300 border-emerald-700/60 font-medium';
                  } else {
                    rowStyle = 'bg-red-950/40 text-red-300 border-red-800/50';
                  }
                } else if (isMilestone) {
                  rowStyle = 'bg-indigo-950/80 text-amber-300 font-extrabold border-indigo-700/60';
                }

                return (
                  <div
                    key={q.level}
                    className={`px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-all ${rowStyle}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-5 text-center font-bold ${isMilestone ? 'text-amber-400' : ''}`}>
                        {q.level}
                      </span>
                      {isMilestone && <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                      <span className="font-semibold">{q.prize}</span>
                    </div>
                    {hasAnswered && (
                      isCorrect ? (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="hidden sm:inline">Đúng</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] text-red-400 font-bold">
                          <XCircle className="w-3.5 h-3.5 text-red-400" />
                          <span className="hidden sm:inline">Sai</span>
                        </span>
                      )
                    )}
                    {isCurrent && <span className="text-[10px] font-black uppercase px-1 rounded bg-slate-950 text-amber-300">Đang trả lời</span>}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center text-[11px] text-slate-400 space-y-1">
              <p>Mốc 5: <strong>2.000.000 đ</strong> • Mốc 10: <strong>22.000.000 đ</strong></p>
              <p className="text-amber-400 font-bold">Chạm mốc an toàn không bao giờ ra về tay trắng!</p>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* SCREEN 3: GAME OVER / VICTORY / COMPLETED / STOPPED SUMMARY       */}
      {/* ----------------------------------------------------------------- */}
      {(gameState === 'gameover' || gameState === 'victory' || gameState === 'completed' || gameState === 'stopped') && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl max-w-2xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-800 p-1 flex items-center justify-center border-2 border-amber-400 shadow-2xl">
            {gameState === 'victory' ? (
              <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
            ) : gameState === 'completed' ? (
              <Award className="w-10 h-10 text-teal-400 animate-pulse" />
            ) : gameState === 'stopped' ? (
              <Award className="w-10 h-10 text-amber-400" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-amber-500" />
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {gameState === 'victory'
                ? '🏆 XUẤT SẮC! BẠN LÀ TRIỆU PHÚ ĐỊA LÍ 11!'
                : gameState === 'completed'
                ? '🎉 HOÀN THÀNH 15 CÂU HỎI AI LÀ TRIỆU PHÚ!'
                : gameState === 'stopped'
                ? 'BẠN ĐÃ BẢO TOÀN THÀNH CÔNG GIẢI THƯỞNG!'
                : 'CUỘC CHƠI TẠM THỜI KHÉP LẠI!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {gameState === 'victory'
                ? 'Bạn đã xuất sắc trả lời đúng tuyệt đối trọn vẹn 15/15 câu hỏi hóc búa về sông Mê Kông và chuyên đề Địa lí 11!'
                : gameState === 'completed'
                ? `Chúc mừng bạn đã hoàn thành trọn vẹn cả 15 câu hỏi của cuộc chơi với ${Object.values(questionResults).filter(Boolean).length}/15 câu trả lời đúng!`
                : `Bạn đã dừng chân tại câu hỏi số ${currentQ.level}. Hãy ôn tập thêm và thử sức lại nhé!`}
            </p>
          </div>

          {/* Prize Won Banner & Correct Count */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border-2 border-amber-400/60 max-w-lg mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
              Thành tích đạt được
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/90 rounded-xl p-3 border border-amber-400/30 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Số câu trả lời đúng</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {Object.values(questionResults).filter(Boolean).length} / 15
                </span>
              </div>
              <div className="bg-slate-900/90 rounded-xl p-3 border border-amber-400/30 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Tiền thưởng nhận được</span>
                <span className="text-lg sm:text-xl font-black text-amber-400">
                  {getGuaranteedPrize()}
                </span>
              </div>
            </div>
          </div>

          {/* Question Summary Grid */}
          <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800 text-left space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Bảng điểm chi tiết 15 câu:</span>
              <span className="text-amber-400">Tỉ lệ đúng: {Math.round((Object.values(questionResults).filter(Boolean).length / 15) * 100)}%</span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-1.5">
              {questions.map((q, idx) => {
                const isCorrect = questionResults[idx] === true;
                const isWrong = questionResults[idx] === false;
                return (
                  <div
                    key={idx}
                    className={`px-2 py-1.5 rounded-lg text-center text-xs font-bold border flex items-center justify-center gap-1 ${
                      isCorrect
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : isWrong
                        ? 'bg-red-950/80 border-red-500 text-red-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <span>Câu {idx + 1}</span>
                    {isCorrect ? '✓' : isWrong ? '✗' : '-'}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certificate or Geography 11 Commendation */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1 text-left">
            <div className="flex items-center gap-2 text-teal-400 font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>Chứng chỉ danh dự Chuyên đề Địa lí 11:</span>
            </div>
            <p className="leading-relaxed">
              Bạn đã hoàn thành thử thách Ai Là Triệu Phú về sông Mê Kông, thể hiện sự hiểu biết sâu sắc về hiệp định MRC 1995, địa hình - khí hậu 6 quốc gia ven sông, an ninh nguồn nước và mô hình "Thuận thiên" thích ứng BĐKH ở ĐBSCL.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleStartGame}
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>CHƠI LẠI TỪ ĐẦU (ĐẢO CÂU & ĐÁP ÁN MỚI)</span>
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* MODALS FOR LIFELINES (PHONE CALL & AUDIENCE POLL)                 */}
      {/* ----------------------------------------------------------------- */}
      {lifelineModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-indigo-500 rounded-3xl p-6 max-w-md w-full text-white shadow-2xl space-y-4 animate-in zoom-in-95">
            {lifelineModal.type === 'phone' ? (
              <>
                {/* Call Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 bg-white shrink-0 shadow-lg">
                        <img
                          src={KIEN_SANG_AVATAR}
                          alt="Kiến Sáng"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {phoneCallStatus === 'connected' && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center animate-pulse" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-black text-amber-400 text-base flex items-center gap-1.5">
                        <span>{lifelineModal.data.caller}</span>
                      </h4>
                      <p className="text-xs text-teal-300 flex items-center gap-1">
                        {phoneCallStatus === 'calling' ? (
                          <span className="text-amber-300 animate-pulse font-medium">Đang gọi tới Kiến Sáng...</span>
                        ) : (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <Radio className="w-3 h-3 animate-pulse" />
                            Đang đàm thoại: 00:{phoneCallDuration < 10 ? `0${phoneCallDuration}` : phoneCallDuration}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-teal-900/60 border border-teal-500/40 text-[11px] text-teal-300 font-bold">
                      Độ tin cậy 98%
                    </span>
                  </div>
                </div>

                {/* Call Status & Soundwave Indicator */}
                {phoneCallStatus === 'calling' ? (
                  <div className="py-8 flex flex-col items-center justify-center space-y-3 bg-slate-800/60 rounded-2xl border border-slate-700">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-teal-500/20 animate-ping absolute inset-0" />
                      <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/40 relative z-10">
                        <PhoneCall className="w-8 h-8 text-amber-400 animate-bounce" />
                      </div>
                    </div>
                    <p className="text-sm font-bold text-slate-200">Đang đổ chuông: Tu... tu... tu...</p>
                    <p className="text-xs text-slate-400">Kiến Sáng đang chuẩn bị nhấc máy trả lời bạn!</p>
                  </div>
                ) : (
                  <>
                    {/* Speaking Wave Bar */}
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-teal-950/60 border border-teal-800/60 text-xs">
                      <div className="flex items-center gap-2 text-teal-200">
                        {isPhoneSpeaking ? (
                          <>
                            <div className="flex items-center gap-0.5 text-emerald-400">
                              <span className="w-1 h-3 bg-emerald-400 animate-bounce" />
                              <span className="w-1 h-4 bg-emerald-400 animate-bounce [animation-delay:0.15s]" />
                              <span className="w-1 h-2 bg-emerald-400 animate-bounce [animation-delay:0.3s]" />
                            </div>
                            <span className="font-bold text-emerald-300">Kiến Sáng đang trả lời bằng giọng nói...</span>
                          </>
                        ) : (
                          <span className="text-slate-300">Kiến Sáng đã chia sẻ xong lời khuyên</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isPhoneSpeaking ? (
                          <button
                            onClick={handleStopPhoneVoice}
                            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Square className="w-3 h-3 fill-slate-300" />
                            Dừng đọc
                          </button>
                        ) : (
                          <button
                            onClick={handleReplayPhoneVoice}
                            className="px-2 py-1 rounded bg-teal-800 hover:bg-teal-700 text-teal-100 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="w-3 h-3" />
                            Nghe lại
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Speech Transcript */}
                    <div className="p-4 rounded-2xl bg-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 border border-slate-700 max-h-48 overflow-y-auto">
                      <p className="italic font-normal text-slate-100">"{lifelineModal.data.advice}"</p>
                    </div>
                  </>
                )}

                {/* Call Controls Button */}
                <div className="pt-2">
                  <button
                    onClick={handleHangupPhoneCall}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-red-950/40"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>CẢM ƠN KIẾN SÁNG & GÁC MÁY CHỌN ĐÁP ÁN</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <h4 className="font-black text-blue-400 text-base">
                    Kết Quả Biểu Quyết Khán Giả Trường Quay
                  </h4>
                </div>

                <div className="space-y-3 pt-2">
                  {(['A', 'B', 'C', 'D'] as ('A' | 'B' | 'C' | 'D')[]).map((letter) => {
                    const percent = lifelineModal.data.votes[letter] || 0;
                    return (
                      <div key={letter} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-amber-400">Phương án {letter}:</span>
                          <span>{percent}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-teal-400 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setLifelineModal(null)}
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Cảm ơn, tôi đã rõ! Tiếp tục chọn đáp án
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
