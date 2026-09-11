import React, { useState } from "react";
import { ArrowLeft, CalendarDays, Check, ChevronDown, Mail, Pencil, Plus, Save, Search, Trash2, UserRoundPlus, X } from "lucide-react";
import Sidebar from "./components/Sidebar";
import SearchApp from "./searchui";

const secondaryServices = [
  "Di động", "Cố định", "SME", "COC", "18008000N2", "18008000N3", "18008000N4",
  "18008000N5", "18008000N7", "18008000N8", "18008000N9", "1789N1", "1789N2",
  "1789N3-KĐG", "1789N5", "1789N6", "18009000", "VDS",
];

const getAllowedSecondaryServices = (mainUnit) => secondaryServices.filter((service) => service !== mainUnit);

const getValidSubUnits = (mainUnit, subUnits = []) => {
  const allowed = getAllowedSecondaryServices(mainUnit);
  const picked = Array.isArray(subUnits) ? subUnits : [subUnits].filter(Boolean);
  const uniquePicked = [...new Set(picked.filter((service) => allowed.includes(service)))];
  const fallback = allowed.filter((service) => !uniquePicked.includes(service));
  return [...uniquePicked, ...fallback].slice(0, 3);
};

const initialStaff = [
  { username: "vt_dvkh_oahqtuyen463_cc2", email: "lanttt@viettel.com.vn", mainUnit: "Di động", subUnit: ["Cố định", "SME", "COC"], status: "Hoạt động" },
  { username: "vt_cskh_okchong7118_ccdng", email: "chongnt@viettel.com.vn", mainUnit: "Cố định", subUnit: ["Di động", "SME", "COC"], status: "Hoạt động" },
  { username: "vt_dvkh_ngocanh289_cc1", email: "ngocanhvt@viettel.com.vn", mainUnit: "SME", subUnit: ["Di động", "Cố định", "COC"], status: "Hoạt động" },
  { username: "vt_cskh_minhquan527_cc2", email: "minhquan@viettel.com.vn", mainUnit: "COC", subUnit: ["Di động", "SME", "Cố định"], status: "Hoạt động" },
  { username: "vt_dvkh_thuha304_cc1", email: "thuhadt@viettel.com.vn", mainUnit: "18008000N5", subUnit: ["Di động", "Cố định", "SME"], status: "Không hoạt động" },
  { username: "vt_cskh_hoangnam816_cc3", email: "hoangnam@viettel.com.vn", mainUnit: "18008000N8", subUnit: ["Di động", "VDS", "Cố định"], status: "Hoạt động" },
  { username: "vt_dvkh_phuonglinh492_cc2", email: "phuonglinh@viettel.com.vn", mainUnit: "18008000N9", subUnit: ["1789N1", "1789N2", "1789N3-KĐG"], status: "Hoạt động" },
  { username: "vt_cskh_tuananh638_cc1", email: "tuananh@viettel.com.vn", mainUnit: "1789N2", subUnit: ["18008000N8", "1789N1", "1789N3-KĐG"], status: "Hoạt động" },
  { username: "vt_dvkh_khanhvy175_cc2", email: "khanhvy@viettel.com.vn", mainUnit: "1789N5", subUnit: ["1789N2", "18009000", "VDS"], status: "Không hoạt động" },
  { username: "vt_cskh_quanghuy903_cc3", email: "quanghuy@viettel.com.vn", mainUnit: "18009000", subUnit: ["VDS", "SME", "COC"], status: "Hoạt động" },
  { username: "vt_dvkh_hieuvu185_cc1", email: "hieuvu@viettel.com.vn", mainUnit: "Di động", subUnit: ["Cố định", "COC", "VDS"], status: "Hoạt động" },
  { username: "vt_cskh_thanhmai226_cc2", email: "thanhmai@viettel.com.vn", mainUnit: "Di động", subUnit: ["SME", "COC", "18008000N2"], status: "Hoạt động" },
  { username: "vt_dvkh_quynhnhu541_cc3", email: "quynhnhu@viettel.com.vn", mainUnit: "Di động", subUnit: ["COC", "18008000N3", "18008000N4"], status: "Hoạt động" },
  { username: "vt_cskh_dangkhoa742_cc1", email: "dangkhoa@viettel.com.vn", mainUnit: "Cố định", subUnit: ["Di động", "SME", "COC"], status: "Hoạt động" },
  { username: "vt_dvkh_hoangyen883_cc2", email: "hoangyen@viettel.com.vn", mainUnit: "Cố định", subUnit: ["Di động", "18008000N3", "18009000"], status: "Hoạt động" },
  { username: "vt_cskh_tuanlinh913_cc3", email: "tuanlinh@viettel.com.vn", mainUnit: "SME", subUnit: ["Di động", "Cố định", "COC"], status: "Hoạt động" },
  { username: "vt_dvkh_minhthao471_cc1", email: "minhthao@viettel.com.vn", mainUnit: "SME", subUnit: ["Cố định", "18008000N2", "18008000N3"], status: "Hoạt động" },
  { username: "vt_cskh_haianh386_cc2", email: "haianh@viettel.com.vn", mainUnit: "COC", subUnit: ["Di động", "SME", "Cố định"], status: "Hoạt động" },
  { username: "vt_dvkh_trangloan604_cc3", email: "trangloan@viettel.com.vn", mainUnit: "COC", subUnit: ["Di động", "18008000N3", "18009000"], status: "Hoạt động" },
  { username: "vt_cskh_namson728_cc1", email: "namson@viettel.com.vn", mainUnit: "18008000N5", subUnit: ["Di động", "Cố định", "SME"], status: "Hoạt động" },
  { username: "vt_dvkh_bichthu670_cc2", email: "bichthu@viettel.com.vn", mainUnit: "18008000N8", subUnit: ["Di động", "VDS", "SME"], status: "Hoạt động" },
  { username: "vt_cskh_kimchi751_cc3", email: "kimchi@viettel.com.vn", mainUnit: "18009000", subUnit: ["VDS", "SME", "COC"], status: "Hoạt động" },
  { username: "vt_dvkh_anhthu839_cc1", email: "anhthu@viettel.com.vn", mainUnit: "1789N2", subUnit: ["18009000", "1789N1", "1789N3-KĐG"], status: "Hoạt động" },
  { username: "vt_cskh_huyentrang915_cc2", email: "huyentrang@viettel.com.vn", mainUnit: "1789N5", subUnit: ["1789N2", "18009000", "VDS"], status: "Hoạt động" },
  { username: "vt_dvkh_vuminh123_cc3", email: "vuminh@viettel.com.vn", mainUnit: "18008000N9", subUnit: ["1789N1", "1789N2", "1789N3-KĐG"], status: "Hoạt động" },
  { username: "vt_cskh_thuyduong544_cc1", email: "thuyduong@viettel.com.vn", mainUnit: "18009000", subUnit: ["VDS", "SME", "COC"], status: "Hoạt động" },
  { username: "vt_dvkh_trunguong218_cc2", email: "trunguong@viettel.com.vn", mainUnit: "Di động", subUnit: ["Cố định", "SME", "COC"], status: "Hoạt động" },
  { username: "vt_cskh_hongnhung511_cc3", email: "hongnhung@viettel.com.vn", mainUnit: "Di động", subUnit: ["SME", "COC", "18008000N2"], status: "Hoạt động" },
  { username: "vt_dvkh_khanhlinh472_cc1", email: "khanhlinh@viettel.com.vn", mainUnit: "Cố định", subUnit: ["Di động", "SME", "18009000"], status: "Hoạt động" },
  { username: "vt_cskh_xuanmai804_cc2", email: "xuanmai@viettel.com.vn", mainUnit: "SME", subUnit: ["Di động", "Cố định", "COC"], status: "Hoạt động" },
  { username: "vt_dvkh_phatdat607_cc3", email: "phatdat@viettel.com.vn", mainUnit: "18008000N8", subUnit: ["Di động", "VDS", "Cố định"], status: "Hoạt động" },
].map((staff) => ({
  ...staff,
  subUnit: getValidSubUnits(staff.mainUnit, staff.subUnit),
}));
const emptyForm = { username: "", email: "", mainUnit: "", subUnit: [], status: "Đang hoạt động" };

