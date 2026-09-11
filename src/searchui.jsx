import React, { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Eye,
  Globe2,
  Maximize2,
  Plus,
  Search,
  Settings,
  Smile,
  Trash2,
  UserRound,
  Users,
  X,
} from "lucide-react";
import FilterField from "./components/FilterField";
import Sidebar from "./components/Sidebar";

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
  service: [
    "Tất Cả",
    "Di động",
    "Cố định",
    "SME",
    "COC",
    "18008000N2",
    "18008000N3",
    "18008000N4",
    "18008000N5",
    "18008000N7",
    "18008000N8",
    "18008000N9",
    "1789N1",
    "1789N2",
    "1789N3-KĐG",
    "1789N5",
    "1789N6",
    "18009000",
    "VDS",
  ],
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

const baseResultRow = [
  "1185007463", "961753668", "SMS", "Khách hàng VIP", "Thường",
  "00008198", "callbot_10.208.70.9", "", "", "", "1", "38",
  "04/05/2026 09:19:05", "", "", "", "", "", "", "", "",
  "Công ty Dịch vụ Khách hàng", "VCX", "", "", "", "", "",
  "20260504091851-JEUAEDJN-385498", "", "", "", "", "", "", "",
  "", "", "", "", "", "",
];

const sampleServiceOptions = [
  "Di động",
  "Cố định",
  "SME",
  "COC",
  "18008000N2",
  "18008000N3",
  "18008000N4",
  "18008000N5",
  "18008000N7",
  "18008000N8",
  "18008000N9",
  "1789N1",
  "1789N2",
  "1789N3-KĐG",
  "1789N5",
  "1789N6",
  "18009000",
  "VDS",
];

const resultRows = Array.from({ length: 1000 }, (_, index) => {
  const rowNumber = index + 1;
  const row = [...baseResultRow];
  const serviceValue = sampleServiceOptions[index % sampleServiceOptions.length];
  row[0] = String(1185007463 + rowNumber);
  row[1] = String(961753668 + rowNumber);
  row[12] = `04/05/2026 09:${String(19 + index).padStart(2, "0")}:05`;
  row[28] = `20260504091851-JEUAEDJN-${385498 + rowNumber}`;
  row[30] = serviceValue;
  return row;
});

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

const controlStaffServiceOptions = {
  main: ["Di động", "Cố định", "SME", "COC", "18008000N5", "18008000N8", "18008000N9", "1789N2", "1789N5", "18009000"],
  sub: ["Di động", "18008000N2", "COC", "18008000N3", "18008000N4", "18008000N7", "Di động, VDS", "1789N1", "1789N3-KĐG", "1789N6", "VDS", "SME"],
};

