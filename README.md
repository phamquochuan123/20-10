# Web quà 20/10 (React + Tailwind + 3D)

Vite, React, Tailwind CSS, Framer Motion và Three.js (React Three Fiber).

## Có gì trong trang
1. Phong thư 3D nghiêng theo ngón tay, chạm để nắp lật mở, thiệp trượt lên, hoa bung ra, nhạc bật.
2. Trái tim 3D làm từ hàng nghìn hạt sáng, đập nhẹ và xoay theo tay.
3. Bộ đếm "đã bên nhau" với chữ số lật kiểu lịch.
4. Bó tulip tự mọc và nở, nghiêng 3D.
5. Dòng thời gian ảnh polaroid lật 3D bay vào, nghiêng theo tay có vệt sáng.
6. Lọ "lý do anh thương em", chạm là rút ra một mẩu giấy.
7. Lá thư gấp ba tự mở từng nếp.
8. "Em có thương anh không?", nút Không chạy trốn, nút Có làm tim bay khắp màn hình.

## Sửa nội dung
Tất cả chữ, ảnh, ngày tháng nằm trong **`src/data.js`**. Ảnh để trong `public/photos/`, nhạc là `public/music.mp3` (không có thì trang tự chơi giai điệu hộp nhạc).

## Chạy thử trên máy
```
npm install
npm run dev
```

## Đăng lên GitHub Pages
1. Tạo repo mới trên GitHub, đẩy toàn bộ thư mục này lên nhánh `main`.
2. Vào **Settings → Pages**, mục *Source* chọn **GitHub Actions**.
3. Mỗi lần đẩy code lên `main`, file `.github/workflows/deploy.yml` tự build và đăng web tại `https://<tên-github>.github.io/<tên-repo>/`.
