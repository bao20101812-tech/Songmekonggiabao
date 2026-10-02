import { CountryInfo, RiverStation } from '../types';

export const MEKONG_OVERVIEW = {
  name: 'Sông Mê Kông (Lan Thương - Mê Kông - Cửu Long)',
  length: 'Khoảng 4.350 - 4.763 km (dài thứ 12 thế giới, thứ 7 châu Á)',
  basinArea: '795.000 km² (gấp gần 2,5 lần diện tích nước Việt Nam)',
  annualFlow: 'Khoảng 475 tỉ m³ nước/năm (đứng thứ 8 thế giới về lưu lượng)',
  source: 'Cao nguyên Tây Tạng (dãy núi Tanggula, tỉnh Thanh Hải, Trung Quốc) ở độ cao trên 5.000m',
  mouth: 'Biển Đông (qua 9 nhánh rẽ tại Đồng bằng sông Cửu Long, Việt Nam - "Cửu Long Giang")',
  riparianCountriesCount: 6,
  populationInBasin: 'Hơn 70 triệu người phụ thuộc trực tiếp vào nguồn nước, thủy sản và đất canh tác màu mỡ',
  biodiversity: 'Hệ sinh thái sông nước ngọt phong phú thứ 2 thế giới (chỉ sau sông Amazon), hơn 1.100 loài cá nước ngọt',
};