const controlStaff = [
  { username: "vt_dvkh_oahqtuyen463_cc2", fullName: "Lê Anh Tú", email: "lanttt@viettel.com.vn", mainUnit: "Di động", subUnit: "Di động", status: "Hoạt động" },
  { username: "vt_cskh_okchong7118_ccdng", fullName: "Nguyễn Thị Hà", email: "chongnt@viettel.com.vn", mainUnit: "Cố định", subUnit: "18008000N2", status: "Hoạt động" },
  { username: "vt_dvkh_ngocanh289_cc1", fullName: "Ngọc Anh", email: "ngocanhvt@viettel.com.vn", mainUnit: "SME", subUnit: "COC, 18008000N3", status: "Hoạt động" },
  { username: "vt_cskh_minhquan527_cc2", fullName: "Minh Quân", email: "minhquan@viettel.com.vn", mainUnit: "COC", subUnit: "18008000N4", status: "Hoạt động" },
  { username: "vt_dvkh_thuha304_cc1", fullName: "Thu Hà", email: "thuhatd@viettel.com.vn", mainUnit: "18008000N5", subUnit: "18008000N7", status: "Không hoạt động" },
  { username: "vt_cskh_hoangnam816_cc3", fullName: "Hoàng Nam", email: "hoangnam@viettel.com.vn", mainUnit: "18008000N8", subUnit: "Di động, VDS", status: "Hoạt động" },
  { username: "vt_dvkh_phuonglinh492_cc2", fullName: "Phương Linh", email: "phuonglinh@viettel.com.vn", mainUnit: "18008000N9", subUnit: "1789N1", status: "Hoạt động" },
  { username: "vt_cskh_tuananh638_cc1", fullName: "Tuấn Anh", email: "tuananh@viettel.com.vn", mainUnit: "1789N2", subUnit: "1789N3-KĐG", status: "Hoạt động" },
  { username: "vt_dvkh_khanhvy175_cc2", fullName: "Khánh Vy", email: "khanhvy@viettel.com.vn", mainUnit: "1789N5", subUnit: "1789N6", status: "Không hoạt động" },
  { username: "vt_cskh_quanghuy903_cc3", fullName: "Quang Huy", email: "quanghuy@viettel.com.vn", mainUnit: "18009000", subUnit: "VDS, SME", status: "Hoạt động" },
  { username: "vt_dvkh_hieuvu185_cc1", fullName: "Hiếu Vũ", email: "hieuvu@viettel.com.vn", mainUnit: "Di động", subUnit: "Di động", status: "Hoạt động" },
  { username: "vt_cskh_thanhmai226_cc2", fullName: "Thành Mai", email: "thanhmai@viettel.com.vn", mainUnit: "Di động", subUnit: "Di động", status: "Hoạt động" },
  { username: "vt_dvkh_quynhnhu541_cc3", fullName: "Quỳnh Như", email: "quynhnhu@viettel.com.vn", mainUnit: "Di động", subUnit: "Di động", status: "Hoạt động" },
  { username: "vt_cskh_dangkhoa742_cc1", fullName: "Đăng Khoa", email: "dangkhoa@viettel.com.vn", mainUnit: "Cố định", subUnit: "18008000N2", status: "Hoạt động" },
  { username: "vt_dvkh_hoangyen883_cc2", fullName: "Hoàng Yến", email: "hoangyen@viettel.com.vn", mainUnit: "Cố định", subUnit: "18008000N2", status: "Hoạt động" },
  { username: "vt_cskh_tuanlinh913_cc3", fullName: "Tuấn Linh", email: "tuanlinh@viettel.com.vn", mainUnit: "SME", subUnit: "COC", status: "Hoạt động" },
  { username: "vt_dvkh_minhthao471_cc1", fullName: "Minh Thảo", email: "minhthao@viettel.com.vn", mainUnit: "SME", subUnit: "18008000N3", status: "Hoạt động" },
  { username: "vt_cskh_haianh386_cc2", fullName: "Hai Anh", email: "haianh@viettel.com.vn", mainUnit: "COC", subUnit: "18008000N4", status: "Hoạt động" },
  { username: "vt_dvkh_trangloan604_cc3", fullName: "Trang Loan", email: "trangloan@viettel.com.vn", mainUnit: "COC", subUnit: "18008000N4", status: "Hoạt động" },
  { username: "vt_cskh_namson728_cc1", fullName: "Nam Sơn", email: "namson@viettel.com.vn", mainUnit: "18008000N5", subUnit: "18008000N7", status: "Hoạt động" },
  { username: "vt_dvkh_bichthu670_cc2", fullName: "Bích Thư", email: "bichthu@viettel.com.vn", mainUnit: "18008000N8", subUnit: "Di động, VDS", status: "Hoạt động" },
  { username: "vt_cskh_kimchi751_cc3", fullName: "Kim Chi", email: "kimchi@viettel.com.vn", mainUnit: "18009000", subUnit: "VDS, SME", status: "Hoạt động" },
  { username: "vt_dvkh_anhthu839_cc1", fullName: "Anh Thư", email: "anhthu@viettel.com.vn", mainUnit: "1789N2", subUnit: "1789N3-KĐG", status: "Hoạt động" },
  { username: "vt_cskh_huyentrang915_cc2", fullName: "Huyền Trang", email: "huyentrang@viettel.com.vn", mainUnit: "1789N5", subUnit: "1789N6", status: "Hoạt động" },
  { username: "vt_dvkh_vuminh123_cc3", fullName: "Vũ Minh", email: "vuminh@viettel.com.vn", mainUnit: "18008000N9", subUnit: "1789N1", status: "Hoạt động" },
  { username: "vt_cskh_thuyduong544_cc1", fullName: "Thùy Dương", email: "thuyduong@viettel.com.vn", mainUnit: "18009000", subUnit: "VDS, SME", status: "Hoạt động" },
  { username: "vt_dvkh_trunguong218_cc2", fullName: "Trung Ngượng", email: "trunguong@viettel.com.vn", mainUnit: "Di động", subUnit: "Di động", status: "Hoạt động" },
  { username: "vt_cskh_hongnhung511_cc3", fullName: "Hồng Nhung", email: "hongnhung@viettel.com.vn", mainUnit: "Di động", subUnit: "Di động", status: "Hoạt động" },
  { username: "vt_dvkh_khanhlinh472_cc1", fullName: "Khánh Linh", email: "khanhlinh@viettel.com.vn", mainUnit: "Cố định", subUnit: "18008000N2", status: "Hoạt động" },
  { username: "vt_cskh_xuanmai804_cc2", fullName: "Xuân Mai", email: "xuanmai@viettel.com.vn", mainUnit: "SME", subUnit: "COC", status: "Hoạt động" },
  { username: "vt_dvkh_phatdat607_cc3", fullName: "Phát Đạt", email: "phatdat@viettel.com.vn", mainUnit: "18008000N8", subUnit: "Di động, VDS", status: "Hoạt động" },
];

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

