import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==================== CẤP TIỂU HỌC (LỚP 1 - 5) ====================
  {
    id: 'th-1',
    level: 'tieuhoc',
    gradeLabel: 'Tiểu học (Lớp 1 - 5)',
    category: 'Khám phá dòng sông',
    question: 'Sông Mê Kông khi chảy vào đất nước Việt Nam thân yêu của chúng ta được gọi với tên gọi quen thuộc nào?',
    options: [
      'Sông Hồng',
      'Sông Cửu Long (Chín Rồng)',
      'Sông Hương',
      'Sông Đồng Nai'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Khi vào Việt Nam, sông chia thành các nhánh đổ ra biển như chín con rồng uốn lượn nên dân gian gọi là Sông Cửu Long.',
    practicalVietnamNote: 'Sông Cửu Long bồi đắp nên Đồng bằng sông Cửu Long trù phú - quê hương của những vựa lúa bạt ngàn.'
  },
  {
    id: 'th-2',
    level: 'tieuhoc',
    gradeLabel: 'Tiểu học (Lớp 1 - 5)',
    category: 'Thế giới động vật',
    question: 'Loài sinh vật biển đặc biệt nào có thể sinh sống trong môi trường nước ngọt của sông Mê Kông và rất cần được bảo vệ?',
    options: [
      'Cá voi sát thủ',
      'Cá heo nước ngọt Irrawaddy',
      'Chim cánh cụt',
      'Hải cẩu Bắc Cực'
    ],
    correctIndex: 1,
    explanation: 'Đúng rồi! Cá heo Irrawaddy là loài cá heo nước ngọt cực kỳ quý hiếm sinh sống ở một số đoạn sông Mê Kông (Lào và Campuchia).',
    practicalVietnamNote: 'Chúng ta cùng bảo vệ nguồn nước sạch để các bạn cá heo và muôn loài thủy sản có ngôi nhà an toàn nhé!'
  },
  {
    id: 'th-3',
    level: 'tieuhoc',
    gradeLabel: 'Tiểu học (Lớp 1 - 5)',
    category: 'Hành trình các quốc gia',
    question: 'Dòng sông Mê Kông vĩ đại chảy qua bao nhiêu quốc gia?',
    options: [
      '2 quốc gia',
      '4 quốc gia',
      '6 quốc gia',
      '10 quốc gia'
    ],
    correctIndex: 2,
    explanation: 'Tuyệt vời! Sông Mê Kông chảy qua 6 quốc gia gồm: Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia và Việt Nam.',
    practicalVietnamNote: 'Dòng sông là sợi dây gắn kết tình hữu nghị thân thiết giữa các nước láng giềng.'
  },
  {
    id: 'th-4',
    level: 'tieuhoc',
    gradeLabel: 'Tiểu học (Lớp 1 - 5)',
    category: 'Mùa nước nổi',
    question: 'Ở miền Tây Nam Bộ Việt Nam, mùa nước về mang theo tôm cá và đất phù sa màu mỡ còn được gọi là gì?',
    options: [
      'Mùa bão tuyết',
      'Mùa nước nổi (mùa lũ hiền hòa)',
      'Mùa hạn hán',
      'Mùa đông lạnh giá'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Người dân miền Tây gọi là "Mùa nước nổi" vì nước dâng từ từ mang phù sa màu mỡ, tôm cá đầy đồng, bông súng, bông điên điển nở rộ.',
    practicalVietnamNote: 'Đây là nét văn hóa sinh hoạt độc đáo của người dân Đồng bằng sông Cửu Long.'
  },

  // ==================== CẤP THCS (LỚP 6 - 9) ====================
  {
    id: 'thcs-1',
    level: 'thcs',
    gradeLabel: 'THCS (Lớp 6 - 9)',
    category: 'Địa lí tự nhiên',
    question: 'Sông Mê Kông bắt nguồn từ khu vực địa hình nào?',
    options: [
      'Dãy núi Himalaya ở Ấn Độ',
      'Cao nguyên Tây Tạng (dãy Tanggula, Trung Quốc) ở độ cao trên 5.000m',
      'Vùng núi Altai ở Mông Cổ',
      'Dãy Trường Sơn ở Việt Nam'
    ],
    correctIndex: 1,
    explanation: 'Đúng! Sông Mê Kông bắt nguồn từ băng tuyết tan trên vùng núi cao hiểm trở thuộc cao nguyên Tây Tạng (Trung Quốc), nơi đây sông có tên là Lan Thương Giang.',
    practicalVietnamNote: 'Từ độ cao trên 5.000m, sông vượt qua hơn 4.350km trước khi đổ ra Biển Đông tại Việt Nam.'
  },
  {
    id: 'thcs-2',
    level: 'thcs',
    gradeLabel: 'THCS (Lớp 6 - 9)',
    category: 'Thủy văn & Điều hòa dòng chảy',
    question: 'Hồ nước ngọt tự nhiên nào ở Campuchia đóng vai trò như chiếc "bình điều áp", giảm lũ mùa mưa và cấp nước mùa khô cho ĐBSCL?',
    options: [
      'Hồ Ba Bể',
      'Biển Hồ (Tonle Sap)',
      'Hồ Tây',
      'Hồ Thác Bà'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Biển Hồ (Tonle Sap) là hồ nước ngọt lớn nhất Đông Nam Á, có khả năng đảo chiều dòng chảy theo mùa để tiếp nhận và giải phóng lượng nước khổng lồ.',
    practicalVietnamNote: 'Nếu Biển Hồ cạn kiệt nguồn nước, hạ lưu ĐBSCL sẽ đối mặt với nguy cơ hạn hán và xâm nhập mặn cực kỳ gay gắt.'
  },
  {
    id: 'thcs-3',
    level: 'thcs',
    gradeLabel: 'THCS (Lớp 6 - 9)',
    category: 'Dòng chảy & Biên giới',
    question: 'Đoạn sông Mê Kông chảy qua quốc gia nào có chiều dài lớn nhất và đóng góp tỷ lệ phần trăm lưu lượng nước cao nhất toàn lưu vực (~35%)?',
    options: [
      'Thái Lan',
      'Lào',
      'Campuchia',
      'Myanmar'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Đất nước Lào đóng góp khoảng 35% lưu lượng nước cho toàn lưu vực sông Mê Kông, hơn 90% diện tích đất nước Lào nằm trọn trong lưu vực.',
    practicalVietnamNote: 'Các công trình thủy điện trên dòng chính và phụ lưu tại Lào có ảnh hưởng trực tiếp đến dòng chảy về Việt Nam.'
  },
  {
    id: 'thcs-4',
    level: 'thcs',
    gradeLabel: 'THCS (Lớp 6 - 9)',
    category: 'Môi trường & Biến đổi',
    question: 'Khi chảy vào lãnh thổ Việt Nam, sông Mê Kông chia thành hai phân lưu chính là gì?',
    options: [
      'Sông Hồng và Sông Thái Bình',
      'Sông Tiền và Sông Hậu',
      'Sông Sài Gòn và Sông Đồng Nai',
      'Sông Vàm Cỏ Đông và Vàm Cỏ Tây'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Sông Mê Kông đi qua cửa khẩu Tân Châu và Châu Đốc (An Giang), tách ra làm hai nhánh lớn là Sông Tiền và Sông Hậu ôm lấy dải đồng bằng màu mỡ.',
    practicalVietnamNote: 'Hai dòng sông này là nguồn sống cung cấp nước ngọt và phù sa cho hơn 20 triệu người dân ĐBSCL.'
  },

  // ==================== CẤP THPT (LỚP 10 - 12 - CHUYÊN ĐỀ ĐỊA LÍ 11) ====================
  {
    id: 'thpt-1',
    level: 'thpt',
    gradeLabel: 'THPT (Chuyên đề Địa lí 11)',
    category: 'Ủy hội Sông Mê Kông (MRC)',
    question: 'Ủy hội sông Mê Kông quốc tế (MRC) được thành lập năm 1995 dựa trên văn kiện pháp lý nào?',
    options: [
      'Hiệp ước Hòa bình Đông Nam Á 1976',
      'Hiệp định về Hợp tác Phát triển Bền vững Lưu vực Sông Mê Kông (Hiệp định Mê Kông 1995)',
      'Tuyên bố Bangkok về Môi trường 1990',
      'Công ước Liên Hợp Quốc về Luật Biển 1982'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Ngày 5/4/1995, 4 quốc gia hạ lưu gồm Campuchia, Lào, Thái Lan và Việt Nam đã ký kết Hiệp định Mê Kông 1995, chính thức thành lập MRC.',
    practicalVietnamNote: 'Đây là cơ chế liên chính phủ duy nhất có đầy đủ tính pháp lý quốc tế về lưu vực sông Mê Kông để Việt Nam bảo vệ quyền lợi hạ du.'
  },
  {
    id: 'thpt-2',
    level: 'thpt',
    gradeLabel: 'THPT (Chuyên đề Địa lí 11)',
    category: 'Cơ chế Quốc tế & Thành viên',
    question: 'Trong 6 quốc gia thuộc lưu vực sông Mê Kông, hai quốc gia nào đóng vai trò là "Đối tác Đối thoại" (Dialogue Partners) của Ủy hội sông Mê Kông (MRC) từ năm 1996?',
    options: [
      'Việt Nam và Campuchia',
      'Lào và Thái Lan',
      'Trung Quốc và Myanmar',
      'Ấn Độ và Bangladesh'
    ],
    correctIndex: 2,
    explanation: 'Chính xác! Trung Quốc và Myanmar nằm ở phần thượng lưu (Lancang River) và không phải là thành viên chính thức đầy đủ mà là Đối tác Đối thoại của MRC.',
    practicalVietnamNote: 'Việc hợp tác và chia sẻ số liệu xả nước mùa khô từ các đập thủy điện Trung Quốc là trọng tâm ngoại giao nguồn nước của Việt Nam.'
  },
  {
    id: 'thpt-3',
    level: 'thpt',
    gradeLabel: 'THPT (Chuyên đề Địa lí 11)',
    category: 'Địa lí 11 - An ninh nguồn nước ĐBSCL',
    question: 'Hậu quả nghiêm trọng nhất của việc phát triển ồ ạt các đập thủy điện bậc thang ở thượng nguồn đối với Đồng bằng sông Cửu Long là gì?',
    options: [
      'Làm gia tăng diện tích rừng ngập mặn',
      'Giữ lại phần lớn bùn cát, làm sụt giảm nghiêm trọng lượng phù sa bồi đắp và gây sạt lở bờ sông, bờ biển',
      'Làm nước sông chảy xiết hơn trong mùa khô',
      'Khiến cá tra và cá basa sinh sản quá mức'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Thủy điện thượng nguồn giữ lại hơn 50-70% lượng trầm tích phù sa. Nước sông "đói phù sa" làm tăng xói lở đáy sông, bờ sông và bờ biển ĐBSCL.',
    practicalVietnamNote: 'Đồng bằng sông Cửu Long đang bị chìm dần và co ngót diện tích do sụt lún kết hợp thiếu hụt phù sa bồi đắp.'
  },
  {
    id: 'thpt-4',
    level: 'thpt',
    gradeLabel: 'THPT (Chuyên đề Địa lí 11)',
    category: 'Địa lí 11 - Xâm nhập mặn & Biến đổi khí hậu',
    question: 'Quy chuẩn nồng độ mặn (ranh mặn) phổ biến được các nhà khoa học và cơ quan khí tượng thủy văn sử dụng để cảnh báo nguy hại cho cây trồng và nước sinh hoạt tại ĐBSCL là bao nhiêu?',
    options: [
      '10 g/lít',
      '4 g/lít',
      '0.01 g/lít',
      '35 g/lít (độ mặn nước biển)'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Ranh mặn 4g/lít (hoặc 4‰) là ngưỡng giới hạn mà hầu hết các giống lúa và cây ăn trái không thể sinh trưởng, gây chết cây và hư hỏng hệ thống cấp nước sinh hoạt.',
    practicalVietnamNote: 'Vào các năm hạn mặn lịch sử (2016, 2020), ranh mặn 4g/l đã xâm nhập sâu tới 70-95km vào nội đồng các tỉnh Bến Tre, Tiền Giang, Sóc Trăng, Trà Vinh.'
  },
  {
    id: 'thpt-5',
    level: 'thpt',
    gradeLabel: 'THPT (Chuyên đề Địa lí 11)',
    category: 'Chủ trương & Quyết sách Việt Nam',
    question: 'Nghị quyết số 120/NQ-CP (năm 2017) của Chính phủ Việt Nam đã đưa ra phương châm cốt lõi nào cho sự phát triển bền vững của Đồng bằng sông Cửu Long?',
    options: [
      'Đắp đê ngăn mặn toàn bộ bờ biển miền Tây',
      'Phát triển bền vững thích ứng với biến đổi khí hậu theo nguyên tắc "Thuận thiên"',
      'Chuyển toàn bộ diện tích đất nông nghiệp sang làm khu công nghiệp nặng',
      'Ngăn dòng sông Hậu và sông Tiền để làm hồ chứa nước tĩnh'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Nghị quyết 120/NQ-CP được coi là "Nghị quyết thế kỷ" của ĐBSCL, nhấn mạnh triết lý "Thuận thiên" - tôn trọng quy luật tự nhiên, biến thách thức mặn - lợ thành cơ hội phát triển (như mô hình tôm - lúa).',
    practicalVietnamNote: 'Đây là bài học kinh điển trong chương trình Chuyên đề Địa lí 11 khi phân tích liên hệ phát triển kinh tế vùng ĐBSCL.'
  },
  {
    id: 'thpt-6',
    level: 'thpt',
    gradeLabel: 'THPT (Chuyên đề Địa lí 11)',
    category: 'Quy trình MRC & Luật pháp quốc tế',
    question: 'Thủ tục PNPCA (Procedures for Notification, Prior Consultation and Agreement) của Ủy hội sông Mê Kông có ý nghĩa gì đối với các dự án trên dòng chính?',
    options: [
      'Cho phép một quốc gia tự ý chặn sông mà không cần hỏi ý kiến nước khác',
      'Yêu cầu quốc gia dự kiến xây dựng công trình trên dòng chính phải thông báo, tiến hành tham vấn trước và tìm kiếm sự đồng thuận từ các nước thành viên',
      'Chỉ áp dụng cho các dòng suối nhỏ dưới 5 mét',
      'Quy định mức thuế đánh vào tàu thuyền qua lại'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! PNPCA là thủ tục bắt buộc để đánh giá tác động xuyên biên giới, giúp các nước hạ du như Việt Nam đưa ra khuyến nghị kỹ thuật giảm thiểu thiệt hại trước khi một đập thủy điện được xây dựng.',
    practicalVietnamNote: 'Việt Nam đã nhiều lần sử dụng diễn đàn PNPCA để bảo vệ quyền lợi sinh kế của người dân ĐBSCL.'
  }
];
