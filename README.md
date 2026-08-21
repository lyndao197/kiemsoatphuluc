# FO Report Search UI

UI React/Vite mô phỏng màn hình **Tìm kiếm thông tin báo cáo FO – Hải Long** theo ảnh tham chiếu.

## Chạy local

```bash
npm install
npm run dev
```

Mở URL Vite hiển thị trong terminal.

## Build production

```bash
npm run build
npm run preview
```

## Cấu trúc

```text
fo-report-search-ui/
├── public/
├── src/
│   ├── components/
│   │   ├── FilterField.jsx
│   │   └── Sidebar.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Ghi chú

- Đây là frontend prototype, chưa kết nối API.
- Các dropdown đang dùng dữ liệu mẫu.
- Nút **Xóa bộ lọc** reset toàn bộ form.
- Nút **Tìm kiếm** hiển thị toast với điều kiện đã chọn.
- **Tìm kiếm nâng cao** có thể thu gọn/mở rộng.
- Sidebar có trạng thái menu đang chọn.
