import React from "react";
import { FiUser } from "react-icons/fi";

const ViewUserModal = ({ open, onClose, user }) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center gap-2">
          <FiUser className="text-blue-600" />
          <h2 className="font-semibold text-gray-800">
            تفاصيل المستخدم
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

          <Field label="ID" value={`#${user.id}`} />
          <Field label="الاسم" value={user.name} />
          <Field label="البريد الإلكتروني" value={user.email} />
          <Field label="رقم الهاتف" value={user.phone || "—"} />
          <Field
            label="نوع المستخدم"
            value={user.role === "employee" ? "موظف" : "مواطن"}
          />
          <Field
            label="الجهة"
            value={user.entity ? user.entity.name : "—"}
          />
          <Field
            label="الحالة"
            value={user.is_locked ? "مقفل" : "نشط"}
          />
          <Field
            label="تاريخ الإنشاء"
            value={user.created_at?.split("T")[0]}
          />

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

export default ViewUserModal;
