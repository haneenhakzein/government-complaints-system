export const COMPLAINT_STATUS_OPTIONS = [
  { value: "", label: "الحالة" },
  { value: "new", label: "جديدة" },
  { value: "in_progress", label: "قيد المعالجة" },
  { value: "completed", label: "منجزة" },
  { value: "rejected", label: "مرفوضة" },
];

const STATUS_LABELS = {
  new: "جديدة",
  in_progress: "قيد المعالجة",
  completed: "منجزة",
  rejected: "مرفوضة",
};

export function translateComplaintStatus(status) {
  return STATUS_LABELS[status] ?? status;
}