export const GEOGRAPHY_SCOPE_DATA = {
  coordinates: {
    northExtreme: '33°50\' B (Dãy Tanggula, Thanh Hải, Trung Quốc)',
    southExtreme: '8°30\' B (Mũi Cà Mau & Cửa sông Cửu Long, Việt Nam)',
    westExtreme: '94°00\' Đ (Thượng nguồn suối tuyết Lan Thương Giang)',
    eastExtreme: '106°15\' Đ (Duyên hải ĐBSCL - Biển Đông, Việt Nam)',
    latRange: '8°30\' B - 33°50\' B (Trải dài hơn 25 vĩ độ)',
    lonRange: '94°00\' Đ - 106°15\' Đ (Trải rộng hơn 12 kinh độ)',
  },
  basinAreaKm2: 795000,
  riverLengthKm: 4763,
  populationCount: 'Hơn 70 triệu người (~300 cộng đồng dân tộc)',
  averageFlowM3s: 15000,
  annualFlowBillionM3: 475,
  adjacentBorders: {
    north: 'Cao nguyên Thanh Tạng (Tây Tạng), giáp lưu vực sông Trường Giang (Dương Tử) & Hoàng Hà',
    south: 'Biển Đông và tiếp giáp Vịnh Thái Lan (Thái Bình Dương)',
    west: 'Lưu vực sông Thanlwin (Salween, Myanmar) và lưu vực sông Chao Phraya (Thái Lan)',
    east: 'Dãy Trường Sơn (Annamite Range), lưu vực sông Hồng và dải duyên hải miền Trung Việt Nam',
  },
  regions: {
    upperBasin: {
      code: 'UMB',
      name: 'Thượng lưu vực Sông Mê Kông (Upper Mekong Basin / Lan Thương Giang)',
      countries: 'Trung Quốc (Vân Nam, Thanh Hải, Tây Tạng) và một phần Myanmar',
      flag: '🇨🇳 🇲🇲',
      areaKm2: 195000,
      areaPercent: 24,
      flowContributionPercent: 18, // 16% TQ + 2% MM
      riverLengthKm: 2429, // 2161 TQ + 268 biên giới Lào - MM
      elevationRange: 'Trên 5.000m xuống ~500m (Độ dốc lòng sông cực lớn)',
      terrain: 'Hẻm núi sâu, dốc hiểm trở, thung lũng hẹp, di sản thế giới Tam Giang Song Hành (Three Parallel Rivers)',
      climate: 'Cận nhiệt đới gió mùa núi cao & ôn đới lạnh, mùa đông đóng băng tuyết',
      waterSource: 'Nước băng tuyết tan vào đầu mùa hè kết hợp mưa núi mùa hè',
      mrcStatus: 'Đối tác Đối thoại của Ủy hội Sông Mê Kông (từ năm 1996)',
      keyCharacteristics: [
        'Diện tích hẹp dạng cán chổi (chiếm 24% diện tích lưu vực)',
        'Tiềm năng thủy điện khổng lồ với hơn 12 siêu đập bậc thang (Tiểu Loan, Nọa Trát Độ...)',
        'Chiếm 16% tổng lưu lượng nước cả năm nhưng chiếm 40-50% lượng nước mùa khô đổ về hạ lưu',
        'Giữ lại lượng phù sa và bùn cát mịn lớn nhất của toàn lưu vực'
      ]
    },
    lowerBasin: {
      code: 'LMB',
      name: 'Hạ lưu vực Sông Mê Kông (Lower Mekong Basin - Vùng phụ trách của MRC)',
      countries: 'Lào, Thái Lan, Campuchia, Việt Nam (4 quốc gia thành viên MRC)',
      flag: '🇱🇦 🇹🇭 🇰🇭 🇻🇳',
      areaKm2: 600000,
      areaPercent: 76,
      flowContributionPercent: 82, // 35% Lào + 18% Thái + 18% Cam + 11% VN
      riverLengthKm: 2334,
      elevationRange: 'Khoảng 500m xuống 0m (Độ dốc thoải dần, ĐBSCL chỉ cao 0.5 - 1.5m)',
      terrain: 'Đồi núi Bắc Lào chuyển tiếp sang cao nguyên Khorat (Thái Lan), bồn trũng Biển Hồ (Campuchia) và đồng bằng châu thổ sông Cửu Long',
      climate: 'Nhiệt đới gió mùa ẩm điển hình, phân hóa sâu sắc 2 mùa mưa (tháng 5-10) và mùa khô (tháng 11-4)',
      waterSource: 'Mưa gió mùa nhiệt đới trên các phụ lưu lớn (Nam Ou, Se Kong, Sre Pok, Se San, sông Mun...)',
      mrcStatus: '4 quốc gia thành viên chính thức ký Hiệp định Mê Kông ngày 05/04/1995',
      keyCharacteristics: [
        'Chiếm 76% diện tích lưu vực và là nơi sinh sống của hơn 65 triệu người',
        'Vựa lúa gạo số 1 Đông Nam Á và nguồn đạm thủy sản nước ngọt quan trọng nhất thế giới',
        'Có kỳ quan Biển Hồ (Tonle Sap) đảo ngược dòng chảy độc nhất vô nhị',
        'Khu vực hạ du (ĐBSCL) chịu tổn thương nặng nề nhất do suy giảm phù sa, sạt lở và xâm nhập mặn'
      ]
    }
  },
  geopoliticalSignificance: [
    {
      title: 'Vị trí địa lí kết nối Đông Bắc Á & Đông Nam Á',
      desc: 'Là hành lang kinh tế tự nhiên nối liền cao nguyên Thanh Tạng trù phú tài nguyên năng lượng với tiểu vùng Mekong màu mỡ nông nghiệp và cửa ngõ hàng hải Biển Đông.'
    },
    {
      title: 'Phạm vi lưu vực xuyên biên giới đan xen lợi ích',
      desc: 'Sự phụ thuộc lẫn nhau giữa 6 quốc gia ven sông: các nước thượng nguồn nắm giữ chìa khóa dòng chảy và phù sa, trong khi các nước hạ nguồn phụ thuộc vào nguồn nước để duy trì an ninh lương thực.'
    },
    {
      title: 'Ý nghĩa sống còn đối với Việt Nam & ĐBSCL',
      desc: 'Việt Nam nằm ở cuối nguồn nhận toàn bộ hệ quả sinh thái: sự biến động dòng chảy, suy giảm 50-74% bùn cát phù sa và ranh mặn 4g/lít lấn sâu 60-90km trong mùa khô.'
    }
  ]
};

