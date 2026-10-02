import React from "react";
import { FiEdit2, FiEye } from "react-icons/fi";

const UserCard = ({
  id,
  name,
  email,
  role,
  isLocked,
  onEdit,
  onView,
}) => {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 mb-3 w-full">

      <div className="flex items-center gap-6">

        {/* ID */}
        <div className="w-20">
          <p className="text-xs text-gray-400">ID</p>
          <p className="font-semibold">#{id}</p>
        </div>

        {/* الاسم */}
        <div className="w-56">
          <p className="text-xs text-gray-400">الاسم</p>
          <p className="font-medium truncate" title={name}>
            {name}
          </p>
        </div>

        {/* البريد الإلكتروني */}
        <div className="w-64">
          <p className="text-xs text-gray-400">البريد الإلكتروني</p>
          <p className="font-medium truncate" title={email}>
            {email}
          </p>
        </div>

        {/* نوع المستخدم */}
        <div className="w-36">
          <p className="text-xs text-gray-400">نوع المستخدم</p>
          <p className="font-medium">
            {role === "employee" ? "موظف" : "مواطن"}
          </p>
        </div>

        {/* الحالة */}
        <div className="w-28">
          <p className="text-xs text-gray-400">الحالة</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
              ${
                isLocked
                  ? "bg-red-100 text-red-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
          >
            {isLocked ? "مقفل" : "نشط"}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex gap-2">
          {/* عرض */}
          <button
            onClick={onView}
            title="عرض التفاصيل"
            className="w-9 h-9 flex items-center justify-center
                       rounded-full bg-blue-50 text-blue-600
                       hover:bg-blue-100 transition"
          >
            <FiEye size={18} />
          </button>

          {/* تعديل */}
          <button
            onClick={onEdit}
            title="تعديل المستخدم"
            className="w-9 h-9 flex items-center justify-center
                       rounded-full bg-emerald-50 text-emerald-600
                       hover:bg-emerald-100 transition"
          >
            <FiEdit2 size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserCard;