function MultiSelect({ value, onChange, mainUnit = "" }) {
  const [open, setOpen] = useState(false);
  const label = value.length ? value.join(", ") : "Chọn dịch vụ phụ";
  const options = getAllowedSecondaryServices(mainUnit);

  const toggleOption = (option) => {
    if (option === mainUnit) return;
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
      return;
    }
    if (value.length >= 3) return;
    onChange([...value, option]);
  };

  return (
    <div className="multi-select">
      <button type="button" className={`staff-field multi-select-trigger ${value.length ? "has-value" : ""}`} onClick={() => setOpen((current) => !current)} aria-expanded={open}>
        <span>{label}</span>
        <ChevronDown size={20} />
      </button>
      {open && (
        <div className="multi-select-options">
          {options.map((option) => (
            <button type="button" className={`multi-select-option ${value.includes(option) ? "selected" : ""}`} key={option} onClick={() => toggleOption(option)}>
              <span>{option}</span>
              {value.includes(option) && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function UserList() {
  const [staffRows, setStaffRows] = useState(initialStaff);
  const [staffForm, setStaffForm] = useState(emptyForm);
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("work");
  const [toast, setToast] = useState("");
  const [workDates, setWorkDates] = useState({ from: "02/03/2026", to: "02/03/2026" });

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const updateForm = (field) => (event) => setStaffForm((current) => {
    const nextValue = event.target.multiple
      ? Array.from(event.target.selectedOptions, (option) => option.value)
      : event.target.value;

    if (field === "mainUnit") {
      return {
        ...current,
        mainUnit: nextValue,
        subUnit: getValidSubUnits(nextValue, current.subUnit),
      };
    }

    return {
      ...current,
      [field]: nextValue,
    };
  });

  const addStaff = (event) => {
    event.preventDefault();
    const normalizedSubUnit = getValidSubUnits(staffForm.mainUnit, staffForm.subUnit);
    const nextStaff = {
      ...staffForm,
      subUnit: normalizedSubUnit,
    };
    setStaffRows((current) => mode === "edit"
      ? current.map((staff) => staff.username === staffForm.originalUsername ? nextStaff : staff)
      : [...current, nextStaff]
    );
    setStaffForm(emptyForm);
    setMode("list");
    showToast(mode === "edit" ? "Đã cập nhật nhân viên kiểm soát" : "Đã thêm nhân viên kiểm soát");
  };

  const deleteStaff = (username) => {
    if (!window.confirm(`Bạn có chắc muốn xoá nhân viên ${username}?`)) return;
    setStaffRows((current) => current.filter((staff) => staff.username !== username));
    showToast("Đã xoá nhân viên kiểm soát");
  };

  const editStaff = (staff) => {
    setStaffForm({
      ...staff,
      subUnit: Array.isArray(staff.subUnit) ? staff.subUnit : [],
      originalUsername: staff.username,
    });
    setMode("edit");
  };

  const visibleStaff = staffRows.filter((staff) =>
    [staff.username, staff.email, staff.mainUnit, staff.subUnit, staff.status].join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-shell">
      <Sidebar activeItem={mode === "work" ? "Công Việc Của Tôi" : mode === "satisfaction" ? "Hài Lòng" : "Quản Lý Nhân Viên Kiểm Soát"} onMyWork={() => setMode("work")} onManageControlStaff={() => setMode("list")} onSatisfaction={() => setMode("satisfaction")} />
      <main className="main">
        {mode === "satisfaction" ? <SearchApp embedded /> : mode === "work" ? (
          <section className="my-work-screen" aria-labelledby="my-work-title">
            <header className="work-topbar"><div className="work-topbar-actions"><button type="button" className="work-language" onClick={() => showToast("Ngôn ngữ: Tiếng Việt")}>🇻🇳 VI</button><button type="button" aria-label="Toàn màn hình" onClick={() => showToast("Đã chọn chế độ toàn màn hình")}>⛶</button><button type="button" aria-label="Tìm kiếm" onClick={() => showToast("Mở tìm kiếm") }><Search size={14} /></button><button type="button" aria-label="Cài đặt" onClick={() => showToast("Mở cài đặt")}>⚙</button><button type="button" className="work-profile" onClick={() => showToast("Tài khoản Christopher")}><strong>Christopher</strong><small>Manager</small><span>👤</span></button></div></header>
            <div className="work-content">
              <h1 id="my-work-title">Công việc của tôi</h1>
              <div className="work-date-filter"><label>Từ ngày chia việc<div className="work-date-input"><input type="date" value={workDates.from} onChange={(event) => setWorkDates((current) => ({ ...current, from: event.target.value }))} /><CalendarDays size={15} /></div></label><label>Đến ngày chia việc<div className="work-date-input"><input type="date" value={workDates.to} onChange={(event) => setWorkDates((current) => ({ ...current, to: event.target.value }))} /><CalendarDays size={15} /></div></label></div>
              <div className="work-stat-grid">
                {[
                  ["HÀI LÒNG", "145", "100", "4", "41"],
                  ["PHẢN ÁNH NHIỀU LẦN", "100", "90", "3", "6"],
                  ["PHẢN ÁNH LẶP", "20", "20", "0", "0"],
                  ["THEO CHỦ ĐỀ", "210", "100", "10", "100"],
                ].map(([title, total, done, processing, pending]) => <article className="work-stat-card" key={title}><h2>{title}</h2><p>Tổng kiểm soát <button type="button" onClick={() => showToast(`${title}: ${total} bản ghi`)}>{total}</button></p><p>Đã kiểm soát <button type="button" onClick={() => showToast(`${title}: ${done} bản ghi đã kiểm soát`)}>{done}</button></p><p>Đang kiểm soát <button type="button" onClick={() => showToast(`${title}: ${processing} bản ghi đang kiểm soát`)}>{processing}</button></p><p>Chưa kiểm soát <button type="button" className="pending" onClick={() => showToast(`${title}: ${pending} bản ghi chưa kiểm soát`)}>{pending}</button></p></article>)}
              </div>
            </div>
          </section>
        ) : mode === "add" ? (
          <form className="add-staff-screen" onSubmit={addStaff}>
            <div className="add-staff-heading">
              <button type="button" className="back-list-btn" onClick={() => setMode("list")}><ArrowLeft size={19} />Quay lại danh sách</button>
              <div className="add-staff-icon"><UserRoundPlus size={42} strokeWidth={1.8} /></div>
              <div><h1>{mode === "edit" ? "Thông tin nhân viên kiểm soát" : "Thêm nhân viên kiểm soát"}</h1><p>{mode === "edit" ? "Cập nhật thông tin nhân viên kiểm soát trong hệ thống" : "Nhập thông tin để thêm mới nhân viên kiểm soát vào hệ thống"}</p></div>
            </div>
            <div className="staff-form-grid">
              <label><span>Nhân viên kiểm soát <b>*</b></span><div className="staff-field"><input type="text" value={staffForm.username} onChange={updateForm("username")} placeholder="Nhập user account" required /></div></label>
              <label><span>Dịch vụ chính <b>*</b></span><div className="staff-field select-field"><select value={staffForm.mainUnit} onChange={updateForm("mainUnit")} required><option value="">Chọn dịch vụ chính</option>{secondaryServices.map((service) => <option key={service} value={service}>{service}</option>)}</select><ChevronDown size={20} /></div></label>
              <label><span>Dịch vụ phụ</span><MultiSelect value={staffForm.subUnit} mainUnit={staffForm.mainUnit} onChange={(subUnit) => setStaffForm((current) => ({ ...current, subUnit: getValidSubUnits(current.mainUnit, subUnit) }))} /></label>
              <label><span>Trạng thái <b>*</b></span><div className="staff-field select-field"><select value={staffForm.status} onChange={updateForm("status")} required><option>Đang hoạt động</option><option>Không hoạt động</option></select><ChevronDown size={20} /></div></label>
              <label><span>Email</span><div className="staff-field"><Mail size={21} /><input type="email" value={staffForm.email} onChange={updateForm("email")} placeholder="Nhập email" /></div></label>
            </div>
            <div className="add-staff-actions"><button type="button" className="secondary-btn" onClick={() => setMode("list")}>Hủy</button><button type="submit" className="primary-btn"><Save size={20} />{mode === "edit" ? "Cập nhật nhân viên" : "Thêm mới nhân viên"}</button></div>
          </form>
        ) : (
          <section className="control-staff-screen" aria-labelledby="control-staff-title">
            <h1 id="control-staff-title">Danh sách nhân viên kiểm soát</h1>
            <div className="control-staff-actions"><div className="staff-search-wrapper"><Search size={16} /><input className="staff-search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Tìm kiếm nhân viên theo từ khoá hoặc user account" /></div><button className="staff-add-btn" onClick={() => setMode("add")}><Plus size={17} />Thêm nhân viên</button></div>
            <div className="control-staff-screen-card"><table className="control-staff-table"><thead><tr><th>User account</th><th>Email</th><th>DV chính</th><th>DV phụ</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{visibleStaff.map((staff) => <tr key={staff.username}><td>{staff.username}</td><td>{staff.email}</td><td>{staff.mainUnit}</td><td>{Array.isArray(staff.subUnit) ? staff.subUnit.join(", ") : staff.subUnit}</td><td><span className="staff-status active">{staff.status}</span></td><td className="staff-actions-cell"><button type="button" className="staff-action" aria-label={`Chỉnh sửa ${staff.username}`} title="Chỉnh sửa" onClick={() => editStaff(staff)}><Pencil size={17} /></button><button type="button" className="staff-delete-action" aria-label={`Xoá ${staff.username}`} title="Xoá" onClick={() => deleteStaff(staff.username)}><Trash2 size={17} /></button></td></tr>)}</tbody></table></div>
          </section>
        )}
        {toast && <div className="toast"><span>{toast}</span><button onClick={() => setToast("")}><X size={15} /></button></div>}
      </main>
    </div>
  );
}

export default UserList;