export const RIPARIAN_COUNTRIES: CountryInfo[] = [
  {
    id: 'china',
    name: 'China',
    vietnameseName: 'Trung Quốc',
    localRiverName: 'Lan Thương Giang (Lancang Jiang - 澜沧江)',
    flag: '🇨🇳',
    lengthKm: 2161,
    basinSharePercent: 21,
    flowContributionPercent: 16,
    description: 'Đoạn thượng nguồn sông chảy qua các hẻm núi sâu, dốc hiểm trở của tỉnh Vân Nam và cao nguyên Tây Tạng. Tiềm năng thủy điện bậc thang khổng lồ.',
    keyFeatures: [
      'Khởi nguồn từ sông băng cao nguyên Thanh - Tạng (>5.000m)',
      'Hệ thống đập thủy điện bậc thang công suất lớn (Tiểu Loan, Nọa Trát Độ...)',
      'Đóng góp khoảng 16% tổng lưu lượng nước toàn lưu vực, nhưng đóng góp tới 40-50% vào mùa khô',
      'Là Đối tác Đối thoại của Ủy hội sông Mê Kông (MRC) từ năm 1996'
    ],
    capital: 'Bắc Kinh (Phần sông thuộc Vân Nam & Tây Tạng)',
    mrcStatus: 'Đối tác Đối thoại (Dialogue Partner)',
  },
  {
    id: 'myanmar',
    name: 'Myanmar',
    vietnameseName: 'Myanmar (Mi-an-ma)',
    localRiverName: 'Mekong (Mae Khaung)',
    flag: '🇲🇲',
    lengthKm: 268,
    basinSharePercent: 3,
    flowContributionPercent: 2,
    description: 'Sông tạo thành biên giới tự nhiên giữa Myanmar và Lào dọc khu vực Tam Giác Vàng huyền thoại, địa hình rừng núi hiểm trở và thưa dân.',
    keyFeatures: [
      'Đoạn sông biên giới tự nhiên dài 268 km',
      'Nằm tại ngã ba Tam Giác Vàng (Golden Triangle)',
      'Chiếm 3% diện tích lưu vực và đóng góp khoảng 2% lưu lượng nước',
      'Là Đối tác Đối thoại của MRC cùng với Trung Quốc'
    ],
    capital: 'Naypyidaw',
    mrcStatus: 'Đối tác Đối thoại (Dialogue Partner)',
  },
  {
    id: 'laos',
    name: 'Laos',
    vietnameseName: 'Lào',
    localRiverName: 'Mènam Khong (Mẹ của các dòng nước)',
    flag: '🇱🇦',
    lengthKm: 1865,
    basinSharePercent: 25,
    flowContributionPercent: 35,
    description: '"Quốc gia của sông Mê Kông" với đường sông dài và đóng góp lưu lượng nước lớn nhất toàn lưu vực (35%). Có chiến lược trở thành "Bình ắc quy của Đông Nam Á".',
    keyFeatures: [
      'Đóng góp lưu lượng nước lớn nhất (35%) cho sông Mê Kông',
      'Hơn 90% diện tích đất nước Lào nằm trong lưu vực sông Mê Kông',
      'Thác Khone Phapheng - thác nước lớn nhất Đông Nam Á chặn luồng di cư của cá',
      'Thành viên sáng lập MRC (Ủy ban Thư ký MRC từng đặt tại Viêng Chăn)'
    ],
    capital: 'Viêng Chăn (Vientiane)',
    mrcStatus: 'Thành viên sáng lập',
  },
  {
    id: 'thailand',
    name: 'Thailand',
    vietnameseName: 'Thái Lan',
    localRiverName: 'Mae Nam Khong (แม่น้ำโขง)',
    flag: '🇹🇭',
    lengthKm: 976,
    basinSharePercent: 23,
    flowContributionPercent: 18,
    description: 'Lưu vực sông Mê Kông bao trùm vùng Đông Bắc Thái Lan (Isan) - vùng sản xuất nông nghiệp quan trọng cần nguồn nước tưới tiêu quy mô lớn.',
    keyFeatures: [
      'Tạo thành 976 km đường biên giới tự nhiên với Lào',
      'Tưới tiêu cho vùng cao nguyên Korat / Đông Bắc Thái Lan',
      'Có nhiều dự án chuyển nước nội địa để đối phó hạn hán',
      'Thành viên sáng lập MRC'
    ],
    capital: 'Băng Cốc (Bangkok)',
    mrcStatus: 'Thành viên sáng lập',
  },
  {
    id: 'cambodia',
    name: 'Cambodia',
    vietnameseName: 'Campuchia',
    localRiverName: 'Tonle Thom (Sông Lớn / ទន្លេធំ)',
    flag: '🇰🇭',
    lengthKm: 502,
    basinSharePercent: 20,
    flowContributionPercent: 18,
    description: 'Nơi có kỳ quan thủy văn Biển Hồ (Tonle Sap) - chiếc "van điều áp" tự nhiên độc nhất vô nhị trên thế giới giúp điều hòa lũ và cấp nước cho ĐBSCL.',
    keyFeatures: [
      'Biển Hồ (Tonle Sap) - hồ nước ngọt lớn nhất Đông Nam Á, đảo chiều dòng chảy theo mùa',
      'Cung cấp hơn 70% lượng đạm động vật cho người dân Campuchia qua nghề cá nước ngọt',
      'Khu vực Phnom Penh là nơi giao nhau giữa sông Mê Kông, sông Bassac và Tonle Sap (Chaktomuk)',
      'Thành viên sáng lập MRC (Trụ sở Ban Thư ký MRC hiện tại ở Phnom Penh)'
    ],
    capital: 'Phnôm Pênh (Phnom Penh)',
    mrcStatus: 'Thành viên sáng lập',
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    vietnameseName: 'Việt Nam',
    localRiverName: 'Sông Cửu Long (Chín Rồng / Sông Tiền & Sông Hậu)',
    flag: '🇻🇳',
    lengthKm: 230,
    basinSharePercent: 8,
    flowContributionPercent: 11,
    description: 'Nằm ở tận cùng hạ lưu, nơi dòng sông bồi đắp nên Đồng bằng sông Cửu Long (ĐBSCL) - vựa lương thực, thủy sản trù phú bậc nhất Việt Nam và thế giới.',
    keyFeatures: [
      'Chảy vào Việt Nam tách thành 2 nhánh chính: Sông Tiền và Sông Hậu',
      'Đổ ra Biển Đông qua 9 cửa sông biểu tượng (Cửu Long)',
      'Vựa lúa số 1 cả nước (đóng góp >50% sản lượng lúa và >90% gạo xuất khẩu của Việt Nam)',
      'Đứng trước nguy cơ nghiêm trọng: sụt giảm phù sa, sạt lở bờ sông bờ biển, hạn mặn xâm nhập sâu'
    ],
    capital: 'Hà Nội (Khu vực ĐBSCL gồm 13 tỉnh thành)',
    mrcStatus: 'Thành viên sáng lập',
  },
];

