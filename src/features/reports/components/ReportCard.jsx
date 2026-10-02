import React from "react";
import "./Reports.css";

/* 🔹 تعريب أسماء التقارير */
const REPORT_NAMES = {
  users: "تقرير المستخدمين",
  complaints: "تقرير الشكاوى",
  audit_logs: "تقرير سجلات التدقيق",
  statistics: "تقرير الإحصائيات",
};

/* 🔹 تعريب الفلاتر */
const FILTER_TRANSLATIONS = {
  role: "الدور",
  status: "الحالة",
  from_date: "من تاريخ",
  to_date: "إلى تاريخ",
  entity_id: "الجهة",
  user_id: "المستخدم",
  action: "الإجراء",
  is_locked: "محظور",
};

/* 🔹 تعريب الصيغ */
const FORMAT_TRANSLATIONS = {
  csv: "تصدير CSV",
  pdf: "تصدير PDF",
};

const ReportCard = ({ report, onExport }) => {
  return (
    <div className="report-card">
      <div className="report-card-header">
        <h3>{REPORT_NAMES[report.id] || report.name}</h3>
        <span className="report-id">تقرير</span>
      </div>

      <p className="report-description">{report.description}</p>

      {report.filters.length > 0 && (
        <div className="report-filters">
          <span>الفلاتر:</span>
          {report.filters.map((filter) => (
            <span key={filter} className="filter-chip">
              {FILTER_TRANSLATIONS[filter] || filter}
            </span>
          ))}
        </div>
      )}

      <div className="report-actions">
        {report.formats.map((format) => (
          <button
            key={format}
            className={`export-btn ${format}`}
            onClick={() => onExport(report, format)}
          >
            {FORMAT_TRANSLATIONS[format] || format.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportCard;
