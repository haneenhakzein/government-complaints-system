import React from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useAuthUser } from "@/features/auth";


const EntityCard = ({
  id,
  name,
  employees_count,
  complaints_count,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
    const { role } = useAuthUser();

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-all duration-200">
      
      {/* العنوان مع الدائرة نفس موظفين بالضبط */}
      <div className="flex items-center gap-4 border-b pb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#003c3c] text-white font-bold text-lg">
          {name?.charAt(0)}
        </div>
        <div>
          <h2 className="font-semibold text-lg text-gray-800">{name}</h2>
          <p className="text-xs text-gray-500">القسم رقم #{id}</p>
        </div>
      </div>

      {/* المعلومات */}
      <div className="mt-4 text-gray-700 space-y-2">
        <p>👨‍💼 عدد الموظفين: <span className="font-semibold">{employees_count}</span></p>
        <p>📄 عدد الشكاوى: <span className="font-semibold">{complaints_count}</span></p>
      </div>

      {/* الأزرار — نفس توزيع تبع موظفين (يمين - يسار) */}
      <div className="flex justify-between mt-5">

        <button
          onClick={onViewDetails}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 transition"
        >
          <Eye size={16} /> عرض
        </button>

        <div className="flex gap-2">
         {role === "admin" && ( <button
            onClick={onEdit}
            className="flex items-center gap-1 px-3 py-1.5 text-blue-700 bg-blue-100 rounded-lg text-sm hover:bg-blue-200 transition"
          >
            <Pencil size={16} /> تعديل
          </button>)}

         {role === "admin" && ( <button
            onClick={onDelete}
            className="flex items-center gap-1 px-3 py-1.5 text-red-700 bg-red-100 rounded-lg text-sm hover:bg-red-200 transition"
          >
            <Trash2 size={16} /> حذف
          </button>)}
        </div>

      </div>
    </div>
  );
};

export default EntityCard;
