import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const EditEntityModal = ({ open, onClose, entity, onSubmit }) => {

  //  Hooks يجب أن تكون دائماً في أعلى الكومبوننت
  const [name, setName] = useState(entity?.name || "");
  const [description, setDescription] = useState(entity?.description || "");
  const [changeReason, setChangeReason] = useState("");

  //  ممنوع نعمل return قبل Hooks، لذلك نضع الشرط هنا فقط
  if (!open || !entity) return null;

  const handleSubmit = () => {
    onSubmit({
      name,
      description,
      change_reason: changeReason,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-lg">

        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 text-2xl"
        >
          <FiX />
        </button>

        <h2 className="text-xl font-bold text-[#003c3c] mb-5 text-center">
          تعديل القسم
        </h2>

        <div className="space-y-4">

          {/* الاسم */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">اسم القسم</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#003c3c]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* الوصف */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">الوصف</label>
            <textarea
              className="w-full border px-3 py-2 rounded-lg h-24 resize-none focus:ring-2 focus:ring-[#003c3c]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* سبب التعديل */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">سبب التعديل</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#003c3c]"
              value={changeReason}
              onChange={(e) => setChangeReason(e.target.value)}
            />
          </div>

        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#003c3c] text-white py-2 rounded-lg mt-6 hover:bg-[#022d2d]"
        >
          حفظ التعديلات
        </button>

      </div>
    </div>
  );
};

export default EditEntityModal;
