import React, { useState } from "react";
import { Archive } from "lucide-react";
import useComplaintHistory from "../hooks/useComplaintHistory";
import ComplaintHistoryModal from "./ComplaintHistoryModal";

const ComplaintCard = ({
  id,
  citizenName,
  complaintType,
  date,
  status,
  lockedBy,
  currentUserId,
  onReserve,
  onView,
}) => {
  const [openHistory, setOpenHistory] = useState(false);
  const { history, loading, fetchHistory } = useComplaintHistory();

  const statusColors = {
    "جديدة": "bg-emerald-200 text-emerald-800",
    "قيد المعالجة": "bg-amber-200 text-amber-800",
    "منجزة": "bg-green-200 text-green-800",
    "مرفوضة": "bg-red-200 text-red-800",
  };

  const handleOpenHistory = () => {
    fetchHistory(id);
    setOpenHistory(true);
  };

  return (
    <>
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl p-6 mb-4 w-full">

        <div className="flex flex-wrap justify-between items-center gap-x-8 gap-y-4">

          <div className="text-right min-w-[80px]">
            <p className="text-sm text-gray-500">ID</p>
            <p className="font-semibold">#{id}</p>
          </div>

          <div className="text-right min-w-[140px]">
            <p className="text-sm text-gray-500">اسم المواطن</p>
            <p className="font-semibold">{citizenName}</p>
          </div>

          <div className="text-right min-w-[140px]">
            <p className="text-sm text-gray-500">نوع الشكوى</p>
            <p className="font-semibold">{complaintType}</p>
          </div>

          <div className="text-right min-w-[150px]">
            <p className="text-sm text-gray-500">تاريخ الإرسال</p>
            <p className="font-semibold">{date}</p>
          </div>

          <span
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${statusColors[status]}`}
          >
            {status}
          </span>

          {!lockedBy && (
            <button
              onClick={onReserve}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
            >
              حجز للمعالجة
            </button>
          )}

          {lockedBy === currentUserId && (
            <button
              onClick={onView}
              className="bg-[#003c3c] text-white px-4 py-2 rounded-lg hover:bg-[#002f2f] transition whitespace-nowrap"
            >
              تعديل / عرض
            </button>
          )}

          {lockedBy && lockedBy !== currentUserId && (
            <p className="text-red-600 text-sm font-semibold whitespace-nowrap">
              محجوزة من مستخدم آخر
            </p>
          )}

          {/* أيقونة الأرشيف – UI أنعم */}
          <button
            onClick={handleOpenHistory}
            title="أرشيف الشكوى"
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-full
              bg-gray-100
              text-gray-600
              hover:bg-gray-200 hover:text-gray-900
              transition
            "
          >
            <Archive size={20} />
          </button>

        </div>
      </div>

      <ComplaintHistoryModal
        open={openHistory}
        onClose={() => setOpenHistory(false)}
        history={history}
        loading={loading}
      />
    </>
  );
};

export default ComplaintCard;
