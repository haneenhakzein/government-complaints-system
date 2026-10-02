import apiClient from "@/common/services/apiClient";
import { ENDPOINTS } from "@/common/constants/endpoints";
import { mapComplaintList } from "../mappers/complaintMapper";

export async function getComplaints(page = 1) {
  const response = await apiClient.get(ENDPOINTS.COMPLAINTS.LIST(page));
  return mapComplaintList(response.data?.data);
}

export async function getComplaintStatusCounts() {
  const response = await apiClient.get(ENDPOINTS.COMPLAINTS.STATUS_COUNTS);
  return response.data;
}

export async function reserveComplaintRequest(id) {
  const response = await apiClient.post(ENDPOINTS.COMPLAINTS.RESERVE(id));
  return response.data;
}

export async function updateComplaintStatusRequest(id, data) {
  const response = await apiClient.put(ENDPOINTS.COMPLAINTS.STATUS(id), data);
  return response.data;
}

export async function deleteComplaintRequest(id) {
  const response = await apiClient.delete(ENDPOINTS.COMPLAINTS.BY_ID(id));
  return response.data;
}

export async function getComplaintNotes(complaintId) {
  const response = await apiClient.get(ENDPOINTS.COMPLAINTS.NOTES(complaintId));
  return response.data;
}

export async function addComplaintNoteRequest(complaintId, payload) {
  const response = await apiClient.post(ENDPOINTS.COMPLAINTS.NOTES(complaintId), payload);
  return response.data;
}

export async function getComplaintHistory(complaintId) {
  const response = await apiClient.get(ENDPOINTS.COMPLAINTS.HISTORY(complaintId));
  return response.data;
}

export async function getComplaintAttachments(complaintId) {
  const response = await apiClient.get(ENDPOINTS.COMPLAINTS.ATTACHMENTS(complaintId));
  return response.data;
}

export async function uploadComplaintAttachment(complaintId, formData) {
  const response = await apiClient.post(
    ENDPOINTS.COMPLAINTS.ATTACHMENTS(complaintId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function viewAttachment(filePath) {
  const response = await apiClient.get(ENDPOINTS.ATTACHMENTS.VIEW, {
    params: { path: filePath },
    responseType: "blob",
  });
  return response.data;
}
