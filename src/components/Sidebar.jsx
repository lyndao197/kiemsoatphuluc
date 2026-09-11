import React from "react";
import { Menu } from "lucide-react";

const menuItems = [
  "Công Việc Của Tôi",
  "Hài Lòng",
  "Phản Ánh Nhiều Lần",
  "Phản Ánh Lặp",
  "Kiểm Soát Theo Chủ Đề",
  "Quản Lý Nhân Viên Kiểm Soát",
  "Cấu Hình Loại Báo Cáo",
];

export default function Sidebar({ onManageControlStaff, onMyWork, onSatisfaction, activeItem }) {
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
            className={`nav-item ${item === activeItem ? "active" : ""}`}
            onClick={item === "Quản Lý Nhân Viên Kiểm Soát" ? onManageControlStaff : item === "Công Việc Của Tôi" ? onMyWork : item === "Hài Lòng" ? onSatisfaction : undefined}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
