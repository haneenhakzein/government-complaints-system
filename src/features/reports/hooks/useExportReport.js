import { toast } from "react-toastify";
import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { exportReportRequest } from "../services/reportsService";

export default function useExportReport() {
  const exportReport = async (reportId, format = "csv", filters = {}) => {
    try {
      const blob = await exportReportRequest(reportId, {
        format,
        ...filters,
      });

      const fileBlob = new Blob([blob], {
        type: format === "pdf" ? "application/pdf" : "text/csv;charset=utf-8;",
      });

      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${reportId}_report.${format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "فشل تصدير التقرير"));
    }
  };

  return { exportReport };
}