export const RIVER_STATIONS: RiverStation[] = [
  {
    id: 'source',
    name: 'Ngọn nguồn Tanggula (Tây Tạng)',
    country: 'Trung Quốc',
    elevationM: 5224,
    distanceFromSourceKm: 0,
    flowM3s: 15,
    importance: 'Nơi băng tuyết vĩnh cửu tan chảy hình thành dòng suối đầu tiên của Lan Thương Giang.',
    coordinates: { x: 18, y: 8 },
  },
  {
    id: 'yunjinghong',
    name: 'Trạm Cảnh Hồng (Jinghong - Vân Nam)',
    country: 'Trung Quốc',
    elevationM: 535,
    distanceFromSourceKm: 2100,
    flowM3s: 1750,
    importance: 'Trạm quan trắc thủy văn trọng yếu trước khi sông rời khỏi lãnh thổ Trung Quốc.',
    coordinates: { x: 28, y: 28 },
  },
  {
    id: 'goldentriangle',
    name: 'Tam Giác Vàng (Golden Triangle)',
    country: 'Lào - Thái Lan - Myanmar',
    elevationM: 360,
    distanceFromSourceKm: 2400,
    flowM3s: 2300,
    importance: 'Ngã ba biên giới lịch sử, nơi sông Mê Kông chính thức bước vào vùng hạ lưu.',
    coordinates: { x: 38, y: 38 },
  },
  {
    id: 'vientiane',
    name: 'Thủ đô Viêng Chăn (Vientiane)',
    country: 'Lào',
    elevationM: 160,
    distanceFromSourceKm: 2900,
    flowM3s: 4300,
    importance: 'Đoạn sông mở rộng giữa biên giới Lào và Thái Lan, cảnh báo lũ mùa mưa.',
    coordinates: { x: 50, y: 47 },
  },
  {
    id: 'khonefalls',
    name: 'Thác Khone Phapheng (Champasak)',
    country: 'Lào - Campuchia',
    elevationM: 70,
    distanceFromSourceKm: 3800,
    flowM3s: 11000,
    importance: 'Thác nước có lưu lượng lớn nhất châu Á, nơi sinh sống của cá heo nước ngọt Irrawaddy quý hiếm.',
    coordinates: { x: 62, y: 64 },
  },
  {
    id: 'tonlesap',
    name: 'Biển Hồ & Phnôm Pênh (Chaktomuk)',
    country: 'Campuchia',
    elevationM: 12,
    distanceFromSourceKm: 4300,
    flowM3s: 15000,
    importance: 'Kỳ quan đảo chiều dòng chảy: Mùa lũ nước Mê Kông dội ngược vào Biển Hồ, mùa khô nước Biển Hồ tiếp ứng ra Mê Kông.',
    coordinates: { x: 67, y: 76 },
  },
  {
    id: 'tanchau_chaudoc',
    name: 'Tân Châu - Châu Đốc (Đầu nguồn ĐBSCL)',
    country: 'Việt Nam',
    elevationM: 4,
    distanceFromSourceKm: 4500,
    flowM3s: 13500,
    importance: 'Cửa ngõ sông Tiền và sông Hậu đón dòng nước ngọt, phù sa và mùa nước nổi về miền Tây.',
    coordinates: { x: 74, y: 84 },
  },
  {
    id: 'cuulong_delta',
    name: 'Chín Cửa Biển Cửu Long',
    country: 'Việt Nam',
    elevationM: 0,
    distanceFromSourceKm: 4763,
    flowM3s: 15000,
    importance: 'Đổ ra Biển Đông qua các cửa biển: Cửa Đại, Tiểu, Hàm Luông, Cổ Chiên, Cung Hầu, Định An, Trần Đề...',
    coordinates: { x: 82, y: 92 },
  },
];

