import { EducationLevel } from '../types';

interface KienSangResponse {
  text: string;
  followups: string[];
}

export function generateLocalKienSangReply(query: string, level: EducationLevel): KienSangResponse {
  const q = query.toLowerCase().trim();

  // 1. Sông Mê Kông chảy qua bao nhiêu nước / 6 nước
  if (q.includes('mấy nước') || q.includes('bao nhiêu nước') || q.includes('quốc gia') || q.includes('6 nước')) {
    if (level === 'tieuhoc') {
      return {
        text: `Chào bạn nhỏ! 🌊 Sông Mê Kông giống như một dải lụa khổng lồ chảy qua **6 quốc gia anh em** đấy:\n\n1. 🇨🇳 **Trung Quốc** (nơi bắt đầu dòng sông với tên gọi Lan Thương)\n2. 🇲🇲 **Myanmar**\n3. 🇱🇦 **Lào** (được mệnh danh là xứ sở Triệu Voi)\n4. 🇹🇭 **Thái Lan**\n5. 🇰🇭 **Campuchia** (có Biển Hồ Tonle Sap mênh mông)\n6. 🇻🇳 **Việt Nam** (nơi dòng sông chia thành 9 nhánh rồng đổ ra Biển Đông!)\n\nCả 6 bạn bè cùng uống chung một dòng nước Mê Kông tươi mát!`,
        followups: ['Tại sao ở Việt Nam lại gọi là sông Cửu Long?', 'Kể cho em về bạn cá heo Irrawaddy?'],
      };
    }
    return {
      text: `Chào bạn! 🗺️ **Sông Mê Kông** là dòng sông quốc tế lớn nhất Đông Nam Á, bắt nguồn từ vùng cao nguyên Tây Tạng (Trung Quốc) và chảy qua **6 quốc gia** trước khi đổ ra Biển Đông:\n\n- **Thượng lưu (Lưu vực Mê Kông thượng - UMB):**\n  1. **Trung Quốc** (đoạn sông dài ~2.161 km, mang tên Lan Thương Giang, chiếm 21% diện tích lưu vực và đóng góp ~16% tổng lượng nước).\n  2. **Myanmar** (tạo thành biên giới tự nhiên giữa Lào và Myanmar, đóng góp ~2% lượng nước).\n\n- **Hạ lưu (Lưu vực Mê Kông hạ - LMB):**\n  3. **Lào** (chiếm 25% diện tích lưu vực, đóng góp lượng nước lớn nhất: ~35%).\n  4. **Thái Lan** (chiếm 23% diện tích lưu vực, đóng góp ~18% lượng nước).\n  5. **Campuchia** (nơi có Biển Hồ Tonle Sap điều tiết lũ, đóng góp ~18% lượng nước).\n  6. **Việt Nam** (vùng châu thổ hạ lưu - ĐBSCL, đóng góp ~11% lượng nước).\n\nTổng chiều dài khoảng **4.763 km**, diện tích lưu vực **795.000 km²**.`,
      followups: [
        'Nước nào đóng góp lượng nước nhiều nhất vào sông Mê Kông?',
        'Ủy hội Sông Mê Kông (MRC) gồm những nước nào?',
      ],
    };
  }

  // 2. Chín Rồng / Cửu Long / Cửa sông
  if (q.includes('cửu long') || q.includes('chín rồng') || q.includes('9 cửa') || q.includes('cửa sông')) {
    return {
      text: `🐉 **Ý nghĩa tên gọi "Cửu Long" và 9 cửa sông tại Việt Nam:**\n\nKhi vào lãnh thổ Việt Nam tại An Giang và Đồng Tháp, sông Mê Kông tách làm 2 nhánh chính là **sông Tiền** và **sông Hậu**. Hai nhánh này trước đây đổ ra Biển Đông qua **9 cửa biển**, ví như 9 con rồng vươn mình ra biển lớn:\n\n- **Nhánh Sông Tiền (6 cửa):**\n  1. Cửa Tiểu\n  2. Cửa Đại\n  3. Cửa Ba Lai (hiện đã bị bồi lắng và có cống đập ngăn mặn)\n  4. Cửa Hàm Luông\n  5. Cửa Cổ Chiên\n  6. Cửa Cung Hầu\n\n- **Nhánh Sông Hậu (3 cửa):**\n  7. Cửa Định An\n  8. Cửa Bát Xắc (Bassac - hiện đã bị bồi lắng, không còn dòng thoát lớn)\n  9. Cửa Trần Đề\n\n*(Lưu ý Địa lí 11: Hiện nay trên thực tế chỉ còn **7 cửa sông** hoạt động thông suốt do cửa Ba Lai và Bát Xắc đã bồi lấp hoặc có công trình thủy lợi).*`,
      followups: [
        'Tại sao cửa Ba Lai lại bị đóng?',
        'Đồng bằng sông Cửu Long đóng góp bao nhiêu % sản lượng lúa cả nước?',
      ],
    };
  }

  // 3. Ủy hội Sông Mê Kông / MRC / Hiệp định 1995
  if (q.includes('mrc') || q.includes('ủy hội') || q.includes('hiệp định 1995') || q.includes('thành viên mrc')) {
    return {
      text: `🏛️ **Ủy Hội Sông Mê Kông Quốc Tế (Mekong River Commission - MRC):**\n\n- **Lịch sử ra đời:** Thành lập ngày **5/4/1995** theo *Hiệp định Hợp tác Phát triển Bền vững Lưu vực Sông Mê Kông* ký tại Chiang Rai (Thái Lan).\n- **4 Thành viên chính thức:** Campuchia, Lào, Thái Lan và **Việt Nam**.\n- **2 Đối tác đối thoại (Dialogue Partners):** Trung Quốc và Myanmar.\n\n📌 **5 Thủ tục kỹ thuật cốt lõi (Trọng tâm Địa lí 11):**\n1. **PNPCA:** Thông báo, Tham vấn trước và Thỏa thuận đối với mọi dự án xây đập, chuyển nước.\n2. **PWUM:** Giám sát chặt chẽ việc sử dụng và chuyển nước.\n3. **PWQ:** Giám sát và duy trì chất lượng nước đạt chuẩn sinh thái.\n4. **PMFM:** Quy định duy trì dòng chảy tối thiểu mùa khô và bảo tồn lũ tự nhiên.\n5. **PDIES:** Thủ tục trao đổi và chia sẻ dữ liệu thủy văn liên quốc gia.\n\nĐối với Việt Nam (nằm ở cuối nguồn), MRC là **lá chắn pháp lý quốc tế quan trọng nhất** để bảo vệ quyền lợi về nguồn nước và phù sa cho hơn 20 triệu người dân ĐBSCL!`,
      followups: [
        'Thủ tục PNPCA hoạt động như thế nào khi Lào xây đập thủy điện?',
        'Trung Quốc có phải là thành viên chính thức của MRC không?',
      ],
    };
  }

  // 4. Thủy điện thượng nguồn / Sụt giảm phù sa / Đập thủy điện
  if (q.includes('thủy điện') || q.includes('phù sa') || q.includes('bùn cát') || q.includes('xây đập')) {
    return {
      text: `⚡ **Thực trạng Thủy điện Thượng nguồn & Hệ lụy "Đói Phù Sa" tại ĐBSCL:**\n\n1. **Quy mô thủy điện:**\n   - Trên dòng chính tại Trung Quốc có chuỗi bậc thang thủy điện khổng lồ (như đập Tiểu Loan - Xiaowan, Nọa Trát Độ - Nuozhadu trữ hàng chục tỉ m³ nước).\n   - Hạ lưu tại Lào cũng triển khai hàng loạt đập dòng chính (Xayaburi, Don Sahong, Sanakham, Pak Beng...).\n\n2. **Tác động nghiêm trọng đến Việt Nam:**\n   - **Giữ lại 50% - 74% lượng phù sa bùn cát:** Trước năm 2007, lượng phù sa về ĐBSCL đạt khoảng **160 triệu tấn/năm**. Hiện nay sụt giảm chỉ còn dưới **47 triệu tấn/năm**, dự báo tương lai chỉ còn ~10-15 triệu tấn.\n   - **Hiện tượng "Nước đói phù sa":** Nước trong xả từ hồ thủy điện có động năng lớn cuốn trôi bùn đất bờ sông, gây **sạt lở bờ sông, xói lở bờ biển** nghiêm trọng ở An Giang, Đồng Tháp, Cà Mau.\n   - **Đảo lộn chế độ dòng chảy:** Thay đổi nhịp lũ tự nhiên, làm mất tín hiệu sinh sản của các loài cá nước ngọt bản địa.`,
      followups: [
        'Xâm nhập mặn mùa khô diễn ra như thế nào?',
        'Nghị quyết 120/NQ-CP đề ra giải pháp gì cho ĐBSCL?',
      ],
    };
  }

  // 5. Xâm nhập mặn / Ranh mặn 4g/l / Mùa khô
  if (q.includes('mặn') || q.includes('xâm nhập mặn') || q.includes('ranh mặn') || q.includes('hạn mặn')) {
    return {
      text: `🧂 **Xâm Nhập Mặn tại Đồng Bằng Sông Cửu Long:**\n\n- **Định nghĩa ranh mặn 4g/l:** Mức độ mặn 4 gam muối/lít nước (hoặc 4‰) là ngưỡng tối đa mà cây lúa, cây ăn trái và sinh hoạt có thể chịu đựng. Vượt quá ngưỡng này sẽ làm cháy lá, chết cây và hỏng đất.\n- **Nguyên nhân chính:**\n  1. Mùa khô lưu lượng nước từ thượng nguồn về thấp (lại bị các hồ thủy điện tích trữ).\n  2. Biến đổi khí hậu gây hạn hán khốc liệt và nước biển dâng đẩy triều cường vào sâu.\n  3. Sụt lún đất ở ĐBSCL do khai thác nước ngầm quá mức (lún 1-3 cm/năm).\n- **Phạm vi tác động:**\n  - Vào các đợt hạn mặn lịch sử (2016, 2020), ranh mặn 4g/l đã xâm nhập sâu tới **70 - 95 km** vào đất liền trên sông Tiền và sông Hậu, làm hàng trăm ngàn héc-ta lúa và vườn sầu riêng, thanh long thiệt hại.\n\n🛡️ **Giải pháp:** Xây dựng hệ thống cống âu thuyền kiểm soát mặn (như Cái Lớn - Cái Bé), chuyển đổi mô hình kinh tế sang lúa - tôm, nuôi trồng thủy sản nước mặn/lợ.`,
      followups: [
        'Hệ thống cống Cái Lớn - Cái Bé nằm ở đâu và có tác dụng gì?',
        'Nghị quyết 120/NQ-CP nói gì về phương châm "Thuận thiên"?',
      ],
    };
  }

  // 6. Nghị quyết 120 / Thuận thiên
  if (q.includes('nghị quyết 120') || q.includes('thuận thiên') || q.includes('giải pháp') || q.includes('bền vững')) {
    return {
      text: `🌱 **Nghị Quyết 120/NQ-CP Của Chính Phủ - Triết Lý "Thuận Thiên" Cho ĐBSCL:**\n\nBan hành năm 2017, Nghị quyết 120 đánh dấu bước ngoặt tư duy chiến lược phát triển ĐBSCL bền vững thích ứng với BĐKH:\n\n1. **Nguyên tắc cốt lõi "Thuận thiên":**\n   - Tôn trọng quy luật tự nhiên, tránh can thiệp thô bạo vào môi trường nước.\n   - Coi **nước mặn, nước lợ cũng là nguồn tài nguyên quý giá** (phục vụ nuôi tôm, cua biển) thay vì chỉ xem là "kẻ thù" cần chống cự.\n\n2. **Phân vùng sinh thái nông nghiệp 3 tiểu vùng:**\n   - **Vùng thượng (Nước ngọt quanh năm):** Trọng tâm sản xuất lúa gạo chất lượng cao, cây ăn trái đặc sản và xả lũ lấy phù sa tự nhiên.\n   - **Vùng giữa (Ngọt - Lợ luân phiên):** Mô hình linh hoạt Lúa - Tôm (mùa mưa trồng lúa, mùa khô nuôi tôm), rau màu chịu hạn.\n   - **Vùng ven biển (Nước mặn - Lợ):** Phát triển thủy sản mặn, khôi phục đai rừng ngập mặn phòng hộ chắn sóng.\n\n3. **Giải pháp công trình kết hợp phi công trình:**\n   - Giảm dần diện tích lúa vụ 3 (vụ Thu Đông kém hiệu quả), tăng không gian trữ lũ Đồng Tháp Mười và Tứ Giác Long Xuyên.`,
      followups: [
        'Mô hình Lúa - Tôm hoạt động như thế nào?',
        'Rừng ngập mặn giúp ích gì trong việc chống xói lở bờ biển?',
      ],
    };
  }

  // 7. Biển Hồ Tonle Sap
  if (q.includes('biển hồ') || q.includes('tonle sap') || q.includes('campuchia')) {
    return {
      text: `🌊 **Kỳ Quan Biển Hồ Tonle Sap & Cơ Chế "Trái Tim Điều Hòa":**\n\nBiển Hồ (Campuchia) nối với sông Mê Kông qua sông Tonle Sap, hoạt động như một hồ điều hòa tự nhiên kỳ diệu:\n\n- **Vào Mùa Lũ (tháng 6 - tháng 10):**\n  Nước sông Mê Kông dâng cao hơn mực nước Biển Hồ, dòng sông Tonle Sap **chảy ngược từ Mê Kông vào Biển Hồ**. Diện tích hồ phình to gấp 4-5 lần (từ 2.700 km² lên đến hơn 16.000 km²), giúp **cắt giảm đỉnh lũ cho hạ lưu ĐBSCL của Việt Nam**!\n\n- **Vào Mùa Khô (tháng 11 - tháng 5):**\n  Khi nước sông Mê Kông hạ thấp, dòng sông Tonle Sap **đổi chiều chảy xuôi trở lại Mê Kông**, xả lượng nước ngọt dự trữ khổng lồ xuống ĐBSCL, giúp duy trì dòng chảy và **đẩy lùi ranh mặn** xâm nhập vào vựa lúa Việt Nam.\n\n⚠️ Nếu đập thủy điện làm suy giảm nhịp đập Biển Hồ, ĐBSCL sẽ mất đi "lá chắn" điều hòa nước tự nhiên vô giá này!`,
      followups: [
        'Học sinh lớp 11 cần nhớ gì về Biển Hồ trong bài kiểm tra Địa lí?',
        'Tại sao gọi Biển Hồ là vựa cá nước ngọt của Đông Nam Á?',
      ],
    };
  }

  // 8. Động vật / Cá heo Irrawaddy / Cá tra dầu
  if (q.includes('cá heo') || q.includes('irrawaddy') || q.includes('cá tra') || q.includes('loài cá') || q.includes('động vật')) {
    return {
      text: `🐬 **Các Loài Sinh Vật Biểu Tượng Của Dòng Sông Mê Kông:**\n\n1. **Cá heo nước ngọt Irrawaddy (Orcaella brevirostris):**\n   - Loài thú có vú sống dưới nước cực kỳ quý hiếm, trán tròn, không có mỏ dài. Hiện chỉ còn khoảng 90 cá thể sống tại đoạn sông giữa Kratie (Campuchia) và Nam Lào.\n\n2. **Cá tra dầu Mê Kông (Pangasianodon gigas):**\n   - Một trong những loài cá nước ngọt lớn nhất hành tinh, có thể dài tới 3 mét và nặng trên 300 kg! Chúng là biểu tượng của sự trù phú nhưng đang đứng trước nguy cơ tuyệt chủng do các đập thủy điện chặn đường di cư sinh sản.\n\n3. **Cá hô khổng lồ (Catlocarpio siamensis):**\n   - Được tôn vinh là Quốc ngư của Campuchia, có thể nặng tới 150 - 200 kg, bơi lội khắp vùng châu thổ sông Cửu Long Việt Nam.`,
      followups: [
        'Tại sao cá heo nước ngọt lại bị suy giảm số lượng?',
        'Chơi game giải cứu cá heo ở đâu trong ứng dụng?',
      ],
    };
  }

  // Game Ai Là Triệu Phú & Game tương tác
  if (q.includes('ai là triệu phú') || q.includes('triệu phú') || q.includes('game địa lí 11') || q.includes('ghế nóng')) {
    return {
      text: `🏆 **Chào mừng bạn đến với gameshow "Ai Là Triệu Phú: Sông Mê Kông & Địa Lí 11"!**\n\nĐây là đấu trường trí tuệ mô phỏng chân thực format gameshow truyền hình danh tiếng:\n- 🎯 **15 câu hỏi bậc thang** với tổng giải thưởng lên tới **150.000.000 đ**.\n- 🛡️ **Hai mốc an toàn**: Câu số 5 (2.000.000 đ) và Câu số 10 (22.000.000 đ).\n- 💡 **4 quyền trợ giúp kinh điển**: 50:50 (loại 2 phương án sai), Gọi điện cho Kiến Sáng AI, Hỏi ý kiến khán giả trường quay, và Đổi câu hỏi khác (sau câu số 5).\n- 📚 Toàn bộ câu hỏi xoay quanh trọng tâm kiến thức: Vị trí 6 nước lưu vực, chế độ nước Biển Hồ Tonle Sap, chuỗi đập thủy điện bậc thang, xâm nhập mặn 4g/l và chiến lược "Thuận thiên" theo NQ 120 ở ĐBSCL.\n\n👉 Bạn hãy vào tab **"Game Tương tác"** -> Chọn cấp **"THPT (Địa Lí 11)"** để bắt đầu ngồi vào ghế nóng ngay nhé!`,
      followups: [
        'Mốc an toàn số 1 câu hỏi về điều gì?',
        'Triết lý "Thuận thiên" trong NQ 120 là gì?',
        'Tại sao phù sa ĐBSCL lại bị suy giảm?',
      ],
    };
  }

  // 9. Trường TH, THCS và THPT FPT School Hậu Giang
  if (q.includes('fpt') || q.includes('hậu giang') || q.includes('fpt school') || q.includes('trường fpt')) {
    return {
      text: `🏫 **Trường Phổ thông Liên cấp FPT School Hậu Giang (Tiểu học, THCS và THPT):**\n\n- Tọa lạc tại Quốc lộ 1A, xã Long Thạnh, huyện Phụng Hiệp, tỉnh Hậu Giang (nằm trong khuôn viên Đại học FPT Cần Thơ - Hậu Giang).\n- FPT School Hậu Giang là ngôi trường tiên phong với triết lý giáo dục hiện đại: "Trải nghiệm để trưởng thành", chú trọng đào tạo công nghệ thông tin (STEM/Robotics), phát triển ngoại ngữ tiếng Anh vượt trội, rèn luyện kỹ năng thế kỷ 21 và phát triển thể chất với võ Vovinam.\n- Nằm ngay tại trung tâm vùng đất Chín Rồng trù phú, thầy và trò FPT School Hậu Giang luôn gắn liền việc học tập với tình yêu quê hương, bảo vệ môi trường sinh thái lưu vực sông Mê Kông và sẵn sàng hội nhập toàn cầu!\n\nKiến Sáng rất vinh dự được làm người bạn đồng hành cùng các bạn học sinh năng động, tài năng của FPT School Hậu Giang!`,
      followups: [
        'Học sinh FPT School Hậu Giang học môn Địa lí 11 thế nào?',
        'Hậu Giang có những đặc sản và kênh rạch nào nổi tiếng?',
        'Sông Mê Kông chảy qua Hậu Giang ra sao?',
      ],
    };
  }

  // 10. Kể chuyện / Kể sự tích / Thơ văn
  if (q.includes('kể chuyện') || q.includes('sự tích') || q.includes('truyền thuyết') || q.includes('huyền thoại')) {
    return {
      text: `📖 **Huyền thoại Dòng Sông Mẹ Mê Kông & 9 Con Rồng Vươn Biển Lớn:**\n\nNgày xửa ngày xưa, từ đỉnh tuyết sơn cao vút vùng Tây Tạng, Mẹ Thiên Nhiên đã ban tặng dòng suối thiêng mang tên Mê Kông - nghĩa là "Dòng Sông Mẹ". Dòng sông uốn lượn vượt qua muôn trùng thác ghềnh, tưới mát cho 6 xứ sở hiền hòa.\n\nKhi dòng sông mẹ về đến dải đất phương Nam của Tổ quốc Việt Nam, nước hòa cùng đất trời châu thổ tạo nên chín nhánh sông rực rỡ tựa như 9 con rồng thần vươn mình ra Biển Đông, mang theo dòng phù sa đỏ quạch bồi đắp nên Đồng bằng sông Cửu Long trù phú bậc nhất.\n\nDòng sông ấy không chỉ nuôi nấng những hạt ngọc trời thơm ngát, đàn cá tôm đầy ắp mà còn dạy cho con người lòng bao dung, sống hài hòa, thuận theo tự nhiên với đất trời! Bạn có muốn nghe thêm chuyện về Biển Hồ hay loài cá heo nước ngọt không?`,
      followups: [
        'Kể cho mình về bạn cá heo Irrawaddy?',
        'Tại sao Biển Hồ lại có hiện tượng đảo chiều dòng nước?',
        'Đố vui một câu về sông Mê Kông!',
      ],
    };
  }

  // 11. Đố vui / Câu đố
  if (q.includes('đố vui') || q.includes('câu đố') || q.includes('đố bạn') || q.includes('thử tài')) {
    return {
      text: `🧩 **Kiến Sáng xin đố bạn một câu đố vui Địa lí cực kỳ thú vị nhé:**\n\n*"Sông nào tách chín nhánh rồng,\nChảy qua sáu nước, mênh mông lúa vàng?\nĐố bạn là dòng sông nào?"*\n\n👉 Gợi ý: Dòng sông dài khoảng 4.763 km và là chủ đề chính trong ứng dụng của chúng ta đấy! Hãy nói cho Kiến Sáng đáp án của bạn nhé!`,
      followups: [
        'Đáp án là Sông Mê Kông / Sông Cửu Long!',
        'Đố thêm một câu nữa đi!',
        'Biển Hồ Tonle Sap nằm ở quốc gia nào?',
      ],
    };
  }

  // 12. Lời khuyên học tập & ôn thi Địa lí 11
  if (q.includes('ôn thi') || q.includes('học tập') || q.includes('lời khuyên') || q.includes('cách học') || q.includes('địa lí 11')) {
    return {
      text: `🎯 **Bí kíp đạt điểm 10 Chuyên đề Địa lí 11 - Sông Mê Kông & MRC:**\n\n1. **Nhớ số liệu then chốt:** Chiều dài ~4.763 km, qua 6 quốc gia (Lan Thương ở TQ, Cửu Long ở VN). ĐBSCL chiếm >50% lúa, >90% gạo xuất khẩu cả nước.\n2. **Nắm vững 4 thách thức an ninh nguồn nước:** Thủy điện thượng nguồn giữ lại 50-70% phù sa; Xâm nhập mặn ranh mặn 4g/l lấn sâu 70-95km; Nước biển dâng; Sụt lún đất do khai thác nước ngầm.\n3. **Hiểu sâu 5 thủ tục kỹ thuật của MRC 1995:** Nhất là thủ tục PNPCA (Thông báo, Tham vấn trước và Thỏa thuận).\n4. **Giải pháp cốt lõi:** Triết lý "Thuận thiên" theo Nghị quyết 120/NQ-CP (coi nước mặn/lợ là tài nguyên, chuyển đổi mô hình lúa - tôm, bảo tồn rừng ngập mặn).\n\nBạn có thể vào tab **Trắc nghiệm** hoặc chơi **Ai Là Triệu Phú** để luyện đề ngay nhé!`,
      followups: [
        'Vào chơi Ai Là Triệu Phú Địa lí 11',
        'Giải thích chi tiết 5 thủ tục kỹ thuật MRC',
        'Ranh mặn 4g/l gây hại gì cho cây trồng?',
      ],
    };
  }

  // 13. Giao tiếp, trò chuyện với con người (Hỏi thăm, Chào hỏi, Giới thiệu bản thân)
  if (q.includes('khỏe không') || q.includes('bạn khỏe') || q.includes('thế nào rồi')) {
    return {
      text: `Chào bạn! Mình cảm thấy rất phấn khởi và tràn đầy năng lượng khi được trò chuyện cùng bạn hôm nay! 🐜✨ Dòng chảy tri thức của mình luôn cuồn cuộn như phù sa sông Mê Kông vậy. Hôm nay bạn muốn cùng Kiến Sáng khám phá điều kỳ diệu nào của dòng sông hay ôn luyện chủ đề Địa lí 11 nào không?`,
      followups: ['Kể cho mình nghe về cá heo Irrawaddy?', 'Sông Mê Kông dài bao nhiêu km?', 'Biển Hồ Tonle Sap kỳ diệu thế nào?'],
    };
  }

  if (q.includes('bạn là ai') || q.includes('bạn tên gì') || q.includes('giới thiệu') || q.includes('ai tạo ra')) {
    return {
      text: `Xin chào! Mình là **Kiến Sáng** 🐜💡 - Trợ lý AI giáo dục thông thái đồng hành cùng học sinh, giáo viên và những người yêu mến lưu vực sông Mê Kông!\n\nLấy cảm hứng từ sự chăm chỉ, thông minh của loài kiến và ánh sáng tri thức khoa học, mình được thiết kế để giúp bạn:\n- Trò chuyện trực tiếp bằng giọng nói và văn bản.\n- Khám phá địa lí, sinh thái và văn hóa 6 quốc gia ven sông.\n- Nắm vững kiến thức trọng tâm Chuyên đề Địa lí 11 và Ủy hội Sông Mê Kông (MRC).\n- Rèn luyện các kỹ năng qua các trò chơi tương tác thú vị!\n\nBạn có thể bật micro để trò chuyện trực tiếp với mình bất cứ lúc nào nhé!`,
      followups: ['Bật chế độ nói chuyện với Kiến Sáng thế nào?', 'Sông Mê Kông có bao nhiêu loài cá?', 'Vai trò của MRC là gì?'],
    };
  }

  if (q.includes('cảm ơn') || q.includes('thank') || q.includes('tuyệt vời') || q.includes('hay quá')) {
    return {
      text: `Rất vui được hỗ trợ và đồng hành cùng bạn! Niềm vui học tập và sự tò mò của bạn chính là nguồn năng lượng lớn nhất của Kiến Sáng đấy! 🐜❤️ Nếu bạn có thêm bất kỳ thắc mắc nào, cứ bấm mic hoặc gõ câu hỏi trò chuyện cùng mình nhé!`,
      followups: ['Làm bài kiểm tra trắc nghiệm Địa lí 11', 'Khám phá bản đồ vệ tinh sông Mê Kông', 'Chơi game cứu cá heo'],
    };
  }

  if (q.includes('tạm biệt') || q.includes('bye') || q.includes('hẹn gặp lại')) {
    return {
      text: `Tạm biệt bạn nhé! Chúc bạn có một ngày học tập thật hứng khởi, đạt nhiều điểm mười môn Địa lí và luôn giữ trong tim tình yêu với dòng sông Mê Kông thân thương! Hẹn gặp lại bạn bất cứ lúc nào bạn cần! 🐜👋🌊`,
      followups: ['Khởi động lại cuộc trò chuyện'],
    };
  }

  if (q.includes('chào') || q.includes('hello') || q.includes('hi') || q === '') {
    return {
      text: `Xin chào bạn! Mình là **Kiến Sáng** 🐜💡 - Trợ lý AI đồng hành cùng bạn khám phá dòng sông Mê Kông hùng vĩ và Chuyên đề Địa lí 11!\n\nMình có thể hỗ trợ bạn:\n- 🗺️ Khám phá hải trình 4.763 km qua 6 quốc gia ven sông.\n- 🏛️ Tìm hiểu cơ chế hoạt động của Ủy hội Sông Mê Kông (MRC) & Hiệp định 1995.\n- 🌾 Phân tích thực tế ĐBSCL: vựa lúa Việt Nam, ranh mặn 4g/l, suy giảm phù sa và triết lý "Thuận thiên" (NQ 120/NQ-CP).\n- 🎮 Hướng dẫn bạn chơi các game tương tác (Cấp Tiểu học, THCS, THPT).\n\nBạn muốn tìm hiểu chủ đề nào trước tiên?`,
      followups: [
        'Sông Mê Kông chảy qua 6 quốc gia nào?',
        'Tại sao ở Việt Nam lại gọi là sông Cửu Long?',
        'Thủy điện thượng nguồn ảnh hưởng thế nào đến ĐBSCL?',
      ],
    };
  }

  // Fallback response with intelligent context
  return {
    text: `Chào bạn! Về câu hỏi *"**${query}**"*, **Kiến Sáng** xin chia sẻ như sau:\n\n- Sông Mê Kông là huyết mạch nuôi sống hơn 70 triệu người của 6 quốc gia. Trong chương trình Địa lí 11, vấn đề khai thác bền vững và an ninh nguồn nước lưu vực Mê Kông là chủ đề trọng tâm gắn liền với sinh kế của vùng Đồng bằng sông Cửu Long (ĐBSCL).\n- Mọi hoạt động xây dựng công trình thủy điện, chuyển nước ở thượng nguồn đều chịu sự giám sát của **Ủy hội Sông Mê Kông (MRC)** thông qua 5 thủ tục kỹ thuật nghiêm ngặt (đặc biệt là thủ tục tham vấn trước PNPCA).\n- Tại Việt Nam, để bảo vệ vựa lương thực quốc gia trước biến đổi khí hậu và sụt giảm phù sa, chúng ta đang đẩy mạnh giải pháp **"Thuận thiên" theo Nghị quyết 120/NQ-CP**, biến thách thức hạn mặn thành cơ hội phát triển kinh tế tuần hoàn.\n\nBạn có muốn Kiến Sáng giải thích sâu hơn về khía cạnh nào không?`,
    followups: [
      '5 thủ tục kỹ thuật của MRC gồm những gì?',
      'Giải pháp "Thuận thiên" theo Nghị quyết 120 là gì?',
      'Các câu hỏi trắc nghiệm Địa lí 11 hay gặp về sông Mê Kông?',
    ],
  };
}
