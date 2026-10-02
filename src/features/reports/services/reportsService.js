import apiClient from "@/common/services/apiClient";
import { ENDPOINTS } from "@/common/constants/endpoints";

export async function getReports() {
  const response = await apiClient.get(ENDPOINTS.REPORTS.LIST);
  const list = response.data?.data;
  return Array.isArray(list) ? list : [];
}

export async function exportReportRequest(reportId, payload) {
  const endpoint = ENDPOINTS.REPORTS.EXPORT[reportId];

  if (!endpoint) {
    throw new Error("Unsupported report type");
  }

  const response = await apiClient.post(endpoint, payload, {
    responseType: "blob",
  });

  return response.data;
}