function App({ embedded = false }) {
  const [form, setForm] = useState(initialForm);
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [toast, setToast] = useState("");
  const [controlStaffOpen, setControlStaffOpen] = useState(false);
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [assignmentPrimaryQuota, setAssignmentPrimaryQuota] = useState("0");
  const [assignmentSecondaryQuota, setAssignmentSecondaryQuota] = useState("0");
  const [assignmentRows, setAssignmentRows] = useState([
    { staffName: "", mainService: "", mainQty: "", subService: "", subQty: "0", subServices: [{ service: "", qty: "0" }] },
  ]);
  const [controlStaffMode, setControlStaffMode] = useState("list");
  const [staffRows, setStaffRows] = useState(controlStaff.filter((staff) => staff.status === "Hoạt động"));
  const [staffForm, setStaffForm] = useState({ username: "", mainUnit: "", subUnit: "", status: "", email: "" });

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

  const updateStaffForm = (key) => (event) => {
    setStaffForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const addControlStaff = (event) => {
    event.preventDefault();
    setStaffRows((current) => [...current, {
      username: staffForm.username,
      email: staffForm.email,
      mainUnit: staffForm.mainUnit,
      subUnit: staffForm.subUnit,
      status: staffForm.status,
    }]);
    setStaffForm({ username: "", mainUnit: "", subUnit: "", status: "", email: "" });
    setControlStaffMode("list");
    setToast("Đã thêm nhân viên kiểm soát");
    window.setTimeout(() => setToast(""), 2200);
  };

  const getSelectedServiceBreakdown = () => {
    const selectedRecords = resultRows.filter((row) => selectedRows.has(row[1]));
    const serviceCounts = selectedRecords.reduce((map, row) => {
      const service = row[30] || "";
      if (!service) return map;
      map[service] = (map[service] || 0) + 1;
      return map;
    }, {});

    return Object.entries(serviceCounts).map(([service, count]) => ({ service, count }));
  };

  const getStaffSecondaryServices = (staff) => {
    if (!staff) return [];

    const rawValues = Array.isArray(staff.subUnit)
      ? staff.subUnit
      : String(staff.subUnit || "")
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean);

    const fallbackValues = controlStaffServiceOptions.sub.filter((service) => service !== staff.mainUnit);
    const uniqueValues = [...new Set([
      ...rawValues,
      ...fallbackValues,
    ].filter((value) => value && value !== staff.mainUnit).map((value) => value.trim()))];

    return uniqueValues.slice(0, 3);
  };

  const getAssignmentServiceSummary = () => {
    return getSelectedServiceBreakdown().map(({ service, count }) => {
      const assignedCount = assignmentRows
        .filter((row) => row.mainService === service && row.staffName)
        .reduce((total, row) => total + Number(row.mainQty || 0), 0);

      const remaining = Math.max(0, count - assignedCount);

      return {
        service,
        count,
        assignedCount,
        remaining,
      };
    });
  };

  const getRowSubServices = (row) => {
    if (Array.isArray(row?.subServices) && row.subServices.length) {
      return row.subServices;
    }
    if (row?.subService) {
      return [{ service: row.subService, qty: row.subQty || "0" }];
    }
    return [{ service: "", qty: "0" }];
  };

  const totalAssignedWork = assignmentRows.reduce((total, row) => {
    const mainQty = Number(row.mainQty || 0);
    const subQty = getRowSubServices(row).reduce((sum, item) => sum + Number(item.qty || 0), 0);
    return total + mainQty + subQty;
  }, 0);

  const getSubServiceOptionsForStaff = (staff) => {
    return getStaffSecondaryServices(staff);
  };

  const getAvailableSubServiceOptionsForRow = (row) => {
    const selectedStaff = staffRows.find((staff) => staff.username === row.staffName);
    const usedServices = new Set(
      getRowSubServices(row)
        .filter((item) => item.service)
        .map((item) => item.service)
    );

    return getSubServiceOptionsForStaff(selectedStaff).filter((service) => !usedServices.has(service));
  };

  const distributeServiceCountAcrossSelectedStaff = (rows, serviceName) => {
    const totalServiceCount = getSelectedServiceBreakdown().find((item) => item.service === serviceName)?.count || 0;
    const selectedStaffNames = [...new Set(
      rows
        .filter((row) => row.staffName && row.mainService === serviceName)
        .map((row) => row.staffName)
    )];

    if (!selectedStaffNames.length || totalServiceCount <= 0) {
      return rows;
    }

    const base = Math.floor(totalServiceCount / selectedStaffNames.length);
    const remainder = totalServiceCount % selectedStaffNames.length;
    const distributionMap = new Map();

    selectedStaffNames.forEach((staffName, index) => {
      distributionMap.set(staffName, base + (index < remainder ? 1 : 0));
    });

    return rows.map((row) => {
      if (!row.staffName || row.mainService !== serviceName) return row;
      const assignedQty = distributionMap.get(row.staffName) ?? 0;
      return {
        ...row,
        mainQty: String(assignedQty),
        subQty: row.subService ? String(assignedQty) : "",
      };
    });
  };

  const getAvailableStaffOptionsForRow = (currentIndex) => {
    const usedUsernames = new Set(
      assignmentRows
        .map((row, index) => (index !== currentIndex ? row.staffName : ""))
        .filter(Boolean)
    );

    return staffRows.filter((staff) => staff.username === assignmentRows[currentIndex]?.staffName || !usedUsernames.has(staff.username));
  };

  const buildAutoAssignmentRows = () => {
    const selectedServiceBreakdown = getSelectedServiceBreakdown();
    if (!selectedServiceBreakdown.length) {
      return [{ staffName: "", mainService: "", mainQty: "", subService: "", subQty: "" }];
    }

    const rows = [];
    const staffByMainService = staffRows.reduce((map, staff) => {
      if (!map[staff.mainUnit]) map[staff.mainUnit] = [];
      map[staff.mainUnit].push(staff);
      return map;
    }, {});

    selectedServiceBreakdown.forEach(({ service, count }) => {
      const matchingStaff = (staffByMainService[service] || []).filter(Boolean);
      if (!matchingStaff.length) return;

      const base = Math.floor(count / matchingStaff.length);
      const remainder = count % matchingStaff.length;

      matchingStaff.forEach((staff, index) => {
        const assignedCount = base + (index < remainder ? 1 : 0);
        if (assignedCount <= 0) return;

        rows.push({
          staffName: staff.username,
          mainService: staff.mainUnit,
          mainQty: String(assignedCount),
          subService: Array.isArray(staff.subUnit) ? staff.subUnit[0] || "" : staff.subUnit || "",
          subQty: Array.isArray(staff.subUnit) && staff.subUnit[0] ? String(assignedCount) : "0",
          subServices: (Array.isArray(staff.subUnit) ? staff.subUnit : [staff.subUnit || ""]).filter(Boolean).slice(0, 3).map((service) => ({ service, qty: String(assignedCount) })),
        });
      });
    });

    return rows.length ? rows : [{ staffName: "", mainService: "", mainQty: "", subService: "", subQty: "" }];
  };

  const openAssignmentModal = () => {
    if (!selectedRows.size) {
      setToast("Vui lòng chọn ít nhất 1 bản ghi để phân chia công việc");
      window.setTimeout(() => setToast(""), 2200);
      return;
    }
    setAssignmentRows([{ staffName: "", mainService: "", mainQty: "", subService: "", subQty: "0", subServices: [{ service: "", qty: "0" }] }]);
    setAssignmentModalOpen(true);
  };

  const resetAssignmentModal = () => {
    setAssignmentPrimaryQuota("");
    setAssignmentSecondaryQuota("");
    setAssignmentRows([{ staffName: "", mainService: "", mainQty: "", subService: "", subQty: "0", subServices: [{ service: "", qty: "0" }] }]);
  };

  const deleteControlStaff = (username) => {
    if (!window.confirm(`Bạn có chắc muốn xoá nhân viên ${username}?`)) return;
    setStaffRows((current) => current.filter((staff) => staff.username !== username));
    setToast("Đã xoá nhân viên kiểm soát");
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

  const downloadDetailedReports = () => {
    const selectedResults = selectedRows.size
      ? resultRows.filter((row) => selectedRows.has(row[1]))
      : resultRows;
    const headers = allResultHeaders;
    const rows = selectedResults.map((row, index) => headers.map((header) => {
      if (header === "STT") return index + 1;
      return getResultValue(header, row);
    }));
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }));
    link.download = `bao-cao-chi-tiet-${selectedResults.length}-ban-ghi.csv`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => {
      URL.revokeObjectURL(link.href);
      link.remove();
    }, 1000);
    setToast(`Đã xuất báo cáo của ${selectedResults.length} bản ghi`);
    window.setTimeout(() => setToast(""), 2200);
  };

  const toggleRow = (rowId) => {
    setSelectedRows((current) => {
      const next = new Set(current);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      return next;
    });
  };

  const toggleAllRows = () => {
    setSelectedRows((current) => current.size === resultRows.length
      ? new Set()
      : new Set(resultRows.map((row) => row[1])));
  };

  const totalPages = Math.ceil(resultRows.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageRows = resultRows.slice(startIndex, endIndex);

  return (
    <div className={`app-shell ${embedded ? "embedded-search-shell" : ""}`}>
      {!embedded && <Sidebar
        activeItem={controlStaffOpen ? "Quản Lý Nhân Viên Kiểm Soát" : "Hài Lòng"}
        onManageControlStaff={() => setControlStaffOpen(true)}
      />}
      <main className="main">
        {!controlStaffOpen && <header className="topbar">
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
        </header>}

        {!controlStaffOpen && <>
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
              <button className="result-btn" onClick={() => setControlStaffOpen(true)}>
                <Users size={14} />
                Quản lý nhân viên kiểm soát
              </button>
              <button className="result-btn">Bỏ qua</button>
              <button className="result-btn">Lịch sử chia việc</button>
              <button className="result-btn" onClick={openAssignmentModal} disabled={selectedRows.size === 0}>Phân chia công việc</button>
              <button className="result-btn">Cấu hình hiển thị</button>
              <button className="result-btn icon-only-btn" onClick={exportList} aria-label="Tải xuống" title="Tải xuống">
                <Download size={14} />
              </button>
              <button
                className="result-btn download-btn"
                onClick={downloadDetailedReports}
                title={selectedRows.size ? "Xuất báo cáo các bản ghi đã chọn" : "Xuất báo cáo toàn bộ bản ghi"}
              >
                <Download size={14} />
                Xuất báo cáo
              </button>
            </div>

            <div className="results-table-wrap">
              <table className="results-table">
                <thead>
                  <tr>
                    <th className="check-column"><input type="checkbox" aria-label="Chọn tất cả" checked={resultRows.length > 0 && selectedRows.size === resultRows.length} onChange={toggleAllRows} /></th>
                    {resultHeaders.map((header) => (
                      <th key={header} title={header === viewActionColumn ? "" : header}>{header === viewActionColumn ? "" : header}{header && header !== "Hành động" && header !== viewActionColumn && <span className="sort-mark">↕</span>}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentPageRows.map((row, index) => (
                    <tr key={row[1]}>
                      <td className="check-column"><input type="checkbox" aria-label={`Chọn dòng ${startIndex + index + 1}`} checked={selectedRows.has(row[1])} onChange={() => toggleRow(row[1])} /></td>
                      <td>{startIndex + index + 1}</td>
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
              <span>Bản ghi {Math.min(startIndex + 1, resultRows.length)} - {Math.min(endIndex, resultRows.length)} của {resultRows.length} bản ghi.</span>
              <div className="pagination">
                <button aria-label="Trang đầu" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}><ChevronsLeft size={16} /></button>
                <button aria-label="Trang trước" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1}>‹</button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                  const pageNumber = Math.min(Math.max(1, currentPage - 2) + index, totalPages);
                  return (
                    <button
                      key={pageNumber}
                      className={pageNumber === currentPage ? "current" : ""}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button aria-label="Trang sau" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages}>›</button>
                <button aria-label="Trang cuối" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}><ChevronsRight size={16} /></button>
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
        </>}

        {controlStaffOpen && (
          <section className="control-staff-screen" aria-labelledby="control-staff-title">
            {controlStaffMode === "add" ? (
              <form className="add-staff-screen" onSubmit={addControlStaff}>
                <h1 id="control-staff-title">Thêm nhân viên kiểm soát</h1>
                <div className="staff-form-grid">
                  <label><span>Nhân Viên Kiểm Soát <b>*</b></span><input value={staffForm.username} onChange={updateStaffForm("username")} required /></label>
                  <label><span>Dịch Vụ Chính <b>*</b></span><select value={staffForm.mainUnit} onChange={updateStaffForm("mainUnit")} required><option value="">Chọn dịch vụ</option>{controlStaffServiceOptions.main.map((service) => <option key={service}>{service}</option>)}</select></label>
                  <label><span>Dịch Vụ Phụ</span><select value={staffForm.subUnit} onChange={updateStaffForm("subUnit")}><option value="">Chọn dịch vụ phụ</option>{controlStaffServiceOptions.sub.map((service) => <option key={service}>{service}</option>)}</select></label>
                  <label><span>Trạng Thái <b>*</b></span><select value={staffForm.status} onChange={updateStaffForm("status")} required><option value="">Chọn trạng thái</option><option>Hoạt Động</option><option>Không Hoạt Động</option></select></label>
                  <label><span>Email</span><input type="email" value={staffForm.email} onChange={updateStaffForm("email")} /></label>
                </div>
                <div className="add-staff-actions">
                  <button type="button" className="secondary-btn" onClick={() => setControlStaffMode("list")}>Hủy</button>
                  <button type="submit" className="primary-btn">Lưu nhân viên</button>
                </div>
              </form>
            ) : (
            <>
            <h1 id="control-staff-title">Danh sách nhân viên kiểm soát</h1>
            <div className="control-staff-actions">
              <input className="staff-search" placeholder="Tìm kiếm nhân viên theo từ khoá hoặc user account" />
              <button className="staff-add-btn" onClick={() => setControlStaffMode("add")}>
                <Plus size={17} />
                Thêm nhân viên
              </button>
            </div>
            <div className="control-staff-screen-card">
              <table className="control-staff-table">
                <thead>
                  <tr>
                    <th>User account</th>
                    <th>Email</th>
                    <th>DV chính</th>
                    <th>DV phụ</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {staffRows.map((staff) => (
                    <tr key={staff.username}>
                      <td>{staff.username}</td>
                      <td>{staff.email}</td>
                      <td>{staff.mainUnit}</td>
                      <td>{staff.subUnit}</td>
                      <td><span className="staff-status active">{staff.status}</span></td>
                      <td className="staff-actions-cell">
                        <button className="staff-action" onClick={() => setToast(`Chỉnh sửa ${staff.username}`)}>Chỉnh sửa</button>
                        <button className="staff-delete-action" onClick={() => deleteControlStaff(staff.username)}>Xoá</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </>
            )}
          </section>
        )}

        {assignmentModalOpen && (
          <div className="assignment-modal-backdrop" onClick={() => setAssignmentModalOpen(false)}>
            <div className="assignment-modal" onClick={(event) => event.stopPropagation()}>
              <div className="assignment-header">
                <h2>PHÂN CHIA CÔNG VIỆC</h2>
                <button type="button" className="modal-close" aria-label="Đóng" onClick={() => setAssignmentModalOpen(false)}>
                  <X size={21} />
                </button>
              </div>

              <div className="assignment-body">
                <div className="assignment-top-controls">
                  <label className="assignment-field">
                    <span>Số lượng cho mỗi nhân viên (chính)</span>
                    <input value={assignmentPrimaryQuota} onChange={(event) => setAssignmentPrimaryQuota(event.target.value)} />
                  </label>
                  <label className="assignment-field">
                    <span>Số lượng cho mỗi nhân viên (phụ)</span>
                    <input value={assignmentSecondaryQuota} onChange={(event) => setAssignmentSecondaryQuota(event.target.value)} />
                  </label>
                  <button type="button" className="assignment-apply-btn">Áp dụng</button>
                </div>

                <div className="assignment-grid">
                  <div className="assignment-row assignment-row-header">
                    <div className="assignment-label">Nhân Viên Kiểm Soát <span className="required-star">*</span></div>
                    <div className="assignment-label">Dịch Vụ Chính <span className="required-star">*</span></div>
                    <div className="assignment-label">Số Lượng Chính <span className="required-star">*</span></div>
                    <div className="assignment-label">Dịch Vụ Phụ &amp; Số Lượng</div>
                  </div>

                  {assignmentRows.map((row, index) => (
                    <div className="assignment-row" key={`assignment-row-${index}`}>
                      <div className="assignment-cell select-cell">
                        <select value={row.staffName} onChange={(event) => {
                          const nextStaffName = event.target.value;
                          const alreadyUsed = assignmentRows.some((item, itemIndex) => itemIndex !== index && item.staffName === nextStaffName);

                          if (nextStaffName && alreadyUsed) {
                            setToast("Nhân viên này đã được chọn ở dòng khác");
                            window.setTimeout(() => setToast(""), 2200);
                            return;
                          }

                          const selectedStaff = staffRows.find((staff) => staff.username === nextStaffName);
                          const nextMainService = selectedStaff?.mainUnit || "";
                          const secondaryOptions = getSubServiceOptionsForStaff(selectedStaff);

                          setAssignmentRows((current) => {
                            const updatedRows = current.map((item, itemIndex) => itemIndex === index ? {
                              ...item,
                              staffName: nextStaffName,
                              mainService: nextMainService,
                              subService: "",
                              mainQty: "",
                              subQty: "0",
                              subServices: [{ service: "", qty: "0" }],
                            } : item);

                            const allServices = [...new Set(updatedRows.filter((item) => item.mainService).map((item) => item.mainService))];
                            let distributedRows = updatedRows;
                            allServices.forEach((serviceName) => {
                              distributedRows = distributeServiceCountAcrossSelectedStaff(distributedRows, serviceName);
                            });

                            return distributedRows;
                          });
                        }}>
                          <option value="">-- Chọn nhân viên --</option>
                          {getAvailableStaffOptionsForRow(index).map((staff) => (
                            <option key={staff.username} value={staff.username}>
                              {staff.username}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="assignment-cell select-cell assignment-locked-select">
                        <select value={row.mainService} disabled>
                          <option value="">-- Chọn dịch vụ --</option>
                          {row.mainService ? (
                            <option value={row.mainService}>{row.mainService}</option>
                          ) : null}
                        </select>
                      </div>
                      <div className="assignment-cell input-cell">
                        <input value={row.mainQty} onChange={(event) => setAssignmentRows((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, mainQty: event.target.value } : item))} placeholder="Nhập số" />
                      </div>
                      <div className="assignment-cell select-cell">
                        <div className="assignment-subservice-stack">
                          {getRowSubServices(row).map((subItem, subIndex) => (
                            <div key={`subservice-${index}-${subIndex}`} className="assignment-subservice-row">
                              <div className="assignment-subservice-select-wrap">
                                <select
                                  value={subItem.service}
                                  onChange={(event) => {
                                    const nextValue = event.target.value;
                                    setAssignmentRows((current) => current.map((item, itemIndex) => itemIndex === index ? {
                                      ...item,
                                      subService: nextValue,
                                      subQty: nextValue ? String(item.mainQty || 0) : "0",
                                      subServices: getRowSubServices(item).map((entry, entryIndex) => entryIndex === subIndex ? { ...entry, service: nextValue, qty: nextValue ? String(item.mainQty || 0) : "0" } : entry),
                                    } : item));
                                  }}
                                  disabled={!row.staffName || !getSubServiceOptionsForStaff(staffRows.find((staff) => staff.username === row.staffName)).length}
                                >
                                  <option value="">-- Chọn dịch vụ --</option>
                                  {getSubServiceOptionsForStaff(staffRows.find((staff) => staff.username === row.staffName)).map((service) => (
                                    <option key={service} value={service} disabled={getRowSubServices(row).some((entry, entryIndex) => entryIndex !== subIndex && entry.service === service)}>
                                      {service}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="assignment-subservice-qty-wrap">
                                <span className="assignment-subservice-label">SL</span>
                                <input
                                  value={subItem.qty}
                                  onChange={(event) => setAssignmentRows((current) => current.map((item, itemIndex) => itemIndex === index ? {
                                    ...item,
                                    subQty: event.target.value,
                                    subServices: getRowSubServices(item).map((entry, entryIndex) => entryIndex === subIndex ? { ...entry, qty: event.target.value } : entry),
                                  } : item))}
                                  placeholder="Số"
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="assignment-add-subservice"
                            disabled={!row.staffName || !getAvailableSubServiceOptionsForRow(row).length}
                            onClick={() => setAssignmentRows((current) => current.map((item, itemIndex) => itemIndex === index ? {
                              ...item,
                              subServices: [...getRowSubServices(item), { service: "", qty: "0" }],
                              subService: getRowSubServices(item)[0]?.service || "",
                              subQty: getRowSubServices(item)[0]?.qty || "0",
                            } : item))}
                            aria-label="Thêm dịch vụ phụ"
                            title="Thêm dịch vụ phụ"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="assignment-add-row"
                    onClick={() => setAssignmentRows((current) => [...current, { staffName: "", mainService: "", mainQty: "", subService: "", subQty: "" }])}
                    aria-label="Thêm hàng"
                  >
                    <Plus size={22} />
                  </button>
                </div>

                <div className="assignment-summary">
                  <div className="assignment-summary-box">
                    <label>Tổng số việc cần phân chia</label>
                    <input value={selectedRows.size} readOnly />
                  </div>
                  <div className="assignment-summary-box">
                    <label>Tổng số việc được giao</label>
                    <input value={totalAssignedWork} readOnly />
                  </div>
                </div>

                <div className="assignment-table-section">
                  <h3>Thông kê theo dịch vụ</h3>
                  <table className="assignment-table">
                    <thead>
                      <tr>
                        <th>Dịch vụ</th>
                        <th>Cần phân chia</th>
                        <th>Đã giao</th>
                        <th>Thừa / Thiếu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAssignmentServiceSummary().map(({ service, count, assignedCount, remaining }) => (
                        <tr key={service}>
                          <td>{service}</td>
                          <td>{count}</td>
                          <td>{assignedCount}</td>
                          <td className={remaining > 0 ? "diff-negative" : "diff-zero"}>{remaining}</td>
                        </tr>
                      ))}
                      {!getAssignmentServiceSummary().length && (
                        <tr>
                          <td colSpan="4">Chưa có dịch vụ nào được chọn</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="assignment-actions">
                  <button type="button" className="secondary-btn" onClick={() => setAssignmentModalOpen(false)}>Hủy</button>
                  <button type="button" className="secondary-btn" onClick={resetAssignmentModal}>Đặt lại</button>
                  <button type="button" className="primary-btn" onClick={() => { setToast("Đã phân chia công việc"); setAssignmentModalOpen(false); window.setTimeout(() => setToast(""), 2200); }}>Phân chia</button>
                </div>
              </div>
            </div>
          </div>
        )}

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
