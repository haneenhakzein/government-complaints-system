import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthUser } from "@/features/auth";
import {
  COMPLAINT_STATUS_OPTIONS,
  translateComplaintStatus,
} from "../constants/complaintStatus";
import useComplaints from "../hooks/useComplaints";
import useReserveComplaint from "../hooks/useReserveComplaint";
import useComplaintModal from "../hooks/useComplaintModal";
import ComplaintCard from "./ComplaintCard";
import ComplaintModal from "./ComplaintModal";
import ComplaintsStats from "./ComplaintsStats";

export default function ComplaintsView() {
  const { complaints, loading, error, setComplaints } = useComplaints();
  const { reserveComplaint } = useReserveComplaint();
  const { user } = useAuthUser();
  const currentUserId = user?.id;

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const { open, data: selectedComplaint, show, hide } = useComplaintModal();

  const handleReserve = async (complaint) => {
    const res = await reserveComplaint(complaint.id);
    if (!res.success) {
      toast.error(res.message);
      return;
    }

    const updatedComplaint = {
      ...complaint,
      locked_by: res.data.locked_by,
      locked_until: res.data.locked_until,
      lock_token: res.data.lock_token,
    };

    setComplaints((prev) =>
      prev.map((item) => (item.id === complaint.id ? updatedComplaint : item))
    );
    toast.success("تم حجز الشكوى بنجاح");
  };

  if (loading) {
    return <p className="p-8 text-center text-gray-500">جارِ تحميل الشكاوى...</p>;
  }

  if (error) {
    return (
      <p className="p-8 text-center text-red-600 font-semibold">
        حدث خطأ أثناء التحميل
      </p>
    );
  }

  const filtered = complaints
    .filter((item) => {
      const term = search.toLowerCase();
      return (
        item.citizenName.toLowerCase().includes(term) ||
        item.id.toString().includes(term) ||
        item.type.toLowerCase().includes(term) ||
        item.department.toLowerCase().includes(term)
      );
    })
    .filter((item) =>
      typeFilter ? item.type.toLowerCase().includes(typeFilter.toLowerCase()) : true
    )
    .filter((item) =>
      departmentFilter
        ? item.department.toLowerCase().includes(departmentFilter.toLowerCase())
        : true
    )
    .filter((item) => (statusFilter ? item.status === statusFilter : true))
    .filter((item) => (dateFilter ? item.date?.startsWith(dateFilter) : true));

  return (
    <div className="p-8">
      <ComplaintsStats />

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="بحث عن اسم المواطن أو رقم الشكوى..."
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003c3c]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="اكتب نوع الشكوى..."
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003c3c]"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="اسم الجهة أو القسم..."
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003c3c]"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          />
          <select
            className="border px-4 py-2 rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {COMPLAINT_STATUS_OPTIONS.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="border px-4 py-2 rounded-lg"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-[#003c3c]">الشكاوى:</h1>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">لا يوجد نتائج مطابقة...</p>
      ) : (
        filtered.map((complaint) => (
          <ComplaintCard
            key={complaint.id}
            id={complaint.id}
            citizenName={complaint.citizenName}
            complaintType={complaint.type}
            date={complaint.date}
            status={translateComplaintStatus(complaint.status)}
            department={complaint.department}
            description={complaint.description}
            attachments={complaint.attachments}
            onView={() => show(complaint)}
            lockedBy={complaint.locked_by}
            currentUserId={currentUserId}
            onReserve={() => handleReserve(complaint)}
          />
        ))
      )}

      <ComplaintModal
        open={open}
        data={selectedComplaint}
        onClose={hide}
        onUpdateComplaint={(updated) => {
          setComplaints((prev) =>
            prev.map((item) => (item.id === updated.id ? { ...item, ...updated } : item))
          );
        }}
        onDeleteComplaint={(deletedId) => {
          setComplaints((prev) => prev.filter((item) => item.id !== deletedId));
        }}
      />
    </div>
  );
}
