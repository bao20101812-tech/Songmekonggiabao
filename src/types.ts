export type EducationLevel = 'tieuhoc' | 'thcs' | 'thpt';

export type TabType = 'overview' | 'map' | 'games' | 'mrc' | 'vietnam' | 'quiz' | 'chatbot' | 'prompt_generator';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  levelBadge?: EducationLevel;
  source?: 'gemini-ai' | 'local-expert';
  suggestedFollowups?: string[];
}

export interface CountryInfo {
  id: string;
  name: string;
  vietnameseName: string;
  localRiverName: string;
  flag: string;
  lengthKm: number;
  basinSharePercent: number;
  flowContributionPercent: number;
  description: string;
  keyFeatures: string[];
  capital: string;
  mrcStatus: 'Thành viên sáng lập' | 'Đối tác Đối thoại (Dialogue Partner)';
}

export interface RiverStation {
  id: string;
  name: string;
  country: string;
  elevationM: number;
  distanceFromSourceKm: number;
  flowM3s: number;
  importance: string;
  coordinates: { x: number; y: number }; // Relative SVG percentage
}

export interface QuizQuestion {
  id: string;
  level: EducationLevel;
  gradeLabel: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  practicalVietnamNote?: string;
}

export interface SimulationParams {
  upstreamDamDischarge: number; // 20% to 120% normal
  drySeasonRainfall: number; // -50% to +50%
  seaLevelRiseCm: number; // 0 to 50 cm
  mangroveRestoration: number; // 0 to 100%
  freshwaterStorageProject: boolean; // Công trình trữ nước ngọt
}

export interface SimulationResult {
  salinityIntrusionKm: number; // Khoảng cách mặn 4g/l lấn sâu vào sông Tiền, sông Hậu
  sedimentDepositPercent: number; // Lượng phù sa về ĐBSCL so với thời kỳ tự nhiên
  agriculturalRisk: 'An toàn' | 'Cảnh báo thấp' | 'Nguy cơ cao' | 'Khủng hoảng nghiêm trọng';
  freshwaterSupplyStatus: string;
  recommendations: string[];
}
