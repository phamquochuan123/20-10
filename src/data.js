// =============================================================
//  NỘI DUNG CỦA TRANG: chỉ cần sửa file này
// =============================================================
const data = {
  // Tên người ấy (hiện trên phong thư và tiêu đề)
  herName: "Em yêu",
  // Tên của bạn (ký cuối thư)
  myName: "Anh",

  // Ngày bắt đầu yêu nhau (giờ Việt Nam)
  startDate: "2026-02-28T00:00:00+07:00",

  // Nhạc nền: bỏ file mp3 vào public/music.mp3.
  // Nếu chưa có file, trang sẽ tự chơi một giai điệu hộp nhạc nhẹ nhàng.
  music: "music.mp3",

  // Kỷ niệm: ảnh để trong public/photos/, thêm/bớt tuỳ ý (có thể thêm date: "dd/mm/yyyy" nếu muốn hiện ngày)
  memories: [
    {
      title: "Nàng thơ của anh",
      text: "Em đứng giữa nắng chiều, váy trắng nhẹ tênh, cười một cái là cả khu vườn như dịu lại. Anh nhìn mãi vẫn chưa quen được: người xinh thế này lại là người thương anh.",
      photo: "photos/anh-1.jpg"
    },
    {
      title: "Những buổi trò chuyện không hồi kết",
      text: "Em vừa kể vừa chỉ tay, anh ngồi nghe mà quên luôn mình định nói gì. Chỉ cần được ngồi cạnh em thế này, quán nào cũng thành quán quen.",
      photo: "photos/anh-2.jpg"
    },
    {
      title: "Em những lúc chẳng làm dáng",
      text: "Đeo kính, ngả lưng, mặt hơi mệt một chút. Người ta thích em lúc lung linh, còn anh thương cả những lúc em bình thường và thật nhất như thế này.",
      photo: "photos/anh-3.jpg"
    },
    {
      title: "Hai đứa trong gương",
      text: "Gương thì nhỏ mà hai đứa cứ đứng sát vào nhau. Anh mong sau này mọi khung hình của anh đều có em ở bên cạnh như vậy.",
      photo: "photos/anh-4.jpg"
    },
    {
      title: "Hai đứa trẻ con",
      text: "Bờm ếch xanh, bờm tai thỏ, môi chu, tay chữ V. Ở cạnh em anh được làm trẻ con, và anh nguyện làm đứa trẻ con của riêng em mãi.",
      photo: "photos/anh-5.jpg"
    },
    {
      title: "Đôi mình áo trắng",
      text: "Em cầm máy, anh đứng sau lưng em. Chắc đây là tấm anh thích nhất, vì nhìn vào là thấy hai đứa mình thật sự là một đôi.",
      photo: "photos/anh-6.jpg"
    }
  ],

  // Lọ "lý do anh yêu em": mỗi lần chạm lọ sẽ rút ra một câu
  reasons: [
    "Vì nụ cười của em làm anh quên hết mệt mỏi.",
    "Vì em luôn nhớ những điều nhỏ xíu anh từng kể.",
    "Vì em đáng yêu nhất lúc giận dỗi.",
    "Vì ở cạnh em, anh được là chính mình.",
    "Vì em ăn gì cũng ngon lành, nhìn mà vui lây.",
    "Vì em là người đầu tiên anh muốn kể mọi chuyện.",
    "Vì em tin anh, cả khi anh chưa tin chính mình.",
    "Vì giọng em mỗi lần gọi tên anh.",
    "Vì em là em, vậy thôi."
  ],

  // Câu hỏi ở cuối trang
  question: "Em có thương anh không?",
  answerYes: "Anh biết mà! Thương em nhiều lắm 💗",

  // Lá thư cuối trang: mỗi phần tử là một đoạn văn
  letter: [
    "Gửi em,",
    "(Viết lá thư của bạn ở đây. Kể về cảm giác lần đầu gặp em, điều anh thích nhất ở em, và những gì anh muốn cùng em làm trong thời gian tới.)",
    "(Đoạn thứ hai: một lời cảm ơn, một lời hứa nhỏ.)",
    "Chúc em 20/10 thật vui, luôn xinh đẹp và luôn được yêu thương."
  ]
};

export default data;
