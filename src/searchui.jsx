import React, { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Globe2,
  Maximize2,
  Search,
  Settings,
  Smile,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import FilterField from "./components/FilterField";

const initialForm = {
  keyword: "",
  reportType: "FO",
  fromDate: "08/03/2025",
  fromTime: "20:00",
  toDate: "08/03/2025",
  toTime: "20:00",
  region: "Toàn Quốc",
  service: "Tất Cả",
  receiver: "Tất Cả",
  partner: "Tất Cả",
  satisfaction: "Không đồng ý",
  satisfactionPoint: "Tất Cả",
  unhappyReason: "Tất Cả",
  emotion: "Tất Cả",
  queue: "Tất Cả",
  ki: "A",
  customerCareMonth: "Tháng 7",
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
  explanationStatus: "Tất Cả",
  assignmentFrom: "08/03/2025",
  assignmentTo: "08/03/2025",
  explainer: "Tất Cả",
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
  reportType: ["FO", "Callbotin", "Chatbot", "Telesale", "Trực tuyến"],
  region: ["Toàn Quốc", "Miền Bắc", "Miền Trung", "Miền Nam"],
  service: ["Tất Cả", "FTTH", "TV360", "Di động"],
  receiver: ["Tất Cả", "Nguyễn Văn A", "Trần Văn B"],
  partner: ["Tất Cả", "Đối tác A", "Đối tác B"],
  satisfaction: ["Không đồng ý", "Bình Thường", "Đồng Ý"],
  satisfactionPoint: ["Tất Cả", "1", "2", "3", "4", "5"],
  unhappyReason: ["Tất Cả", "Thái độ phục vụ", "Chất lượng dịch vụ", "Thời gian xử lý", "Không đáp ứng nhu cầu"],
  emotion: ["Tất Cả", "Positive", "Neutral", "Negative"],
  queue: ["Tất Cả", "Queue 01", "Queue 02", "Queue 03"],
  ki: ["A"],
  customerCareMonth: ["Tháng 7"],
  callSort: ["Cao Nhất/ Thấp Nhất", "Thấp Nhất/ Cao Nhất"],
  controller: ["Tất Cả", "Nguyễn Văn A", "Trần Văn B"],
  controlStatus: ["Tất Cả", "Open", "Đang xử lý", "Đã đóng"],
  controlResult: ["Tất Cả", "Đạt", "Không đạt"],
  explanationStatus: ["Tất Cả", "Chưa giải trình", "Đã giải trình"],
  explainer: ["Tất Cả", "Nguyễn Văn A", "Trần Văn B"],
  satisfactionSort: ["Cao Nhất/ Thấp Nhất", "Thấp Nhất/ Cao Nhất"],
  senioritySort: ["Cao Nhất/ Thấp Nhất", "Thấp Nhất/ Cao Nhất"],
};

const resultRows = [
  [
    "1185007463", "961753668", "SMS", "Khách hàng VIP", "Thường",
    "00008198", "callbot_10.208.70.9", "", "", "", "1", "38",
    "04/05/2026 09:19:05", "", "", "", "", "", "", "", "",
    "Công ty Dịch vụ Khách hàng", "VCX", "", "", "", "", "",
    "20260504091851-JEUAEDJN-385498", "", "", "", "", "", "", "",
    "", "", "", "", "", "",
  ],
];

const allResultHeaders = [
  "STT", "Mã cuộc survey", "Số thuê bao", "Hình thức survey",
  "Phân khúc khách hàng", "Loại Khách hàng", "Line tiếp nhận",
  "Nhân viên tiếp nhận", "Đối tác", "Loại đối tác", "Tổng đài khu vực",
  "Thời gian KH chờ gặp tổng đài", "Thời gian đàm thoại của KH (s)",
  "Thời điểm KH gọi tổng đài", "Thời điểm nhắn tin khảo sát",
  "Thời điểm KH phản hồi", "Kết quả khảo sát", "Trạng thái phản hồi",
  "Điểm đánh giá", "Phân loại mức độ hài lòng", "Nguyên nhân KH không đồng ý",
  "Đóng góp", "Đơn vị chịu trách nhiệm", "Tổng công ty", "Nhu cầu khách hàng",
  "Cấp 1/Mức độ phản ánh", "Cấp 2/Nhóm phản ánh", "Cấp 3/Thể loại",
  "Cấp 4/Loại phản ánh", "Mã cuộc gọi",
  "Khu vực", "Dịch vụ", "Không đồng ý", "Điểm Hài Lòng",
  "Nguyên nhân không hài lòng", "Nhân viên kiểm soát", "Vi phạm nghiệp vụ",
  "Vi phạm ATTT", "Vi phạm ý thức/ Trách nhiệm", "Kết quả đánh giá chung",
  "Trạng thái kiểm soát", "Kết quả kiểm soát",
  "Mã khiếu nại", "Loại hình thuê bao", "Loại dịch vụ", "Gói cước",
  "Nhu cầu Cấp 1", "Nhu cầu Cấp 2", "Nhu cầu Cấp 3", "Nhu cầu Cấp 4",
  "Nhóm phản ánh", "Thể loại", "Loại phản ánh", "Hình thức tiếp nhận",
  "Tỉnh (mới)", "Phường/xã (mới)", "Ngày xử lý cuối", "Người xử lý cuối",
  "Nội dung phản ánh", "Nội dung xử lý", "Phòng xử lý", "Ngày nhắn tin khảo sát",
  "Ngày KH phản hồi", "Ngày tiếp nhận", "Giờ tiếp nhận", "Số lần liên lạc",
  "Số lần lặp lại", "Thời gian kết nối", "Khoảng thời gian lặp lại (ngày)",
  "Thâm niên", "Ki tháng n-1", "Kênh", "File ghi âm cuộc gọi", "Speed to text",
  "Số lần liên lạc IPCC", "Queue IPCC", "Số lần transfer", "Cảm xúc Emotion",
  "Nguyên nhân", "Chi tiết nhận diện", "Nội dung vi phạm", "Chi tiết vi phạm",
  "Nội dung giải trình", "Đề xuất chốt lỗi", "Nhận xét sau giải trình",
  "Kết quả đánh giá BO", "Chốt lỗi vi phạm", "Hành động/ Đề xuất",
  "Nhân viên đánh giá", "Thời gian đánh giá", "Trạng thái giải trình",
  "Chuyển Giải Trình", "Chi Tiết", "Emotion", "KI", "Tháng chấm KI",
  "Điểm chất lượng", "Cấp 1", "Cấp 2", "Cấp 3", "Cấp 4",
  "Ngày phân việc", "Hành động",
];

const searchFirstHeaders = [
  "Số thuê bao", "Phân khúc khách hàng", "Loại hình thuê bao", "Loại dịch vụ", "Gói cước",
  "Thời gian đàm thoại của KH (s)",
  "Nhân viên tiếp nhận", "Đối tác", "Khu vực",
  "Dịch vụ", "Không đồng ý", "Điểm Hài Lòng",
  "Nguyên nhân không hài lòng", "Emotion", "Nguyên nhân", "Chi tiết nhận diện",
  "Queue IPCC", "KI", "Tháng chấm KI", "Điểm chất lượng", "Thâm niên", "Kênh",
  "Cấp 1", "Cấp 2", "Cấp 3", "Cấp 4",
];

const controlHeaders = [
  "Vi phạm nghiệp vụ", "Vi phạm ATTT", "Vi phạm ý thức/ Trách nhiệm",
  "Kết quả đánh giá chung", "Nhân viên kiểm soát", "Trạng thái kiểm soát",
  "Kết quả kiểm soát", "Người giải trình", "Trạng thái giải trình",
];

const viewActionColumn = "__view_action__";

const hiddenResultHeaders = new Set([
  "Loại đối tác", "Loại Khách hàng", "Tổng đài khu vực",
  "Thời gian KH chờ gặp tổng đài", "Thời điểm KH gọi tổng đài",
  "Kết quả khảo sát", "Trạng thái phản hồi", "Điểm đánh giá",
  "Phân loại mức độ hài lòng", "Nguyên nhân KH không đồng ý", "Đóng góp",
  "Đơn vị chịu trách nhiệm", "Nhu cầu khách hàng", "Cấp 1", "Cấp 2",
  "Cấp 3", "Cấp 4", "Mã cuộc gọi", "Mã khiếu nại", "Nhu cầu Cấp 1", "Nhu cầu Cấp 2",
  "Nhu cầu Cấp 3", "Nhu cầu Cấp 4", "Nhóm phản ánh", "Thể loại",
  "Loại phản ánh", "Hình thức tiếp nhận", "Tỉnh (mới)", "Phường/xã (mới)",
  "Ngày xử lý cuối", "Người xử lý cuối", "Nội dung phản ánh", "Nội dung xử lý",
  "Phòng xử lý", "Ngày nhắn tin khảo sát", "Ngày KH phản hồi",
  "Thời gian kết nối", "Ki tháng n-1", "File ghi âm cuộc gọi", "Speed to text",
  "Số lần liên lạc IPCC", "Số lần transfer", "Cảm xúc Emotion",
  "Nội dung vi phạm", "Chi tiết vi phạm", "Nội dung giải trình",
  "Đề xuất chốt lỗi", "Nhận xét sau giải trình", "Kết quả đánh giá BO",
  "Chốt lỗi vi phạm", "Hành động/ Đề xuất", "Nhân viên đánh giá", "Thời gian đánh giá",
  "Chuyển Giải Trình", "Chi Tiết",
]);

const resultHeaders = [
  "STT",
  "Thời gian tiếp nhận",
  ...searchFirstHeaders.filter((header) => !hiddenResultHeaders.has(header)),
  ...allResultHeaders.filter((header) => header !== "STT" && header !== "Line tiếp nhận" && header !== "Ngày tiếp nhận" && header !== "Giờ tiếp nhận" && header !== "Ngày phân việc" && header !== "Hành động" && !hiddenResultHeaders.has(header) && !searchFirstHeaders.includes(header) && !controlHeaders.includes(header)),
  "Line tiếp nhận", "Số lần liên lạc", "Số lần lặp lại", "Khoảng thời gian lặp lại (ngày)",
  ...controlHeaders,
  "Ngày phân việc",
  viewActionColumn,
  "Hành động",
  "",
];

const sampleValues = {
  "Số thuê bao": "961753668",
  "Nhân viên tiếp nhận": "callbot_10.208.70.9",
  "Đối tác": "Đối tác A",
  "Khu vực": "Toàn Quốc",
  "Dịch vụ": "FTTH",
  "Không đồng ý": "Không đồng ý",
  "Điểm Hài Lòng": "5",
  "Nguyên nhân không hài lòng": "Chất lượng dịch vụ",
  Emotion: "Neutral",
  "Queue IPCC": "Queue 01",
  KI: "A",
  "Tháng chấm KI": "Tháng 7",
  "Điểm chất lượng": "85",
  "Cấp 1": "Cấp 1 - A",
  "Cấp 2": "Cấp 2 - A",
  "Cấp 3": "Cấp 3 - A",
  "Cấp 4": "Cấp 4 - A",
  "Thời gian đàm thoại của KH (s)": "38",
  "Thâm niên": "24 tháng",
  "Vi phạm nghiệp vụ": "OK",
  "Vi phạm ATTT": "OK",
  "Vi phạm ý thức/ Trách nhiệm": "OK",
  "Kết quả đánh giá chung": "OK",
  "Nhân viên kiểm soát": "vcx_tvgd_okctuyet1829_cc1",
  "Trạng thái kiểm soát": "Đã kiểm soát",
  "Kết quả kiểm soát": "Đã chốt",
  "Trạng thái giải trình": "Đã phản hồi giải trình",
  "Người giải trình": "hienpt",
  "Ngày phân việc": "27/08/2026",
  "Hình thức survey": "SMS",
  "Phân khúc khách hàng": "Khách hàng VIP",
  "Loại hình thuê bao": "Trả sau",
  "Loại dịch vụ": "FTTH",
  "Gói cước": "SUPERNET1",
  "Tổng công ty": "VCX",
  "Line tiếp nhận": "00008198",
};

function getResultValue(header, row) {
  if (header === "Thời gian tiếp nhận") return "08/03/2025 20:00";
  const originalIndex = allResultHeaders.indexOf(header);
  const value = originalIndex > 0 ? row[originalIndex - 1] : "";
  return value || sampleValues[header] || "Dữ liệu mẫu";
}

function Select({ value, onChange, items = ["Tất Cả"], placeholder }) {
  return (
    <div className="select-wrapper">
      <select value={value} onChange={onChange}>
        {placeholder && <option value="">{placeholder}</option>}
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <ChevronDown className="select-arrow" size={16} />
    </div>
  );
}

function Input({ value, onChange, placeholder = "", date = false }) {
  return (
    <div className="input-wrapper">
      <input value={value} onChange={onChange} placeholder={placeholder} />
      {date && <CalendarDays className="input-icon" size={16} />}
    </div>
  );
}

function App() {
  const [form, setForm] = useState(initialForm);
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const [toast, setToast] = useState("");

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const searchSummary = Object.entries(form).filter(
    ([key, value]) => value !== initialForm[key] && value !== ""
  ).length;

  const reset = () => {
    setForm(initialForm);
    setToast("Đã xóa toàn bộ bộ lọc");
    window.setTimeout(() => setToast(""), 2200);
  };

  const search = () => {
    setToast(`Đang tìm kiếm với ${searchSummary} điều kiện thay đổi`);
    window.setTimeout(() => setToast(""), 2200);
  };

  const exportList = () => {
    const headers = resultHeaders.map((header) => header === viewActionColumn ? "Xem chi tiết" : header || "Bỏ qua");
    const rows = resultRows.map((row, index) => resultHeaders.map((header) => {
      if (header === "STT") return index + 1;
      if (header === "Hành động") return "Kiểm soát";
      if (header === viewActionColumn) return "Xem chi tiết";
      if (header === "") return "Bỏ qua";
      return getResultValue(header, row);
    }));
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }));
    link.download = "danh-sach-ket-qua.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => {
      URL.revokeObjectURL(link.href);
      link.remove();
    }, 1000);
  };

  return (
    <div className="app-shell">
      <main className="main">
        <header className="topbar">
          <div className="keyword-row">
            <Search size={18} />
            <input
              className="keyword-input"
              value={form.keyword}
              onChange={(e) => update("keyword")(e.target.value)}
              placeholder="Tìm kiếm (Số thuê bao, Mã phản ánh, nhân viên...)"
            />
          </div>
          <div className="topbar-actions">
            <button className="icon-btn language" aria-label="Language">
              <Globe2 size={14} />
              <span>VI</span>
            </button>
            <button className="icon-btn" aria-label="Fullscreen">
              <Maximize2 size={17} />
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
          <div className="filters">
            <div className="grid grid-4">
              <FilterField label="Loại báo cáo" className="report-type">
                <Select value={form.reportType} onChange={update("reportType")} items={options.reportType} />
              </FilterField>
              <div className="grid-spacer" />

              <FilterField label="Từ Ngày Tiếp Nhận" required>
                <Input value={form.fromDate} onChange={update("fromDate")} date />
              </FilterField>
              <FilterField label="Từ Giờ">
                <Input value={form.fromTime} onChange={update("fromTime")} />
              </FilterField>
              <FilterField label="Đến Ngày Tiếp Nhận" required>
                <Input value={form.toDate} onChange={update("toDate")} date />
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
              <FilterField label="Không đồng ý">
                <Select value={form.satisfaction} onChange={update("satisfaction")} items={options.satisfaction} />
              </FilterField>
              <FilterField label="Điểm hài lòng">
                <Select value={form.satisfactionPoint} onChange={update("satisfactionPoint")} items={options.satisfactionPoint} />
              </FilterField>
              <FilterField label="Nguyên nhân KH không hài lòng">
                <Select value={form.unhappyReason} onChange={update("unhappyReason")} items={options.unhappyReason} />
              </FilterField>

              <FilterField label="Emotion">
                <Select value={form.emotion} onChange={update("emotion")} items={options.emotion} />
              </FilterField>
              <FilterField label="Queue IPCC">
                <Select value={form.queue} onChange={update("queue")} items={options.queue} />
              </FilterField>
              <FilterField label="KI">
                <Select value={form.ki} onChange={update("ki")} items={options.ki} />
              </FilterField>
              <FilterField label="Tháng chấm KI">
                <Select value={form.customerCareMonth} onChange={update("customerCareMonth")} items={options.customerCareMonth} />
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
              <FilterField label="Trạng thái giải trình">
                <Select value={form.explanationStatus} onChange={update("explanationStatus")} items={options.explanationStatus} />
              </FilterField>
              <FilterField label="Từ Ngày Chia Việc">
                <Input value={form.assignmentFrom} onChange={update("assignmentFrom")} date />
              </FilterField>
              <FilterField label="Đến Ngày Chia Việc">
                <Input value={form.assignmentTo} onChange={update("assignmentTo")} date />
              </FilterField>
              <FilterField label="Người giải trình">
                <Select value={form.explainer} onChange={update("explainer")} items={options.explainer} />
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
                <Trash2 size={14} />
                Xóa bộ lọc
              </button>
              <button className="primary-btn" onClick={search}>
                <Search size={14} />
                Tìm kiếm
              </button>
            </div>
          </div>
        </section>

        <section className="results-section">
          <div className="results-heading">
            <h1>Kết quả tìm kiếm</h1>
            <p>Màn hình hiển thị kết quả tìm kiếm theo các tiêu chí đã chọn</p>
          </div>

          <div className="results-card">
            <div className="results-toolbar">
              <button className="result-btn">Bỏ qua</button>
              <button className="result-btn">Lịch sử chia việc</button>
              <button className="result-btn">Phân chia công việc</button>
              <button className="result-btn">Cấu hình hiển thị</button>
              <button className="result-btn" onClick={exportList}>Xuất file</button>
            </div>

            <div className="results-table-wrap">
              <table className="results-table">
                <thead>
                  <tr>
                    <th className="check-column"><input type="checkbox" aria-label="Chọn tất cả" /></th>
                    {resultHeaders.map((header) => (
                      <th key={header} title={header === viewActionColumn ? "" : header}>{header === viewActionColumn ? "" : header}{header && header !== "Hành động" && header !== viewActionColumn && <span className="sort-mark">↕</span>}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resultRows.map((row, index) => (
                    <tr key={row[1]}>
                      <td className="check-column"><input type="checkbox" aria-label={`Chọn dòng ${index + 1}`} /></td>
                      <td>{index + 1}</td>
                      {resultHeaders.slice(1).map((header) => {
                        const displayValue = getResultValue(header, row);
                        return (
                          <td key={`${row[0]}-${header}`}>
                            {header === "Hành động" ? <a className="action-link" href="#control">Kiểm soát</a> : header === "" ? <button type="button" className="skip-action" onClick={() => setToast("Đã bỏ qua bản ghi")}>Bỏ qua</button> : header === viewActionColumn ? <button type="button" className="view-action" aria-label="Xem chi tiết" onClick={() => setToast("Đang mở chi tiết bản ghi")}><Eye size={18} /></button> : header === "Emotion" ? <Smile className="emotion-icon" aria-label="Cảm xúc bình thường" size={20} /> : displayValue}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="results-footer">
              <span>Bản ghi 1 - 1 của 1 bản ghi.</span>
              <div className="pagination">
                <button aria-label="Trang đầu"><ChevronsLeft size={16} /></button>
                <button aria-label="Trang trước">‹</button>
                <button className="current">1</button>
                <button>2</button>
                <button>3</button>
                <button aria-label="Trang sau">›</button>
                <button aria-label="Trang cuối"><ChevronsRight size={16} /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="advanced-result-screen">
          <div className="advanced-result-heading">
            <h2>KẾT QUẢ TÌM KIẾM FO</h2>
            <button className="result-btn" onClick={exportList}>Xuất file</button>
          </div>
          <div className="advanced-result-card">
            <table className="advanced-result-table">
              <thead>
                <tr>
                  {['STT', 'Nhân Viên Tiếp Nhận', 'Đối Tác', 'Khu Vực', 'Thâm niên', 'Tháng chấm KI', 'Tổng Đánh Giá', 'Số Đồng Ý', 'Tỷ Lệ Hài Lòng (%)'].map((header) => <th key={header}>{header}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td className="advanced-link">Vt_dvkh_oahqtuyen463_cc2</td><td>Hoa Mai</td><td>Đà Nẵng</td><td>24 tháng</td><td></td><td>100</td><td>86</td><td>86</td></tr>
                <tr><td>1</td><td className="advanced-link">Vt_cskh_okchong7118_ccdng</td><td>Hoa Mai</td><td>Đà Nẵng</td><td>18 tháng</td><td></td><td>56</td><td>45</td><td>80.3</td></tr>
              </tbody>
            </table>
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
