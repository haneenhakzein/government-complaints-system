import { useState } from "react";
import useReports from "../hooks/useReports";
import useExportReport from "../hooks/useExportReport";
import { REPORT_ROLE_OPTIONS, REPORT_STATUS_OPTIONS } from "../constants/reportFilters";
import ReportCard from "./ReportCard";
import "./Reports.css";

export default function ReportsView() {
  const { reports, loading, error } = useReports();
  const { exportReport } = useExportReport();

  const [showComplaintsModal, setShowComplaintsModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [usersExportFormat, setUsersExportFormat] = useState("csv");
  const [showAuditLogsModal, setShowAuditLogsModal] = useState(false);
  const [auditExportFormat, setAuditExportFormat] = useState("csv");
  const [auditFromDate, setAuditFromDate] = useState("");
  const [auditToDate, setAuditToDate] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [role, setRole] = useState("citizen");

  const closeAllModals = () => {
    setShowComplaintsModal(false);
    setShowUsersModal(false);
    setShowAuditLogsModal(false);
    setStatus("");
    setFromDate("");
    setToDate("");
    setRole("citizen");
    setAuditFromDate("");
    setAuditToDate("");
  };

  const handleExport = (report, format) => {
    if (report.id === "complaints" && format === "csv") {
      setShowComplaintsModal(true);
      return;
    }

    if (report.id === "users") {
      setUsersExportFormat(format);
      setShowUsersModal(true);
      return;
    }

    if (report.id === "audit_logs") {
      setAuditExportFormat(format);
      setShowAuditLogsModal(true);
      return;
    }

    exportReport(report.id, format);
  };

  const handleComplaintsExport = () => {
    const filters = {};
    if (status) filters.status = status;
    if (fromDate) filters.from_date = fromDate;
    if (toDate) filters.to_date = toDate;

    exportReport("complaints", "csv", filters);
    closeAllModals();
  };

  const handleUsersExport = () => {
    exportReport("users", usersExportFormat, { role });
    closeAllModals();
  };

  const handleAuditLogsExport = () => {
    const filters = {};
    if (auditFromDate) filters.from_date = auditFromDate;
    if (auditToDate) filters.to_date = auditToDate;

    exportReport("audit_logs", auditExportFormat, filters);
    closeAllModals();
  };

  if (loading) return <p>جاري تحميل التقارير...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h1>التقارير</h1>
        <p>تصدير التقارير الرسمية بصيغة CSV أو PDF</p>
      </div>

      <div className="reports-grid">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} onExport={handleExport} />
        ))}
      </div>

      {showComplaintsModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>فلترة تقرير الشكاوى</h2>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">كل الحالات</option>
              {REPORT_STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            <div className="modal-actions">
              <button onClick={closeAllModals} className="btn-cancel">
                إلغاء
              </button>
              <button onClick={handleComplaintsExport} className="btn-confirm">
                تصدير CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {showUsersModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>فلترة تقرير المستخدمين</h2>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              {REPORT_ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="modal-actions">
              <button onClick={closeAllModals} className="btn-cancel">
                إلغاء
              </button>
              <button onClick={handleUsersExport} className="btn-confirm">
                تصدير {usersExportFormat.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAuditLogsModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>فلترة تقرير سجلات التدقيق</h2>
            <input
              type="date"
              value={auditFromDate}
              onChange={(e) => setAuditFromDate(e.target.value)}
            />
            <input
              type="date"
              value={auditToDate}
              onChange={(e) => setAuditToDate(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={closeAllModals} className="btn-cancel">
                إلغاء
              </button>
              <button onClick={handleAuditLogsExport} className="btn-confirm">
                تصدير {auditExportFormat.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
