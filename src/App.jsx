import { useMemo, useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  Globe2,
  Maximize,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import FilterField from "./components/FilterField";

const initialForm = {
  keyword: "",
  channel: "FO",
  fromDate: "08/03/2025",
  fromTime: "20:00",
  toDate: "08/03/2025",
  toTime: "20:00",
  region: "Toàn Quốc",
  service: "Tất Cả",
  receiver: "Tất Cả",
  partner: "Tất Cả",
  satisfaction: "Không Hài Lòng",
  point: "Tất Cả",
  unhappyReason: "",
  emotion: "",
  queue: "",
  ki: "Tất Cả",
  complaintType: "Tất Cả",
  qualityFrom: "",
  qualityTo: "",
  level1: "",
  level2: "",
  level3: "",
  level4: "",
  callFrom: "",
  callTo: "",
  callSort: "Cao Nhất/ Thấp Nhất",
  callTop: "",
  controller: "Tất Cả",
  controlStatus: "",
  controlResult: "",
  assignmentFrom: "08/03/2025",
  assignmentTo: "08/03/2025",
  satisfactionRateFrom: "",
  satisfactionRateTo: "",
  satisfactionSort: "Cao Nhất/ Thấp Nhất",
  satisfactionTop: "",
  seniorityFrom: "",
  seniorityTo: "",
  senioritySort: "Cao Nhất/ Thấp Nhất",
  seniorityTop: "",
};

const options = {
  channel: ["FO", "Callbotin", "Chatbot", "Telesale", "Trực tuyến"],
  region: ["Toàn Quốc", "Miền Bắc", "Miền Trung", "Miền Nam"],
  service: ["Tất Cả", "FTTH", "TV360", "Di động"],
  receiver: ["Tất Cả", "Nguyễn Văn A", "Trần Văn B"],
  partner: ["Tất Cả", "Đối tác A", "Đối tác B"],
  satisfaction: ["Không Hài Lòng", "Bình Thường", "Đồng Ý"],
  point: ["Tất Cả", "1", "2", "3", "4", "5"],
  ki: ["Tất Cả", "Có", "Không"],
  complaintType: ["Tất Cả", "Có", "Không"],
  callSort: ["Cao Nhất/ Thấp Nhất", "Thấp Nhất/ Cao Nhất"],
  controller: ["Tất Cả", "Nguyễn Văn A", "Trần Văn B"],
  controlStatus: ["Tất Cả", "Open", "Đang xử lý", "Đã đóng"],
  controlResult: ["Tất Cả", "Đạt", "Không đạt"],
  satisfactionSort: ["Cao Nhất/ Thấp Nhất", "Thấp Nhất/ Cao Nhất"],
  senioritySort: ["Cao Nhất/ Thấp Nhất", "Thấp Nhất/ Cao Nhất"],
};

function Select({ value, onChange, items = ["Tất Cả"], placeholder }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {placeholder && <option value="">{placeholder}</option>}
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

function Input({ value, onChange, placeholder = "" }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

function App() {
  const [form, setForm] = useState(initialForm);
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const [toast, setToast] = useState("");

  const update = (key) => (value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const searchSummary = useMemo(() => {
    const active = Object.entries(form).filter(
      ([key, value]) => value !== initialForm[key] && value !== ""
    );
    return active.length;
  }, [form]);

  const reset = () => {
    setForm(initialForm);
    setToast("Đã xóa toàn bộ bộ lọc");
    window.setTimeout(() => setToast(""), 2200);
  };

  const search = () => {
    setToast(`Đang tìm kiếm với ${searchSummary} điều kiện thay đổi`);
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main">
        <header className="topbar">
          <div className="topbar-spacer" />
          <div className="topbar-actions">
            <button className="icon-btn language" aria-label="Language">
              <Globe2 size={14} />
              <span>VI</span>
            </button>
            <button className="icon-btn" aria-label="Fullscreen">
              <Maximize size={16} />
            </button>
            <button className="icon-btn" aria-label="Search">
              <Search size={17} />
            </button>
            <button className="icon-btn" aria-label="Settings">
              <Settings size={16} />
            </button>
            <div className="profile">
              <div className="profile-text">
                <strong>Christopher</strong>
                <span>Manager</span>
              </div>
              <div className="avatar">
                <UserRound size={22} />
              </div>
            </div>
          </div>
        </header>

        <section className="content">
          <div className="keyword-row">
            <div className="dots">•••</div>
            <input
              className="keyword-input"
              value={form.keyword}
              onChange={(e) => update("keyword")(e.target.value)}
              placeholder="Nhập Từ Khóa Tìm Kiếm (Số Thuê Bao, Mã Phản Ánh, User Nhân Viên Tiếp Nhận"
            />
          </div>

          <div className="filters">
            <div className="grid grid-4">
              <FilterField label="Kênh Tiếp Nhận">
                <Select value={form.channel} onChange={update("channel")} items={options.channel} />
              </FilterField>

              <FilterField label="Từ Ngày Tiếp Nhận" required>
                <Input value={form.fromDate} onChange={update("fromDate")} />
              </FilterField>
              <FilterField label="Từ Giờ">
                <Input value={form.fromTime} onChange={update("fromTime")} />
              </FilterField>
              <FilterField label="Đến Ngày Tiếp Nhận" required>
                <Input value={form.toDate} onChange={update("toDate")} />
              </FilterField>

              <FilterField label="Đến Giờ">
                <Input value={form.toTime} onChange={update("toTime")} />
              </FilterField>
              <FilterField label="Khu Vực">
                <Select value={form.region} onChange={update("region")} items={options.region} />
              </FilterField>
              <FilterField label="Dịch Vụ">
                <Select value={form.service} onChange={update("service")} items={options.service} />
              </FilterField>
              <FilterField label="Nhân Viên Tiếp Nhận">
                <Select value={form.receiver} onChange={update("receiver")} items={options.receiver} />
              </FilterField>

              <FilterField label="Đối Tác">
                <Select value={form.partner} onChange={update("partner")} items={options.partner} />
              </FilterField>
              <FilterField label="Phân Loại Mức Độ Hài Lòng">
                <Select value={form.satisfaction} onChange={update("satisfaction")} items={options.satisfaction} />
              </FilterField>
              <FilterField label="Điểm">
                <Select value={form.point} onChange={update("point")} items={options.point} />
              </FilterField>
              <FilterField label="Nguyên Nhân KH Không Hài Lòng">
                <Input value={form.unhappyReason} onChange={update("unhappyReason")} placeholder="Nhập Nguyên Nhân" />
              </FilterField>

              <FilterField label="Emotion">
                <Input value={form.emotion} onChange={update("emotion")} />
              </FilterField>
              <FilterField label="Queue IPCC">
                <Input value={form.queue} onChange={update("queue")} />
              </FilterField>
              <FilterField label="KI">
                <Select value={form.ki} onChange={update("ki")} items={options.ki} />
              </FilterField>
              <FilterField label="Tháng Chăm KH">
                <Select value={form.complaintType} onChange={update("complaintType")} items={options.complaintType} />
              </FilterField>

              <FilterField label="Từ Điểm Chất Lượng">
                <Input value={form.qualityFrom} onChange={update("qualityFrom")} />
              </FilterField>
              <FilterField label="Đến Điểm Chất Lượng">
                <Input value={form.qualityTo} onChange={update("qualityTo")} />
              </FilterField>
              <FilterField label="Cấp 1">
                <Select value={form.level1} onChange={update("level1")} items={["", "Cấp 1 - A", "Cấp 1 - B"]} placeholder=" " />
              </FilterField>
              <FilterField label="Cấp 2">
                <Select value={form.level2} onChange={update("level2")} items={["", "Cấp 2 - A", "Cấp 2 - B"]} placeholder=" " />
              </FilterField>

              <FilterField label="Cấp 3">
                <Select value={form.level3} onChange={update("level3")} items={["", "Cấp 3 - A", "Cấp 3 - B"]} placeholder=" " />
              </FilterField>
              <FilterField label="Cấp 4">
                <Select value={form.level4} onChange={update("level4")} items={["", "Cấp 4 - A", "Cấp 4 - B"]} placeholder=" " />
              </FilterField>
              <FilterField label="Từ Thời Gian Đàm Thoại Của KH (S)">
                <Input value={form.callFrom} onChange={update("callFrom")} />
              </FilterField>
              <FilterField label="Đến Thời Gian Đàm Thoại Của KH (S)">
                <Input value={form.callTo} onChange={update("callTo")} />
              </FilterField>

              <FilterField label="Sắp Xếp Thời Gian Đàm Thoại Của KH">
                <Select value={form.callSort} onChange={update("callSort")} items={options.callSort} />
              </FilterField>
              <FilterField label="TOP Thời Gian Đàm Thoại Của KH">
                <Input value={form.callTop} onChange={update("callTop")} />
              </FilterField>
              <FilterField label="Nhân Viên Kiểm Soát">
                <Select value={form.controller} onChange={update("controller")} items={options.controller} />
              </FilterField>
              <FilterField label="Trạng Thái Kiểm Soát">
                <Select value={form.controlStatus} onChange={update("controlStatus")} items={options.controlStatus} placeholder=" " />
              </FilterField>

              <FilterField label="Kết Quả Kiểm Soát">
                <Select value={form.controlResult} onChange={update("controlResult")} items={options.controlResult} placeholder=" " />
              </FilterField>
              <FilterField label="Từ Ngày Chia Việc">
                <Input value={form.assignmentFrom} onChange={update("assignmentFrom")} />
              </FilterField>
              <FilterField label="Đến Ngày Chia Việc">
                <Input value={form.assignmentTo} onChange={update("assignmentTo")} />
              </FilterField>
            </div>

            <button
              className="advanced-header"
              onClick={() => setAdvancedOpen((open) => !open)}
              aria-expanded={advancedOpen}
            >
              <span>Tìm Kiếm Nâng Cao</span>
              {advancedOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </button>

            {advancedOpen && (
              <div className="grid grid-4 advanced-grid">
                <FilterField label="Từ Tỷ Lệ Hài Lòng (%)">
                  <Input value={form.satisfactionRateFrom} onChange={update("satisfactionRateFrom")} />
                </FilterField>
                <FilterField label="Đến Tỷ Lệ Hài Lòng (%)">
                  <Input value={form.satisfactionRateTo} onChange={update("satisfactionRateTo")} />
                </FilterField>
                <FilterField label="Sắp Xếp TLHL">
                  <Select value={form.satisfactionSort} onChange={update("satisfactionSort")} items={options.satisfactionSort} />
                </FilterField>
                <FilterField label="TOP TLHL">
                  <Input value={form.satisfactionTop} onChange={update("satisfactionTop")} />
                </FilterField>

                <FilterField label="Từ Thâm Niên Làm Việc (Tháng)">
                  <Input value={form.seniorityFrom} onChange={update("seniorityFrom")} />
                </FilterField>
                <FilterField label="Đến Thâm Niên Làm Việc (Tháng)">
                  <Input value={form.seniorityTo} onChange={update("seniorityTo")} />
                </FilterField>
                <FilterField label="Sắp Xếp Thâm Niên">
                  <Select value={form.senioritySort} onChange={update("senioritySort")} items={options.senioritySort} />
                </FilterField>
                <FilterField label="TOP Thâm Niên">
                  <Input value={form.seniorityTop} onChange={update("seniorityTop")} />
                </FilterField>
              </div>
            )}

            <div className="actions">
              <button className="secondary-btn" onClick={reset}>
                Xóa bộ lọc
              </button>
              <button className="primary-btn" onClick={search}>
                Tìm kiếm
              </button>
            </div>
          </div>
        </section>

        {toast && (
          <div className="toast">
            <span>{toast}</span>
            <button onClick={() => setToast("")}><X size={15} /></button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