export const MRC_DOSSIER = {
  title: 'Ủy Hội Sông Mê Kông Quốc Tế (Mekong River Commission - MRC)',
  foundationDate: '05 tháng 04 năm 1995',
  legalBasis: 'Hiệp định về Hợp tác Phát triển Bền vững Lưu vực Sông Mê Kông (Hiệp định Mê Kông 1995)',
  members: ['Campuchia', 'Lào', 'Thái Lan', 'Việt Nam'],
  dialoguePartners: ['Trung Quốc', 'Myanmar (Mi-an-ma)'],
  secretariatHeadquarters: 'Viêng Chăn (Lào) và Phnôm Pênh (Campuchia)',
  mission: 'Thúc đẩy và phối hợp quản lý và phát triển bền vững nguồn nước và các tài nguyên liên quan vì lợi ích chung của các quốc gia và sự an sinh của nhân dân trong lưu vực.',
  coreProcedures: [
    {
      code: 'PNPCA',
      name: 'Thủ tục Thông báo, Tham vấn trước và Thỏa thuận',
      desc: 'Bắt buộc các quốc gia thành viên phải thông báo và tham vấn kỹ thuật trước khi xây dựng công trình chuyển nước hoặc đập thủy điện trên dòng chính sông Mê Kông.',
    },
    {
      code: 'PWUM',
      name: 'Thủ tục Giám sát Sử dụng Nước',
      desc: 'Hệ thống trạm đo đạc lưu lượng khai thác nước tưới tiêu, công nghiệp và sinh hoạt trên toàn lưu vực.',
    },
    {
      code: 'PWQ',
      name: 'Quy chuẩn Chất lượng Nước',
      desc: 'Giám sát nồng độ ô nhiễm, độ đục, hóa chất độc hại và độ mặn dọc dòng sông để bảo vệ sức khỏe hệ sinh thái.',
    },
    {
      code: 'PMFM',
      name: 'Duy trì Dòng chảy trên Dòng chính',
      desc: 'Quy định lưu lượng dòng chảy tối thiểu trong mùa khô và kiểm soát đỉnh lũ trong mùa mưa.',
    },
    {
      code: 'PDIES',
      name: 'Trao đổi và Chia sẻ Thông tin, Dữ liệu',
      desc: 'Quy định các nước phải chia sẻ dữ liệu khí tượng, thủy văn, xả đập kịp thời cho các nước hạ du.',
    }
  ],
  mrcSignificanceForVietnam: [
    'Diễn đàn pháp lý quốc tế quan trọng hàng đầu để Việt Nam bảo vệ quyền lợi hợp pháp của hạ du ĐBSCL.',
    'Yêu cầu các quốc gia thượng nguồn thực thi tham vấn minh bạch, đánh giá tác động môi trường xuyên biên giới (Transboundary EIA).',
    'Thúc đẩy chia sẻ dữ liệu xả lũ và vận hành đập thủy điện mùa khô từ Trung Quốc và Lào để chủ động ứng phó hạn mặn.',
    'Bảo tồn hệ sinh thái Biển Hồ và đồng bằng châu thổ trước nguy cơ thiếu hụt phù sa và cạn kiệt nguồn lợi thủy sản.'
  ]
};

