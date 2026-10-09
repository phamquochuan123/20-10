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

  // Dòng thời gian kỷ niệm: ảnh để trong public/photos/, thêm/bớt tuỳ ý, theo thứ tự thời gian
  memories: [
    {
      date: "28/02/2026",
      title: "Ngày mình bắt đầu",
      text: "Viết vài dòng về ngày hai đứa chính thức thành một đôi.",
      photo: "photos/anh-1.svg"
    },
    {
      date: "xx/03/2026",
      title: "Lần hẹn hò đầu tiên",
      text: "Mình đã đi đâu, ăn gì, em mặc gì, điều gì làm anh nhớ mãi?",
      photo: "photos/anh-2.svg"
    },
    {
      date: "xx/04/2026",
      title: "Chuyến đi chơi đầu tiên",
      text: "Một kỷ niệm vui, hoặc một lần hai đứa cười đau cả bụng.",
      photo: "photos/anh-3.svg"
    },
    {
      date: "xx/06/2026",
      title: "Khoảnh khắc đáng nhớ",
      text: "Một bức ảnh mà mỗi lần xem lại anh đều mỉm cười.",
      photo: "photos/anh-4.svg"
    },
    {
      date: "xx/08/2026",
      title: "Một ngày bình thường mà đặc biệt",
      text: "Những điều nhỏ xíu em làm khiến anh thấy may mắn.",
      photo: "photos/anh-5.svg"
    },
    {
      date: "20/10/2026",
      title: "Hôm nay",
      text: "20/10 đầu tiên mình bên nhau, và còn nhiều lần nữa.",
      photo: "photos/anh-6.svg"
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
