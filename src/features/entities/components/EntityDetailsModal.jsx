import React from "react";
import { FiX } from "react-icons/fi";
import { FaBuilding, FaUserTie, FaExclamationCircle, FaClock } from "react-icons/fa";

const EntityDetailsModal = ({ open, onClose, entity }) => {
  if (!open || !entity) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xl relative shadow-xl overflow-y-auto max-h-[92vh]">

        {/* ✖ زر إغلاق */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 text-2xl hover:text-black"
        >
          <FiX />
        </button>

        {/* ★ رأس المودال */}
        <div className="text-center mb-4">
          <div className="mx-auto w-16 h-16 bg-[#003c3c] text-white flex items-center justify-center rounded-full shadow-md text-3xl">
            <FaBuilding />
          </div>
          <h2 className="text-2xl font-bold text-[#003c3c] mt-3">{entity.name}</h2>
          <p className="text-gray-500 text-sm mt-1">تفاصيل كاملة عن القسم</p>
        </div>

        {/* 🔽 قسم المعلومات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Info label="رقم القسم" value={entity.id} />
          <Info label="عدد الموظفين" value={entity.employees_count} icon={<FaUserTie />} />
          <Info
            label="عدد الشكاوى"
            value={entity.complaints_count}
            icon={<FaExclamationCircle />}
          />
          <Info label="تاريخ الإنشاء" value={formatDate(entity.created_at)} icon={<FaClock />} />
          <Info label="آخر تحديث" value={formatDate(entity.updated_at)} icon={<FaClock />} />
          <Info
            label="الحالة"
            value={entity.deleted_at ? "محذوف" : "فعال"}
            valueClass={entity.deleted_at ? "text-red-600 font-bold" : "text-green-600 font-bold"}
          />

        </div>

        {/* 📝 الوصف */}
        <div className="mt-6 p-4 rounded-xl bg-gray-50 border text-gray-700 leading-relaxed">
          <h3 className="font-semibold text-[#003c3c] mb-1">الوصف:</h3>
          <p>{entity.description || "لا يوجد وصف"}</p>
        </div>

      </div>
    </div>
  );
};

export default EntityDetailsModal;

/* عنصر معلومات مصمم بشكل عملي */
const Info = ({ label, value, icon, valueClass="" }) => (
  <div className="bg-gray-50 border rounded-xl p-3 shadow-sm hover:bg-gray-100 transition">
    <div className="flex gap-2 items-center mb-1 text-[#003c3c] font-semibold">
      {icon && <span className="text-[#003c3c]">{icon}</span>}
      <span>{label}</span>
    </div>
    <p className={`text-right ${valueClass}`}>{value ?? "-"}</p>
  </div>
);

/* ✨ تحسين شكل التاريخ */
function formatDate(date) {
  try { return new Date(date).toLocaleDateString("ar-EG"); }
  catch { return date; }
}