export const VIETNAM_DELTA_DATA = {
  title: 'Chuyên Đề Địa Lí 11: Đồng Bằng Sông Cửu Long & Thách Thức An Ninh Nguồn Nước',
  overview: 'Đồng bằng sông Cửu Long (ĐBSCL) gồm 13 tỉnh thành phố với diện tích khoảng 40.000 km², chiếm 12% diện tích và 19% dân số cả nước, là vùng sản xuất lương thực trọng yếu của Việt Nam.',
  economicRole: [
    { label: 'Sản lượng Lúa', value: '> 50% cả nước', detail: 'Đóng góp trên 90% sản lượng gạo xuất khẩu của Việt Nam ra thế giới.' },
    { label: 'Thủy Hải Sản', value: '> 65% cả nước', detail: 'Cung cấp tôm, cá tra, cá basa xuất khẩu hàng tỉ USD mỗi năm.' },
    { label: 'Trái Cây Nhiệt Đới', value: '> 70% cả nước', detail: 'Vựa cây ăn trái lớn nhất Việt Nam: xoài cát Hòa Lộc, sầu riêng Cái Mơn, bưởi da xanh...' },
  ],
  challenges: [
    {
      title: '1. Tác động của Thủy điện Thượng nguồn',
      impact: 'Hơn 100 đập thủy điện lớn nhỏ ở Trung Quốc và Lào giữ lại nước và bùn cát. Lượng phù sa bồi đắp cho ĐBSCL giảm từ 160 triệu tấn/năm (trước 2000) xuống còn dưới 47 triệu tấn/năm hiện nay, dự báo sẽ giảm còn dưới 10-15 triệu tấn/năm.',
      consequence: 'Bờ sông, bờ biển bị sạt lở nghiêm trọng; đất đai suy giảm dinh dưỡng; hình thái châu thổ bị bào mòn thay vì lấn biển như trước.'
    },
    {
      title: '2. Biến đổi Khí hậu & Nước biển dâng',
      impact: 'ĐBSCL là một trong 3 đồng bằng châu thổ trên thế giới dễ bị tổn thương nhất do biến đổi khí hậu. Địa hình ĐBSCL rất bằng phẳng, độ cao trung bình chỉ từ 0.5m - 1.5m so với mực nước biển.',
      consequence: 'Nguy cơ ngập úng khi triều cường, suy thoái rừng ngập mặn phòng hộ Cà Mau, Kiên Giang.'
    },
    {
      title: '3. Xâm nhập mặn sâu & Hạn hán mùa khô',
      impact: 'Khi lưu lượng nước ngọt từ thượng nguồn giảm mạnh kết hợp triều cường biển Đông và vịnh Thái Lan, ranh mặn 4g/lít lấn sâu vào nội đồng 60 - 90 km trên sông Tiền, sông Hậu, Vàm Cỏ Tây.',
      consequence: 'Gây thiếu nước ngọt sinh hoạt cho hàng trăm nghìn hộ dân; làm cháy rụi hàng trăm nghìn hecta lúa, vườn cây ăn trái đặc sản.'
    },
    {
      title: '4. Sụt lún đất & Khai thác nước ngầm quá mức',
      impact: 'Do thiếu nước ngọt mặt, tình trạng khai thác nước ngầm tầng sâu gia tăng khiến tốc độ sụt lún mặt đất tại nhiều nơi ở ĐBSCL đạt 1-3 cm/năm, nhanh hơn cả tốc độ nước biển dâng.',
      consequence: 'Ngập lụt đô thị (Cần Thơ, Vĩnh Long), nhiễm mặn tầng nước ngầm.'
    }
  ],
  solutions: [
    {
      tag: 'Chính sách "Thuận thiên"',
      title: 'Nghị quyết 120/NQ-CP của Chính phủ Việt Nam',
      desc: 'Chuyển từ tư duy "chống lại tự nhiên" sang "chủ động thích ứng theo quy luật tự nhiên, coi nước mặn - nước lợ cũng là nguồn tài nguyên phát triển kinh tế (mô hình lúa - tôm, nuôi trồng thủy sản nước lợ)."'
    },
    {
      tag: 'Công trình thủy lợi thông minh',
      title: 'Hệ thống Thủy lợi Cái Lớn - Cái Bé & Hồ trữ nước ngọt',
      desc: 'Vận hành các cống âu hiện đại để kiểm soát mặn, giữ ngọt, kết hợp xây dựng các hồ chứa nước sinh hoạt cộng đồng và trữ nước trong kênh rạch tự nhiên.'
    },
    {
      tag: 'Ngoại giao nguồn nước',
      title: 'Tăng cường vai trò trong Ủy hội Sông Mê Kông (MRC)',
      desc: 'Tích cực thúc đẩy thực thi nghiêm túc Hiệp định 1995, kêu gọi chia sẻ số liệu vận hành thủy điện thời gian thực, thúc đẩy các dự án hạ tầng tôn trọng dòng chảy tự nhiên.'
    }
  ],
  cuuLongEstuaries: [
    { name: 'Cửa Tiểu', river: 'Sông Tiền', province: 'Tiền Giang', status: 'Đang hoạt động' },
    { name: 'Cửa Đại', river: 'Sông Tiền', province: 'Tiền Giang - Bến Tre', status: 'Đang hoạt động' },
    { name: 'Cửa Ba Lai', river: 'Sông Tiền', province: 'Bến Tre', status: 'Đã đắp đập ngăn mặn năm 2002' },
    { name: 'Cửa Hàm Luông', river: 'Sông Tiền', province: 'Bến Tre', status: 'Rất sâu và rộng' },
    { name: 'Cửa Cổ Chiên', river: 'Sông Tiền', province: 'Bến Tre - Trà Vinh', status: 'Đang hoạt động' },
    { name: 'Cửa Cung Hầu', river: 'Sông Tiền', province: 'Trà Vinh', status: 'Đang hoạt động' },
    { name: 'Cửa Định An', river: 'Sông Hậu', province: 'Trà Vinh - Sóc Trăng', status: 'Cửa khẩu tàu biển lớn nhất' },
    { name: 'Cửa Trần Đề', river: 'Sông Hậu', province: 'Sóc Trăng', status: 'Đang phát triển cảng nước sâu' },
    { name: 'Cửa Ba Thắc (Bassac)', river: 'Sông Hậu', province: 'Sóc Trăng', status: 'Bị bồi lấp tự nhiên khoảng đầu thế kỷ 20' },
  ]
};
