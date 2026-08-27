import React from "react";
import { Menu } from "lucide-react";

const menuItems = [
  "Công Việc Của Tôi",
  "Hài Lòng",
  "Phản Ánh Nhiều Lần",
  "Phản Ánh Lặp",
  "Kiểm Soát Theo Chủ Đề",
  "Cấu Hình Loại Báo Cáo",
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo-box">Viettel COC logo</div>
        <Menu size={18} strokeWidth={2} />
      </div>

      <nav className="side-nav">
        <div className="nav-section-title">Kiểm Soát</div>
        {menuItems.map((item) => (
          <button
            key={item}
            className={`nav-item ${item === "Hài Lòng" ? "active" : ""}`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
