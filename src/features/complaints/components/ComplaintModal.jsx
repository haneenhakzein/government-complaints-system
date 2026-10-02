import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import ComplaintAttachments from "./ComplaintAttachments";

import { toast } from "react-toastify";
import { useAuthUser } from "@/features/auth";
import useUpdateComplaintStatus from "../hooks/useUpdateComplaintStatus";
import useAddComplaintNote from "../hooks/useAddComplaintNote";
import useDeleteComplaint from "../hooks/useDeleteComplaint";
import useComplaintNotes from "../hooks/useComplaintNotes";
import useComplaintAttachments from "../hooks/useComplaintAttachments";
import useUploadComplaintAttachment from "../hooks/useUploadComplaintAttachment";



const ComplaintModal = ({ open, data, onClose, onUpdateComplaint, onDeleteComplaint }) => {
  const { updateStatus } = useUpdateComplaintStatus();
  const { addNote } = useAddComplaintNote();
  const { deleteComplaint } = useDeleteComplaint();
   const { role } = useAuthUser();

   const {
  attachments,
  loading: attachmentsLoading,
   refetch: refetchAttachments,
} = useComplaintAttachments(data?.id, open);

const { uploadAttachment, loading: uploadLoading } =
  useUploadComplaintAttachment();

const [selectedFile, setSelectedFile] = useState(null);


  const { notes, setNotes, loading: notesLoading } =
    useComplaintNotes(data?.id, open);

  const [status, setStatus] = useState(data?.status || "new");
  const [newNote, setNewNote] = useState("");

  if (!open || !data) return null;

  // ----------------------------
  // تحديث حالة الشكوى
  // ----------------------------
  const handleSave = async () => {
    if (!data.lock_token) {
      toast.warn("يجب حجز الشكوى قبل تعديلها");
      return;
    }

    const payload = {
      status,
      expected_version: data.version || 1,
      lock_token: data.lock_token,
      change_reason: "تم تعديل الحالة بواسطة المستخدم"
    };

    const res = await updateStatus(data.id, payload);

    if (res.success) {
      toast.success("تم تحديث حالة الشكوى بنجاح");

      if (onUpdateComplaint) {
        onUpdateComplaint({
          ...data,
          status,
        });
      }
    } else {
      toast.error(res.message);
    }
  };

  // ----------------------------
  // إضافة ملاحظة جديدة
  // ----------------------------
  const handleAddNote = async () => {
    if (!data.lock_token) {
      toast.warn("يجب حجز الشكوى قبل إضافة الملاحظة");
      return;
    }

    if (!newNote.trim()) {
      toast.warn("لا يمكن إرسال ملاحظة فارغة");
      return;
    }

    const payload = {
      note: newNote,
      expected_version: data.version || 1,
      lock_token: data.lock_token,
      change_reason: "إضافة ملاحظة جديدة"
    };

    const res = await addNote(data.id, payload);

    if (res.success) {
      toast.success("تم إضافة الملاحظة");

      setNotes((prev) => [...prev, res.data]);
      setNewNote("");
    } else {
      toast.error(res.message);
    }
  };

  // ----------------------------
  // حذف الشكوى بالكامل
  // ----------------------------
  const handleDeleteComplaint = async () => {
    if (!window.confirm("⚠️ هل أنت متأكد من حذف هذه الشكوى نهائيًا؟")) return;

    const res = await deleteComplaint(data.id);

    if (res.success) {
      toast.success("تم حذف الشكوى بنجاح");

      if (onDeleteComplaint) onDeleteComplaint(data.id);

      onClose();
    } else {
      toast.error(res.message);
    }
  };

  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-100 w-[90%] md:w-[70%] lg:w-[55%] h-[90%] rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#003c3c] text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">تفاصيل الشكوى</h2>
          <button onClick={onClose}>
            <FiX size={28} className="hover:text-gray-300" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-64px)] space-y-6">

          {/* Citizen Info */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg text-[#003c3c] mb-3">بيانات المواطن</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">اسم المواطن</p>
                <p className="font-semibold">{data.citizenName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                <p className="font-semibold">{data.citizenEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">رقم الهاتف</p>
                <p className="font-semibold">{data.citizenPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">تاريخ الإرسال</p>
                <p className="font-semibold">{data.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">نوع الشكوى</p>
                <p className="font-semibold">{data.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">الجهة الحكومية</p>
                <p className="font-semibold">{data.department}</p>
              </div>
            </div>
          </div>

          {/* Entity Info */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg text-[#003c3c] mb-3">معلومات الجهة الحكومية</h3>
            <p className="text-gray-700"><span className="font-semibold">الاسم:</span> {data.department}</p>
            <p className="text-gray-700 mt-2"><span className="font-semibold">الوصف:</span> {data.departmentDescription}</p>
          </div>

          {/* Description */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg text-[#003c3c] mb-3">وصف الشكوى</h3>
            <p className="text-gray-700 leading-relaxed">{data.description || "لا يوجد وصف مُدرج"}</p>
          </div>

          {/* Attachments */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg text-[#003c3c] mb-3">المرفقات</h3>
<ComplaintAttachments
  attachments={attachments}
  loading={attachmentsLoading}
/>

 {/* Upload Attachment */}
<div className="mt-4 border-t pt-4">
  <input
    type="file"
    onChange={(e) => setSelectedFile(e.target.files[0])}
    className="mb-3"
  />

  <button
    disabled={!selectedFile || uploadLoading || !data.lock_token}
    onClick={async () => {
      if (!selectedFile) return;

      const res = await uploadAttachment(data.id, {
        file: selectedFile,
        lockToken: data.lock_token,
        expectedVersion: data.version || 1,
        changeReason: "Uploading attachment from admin panel",
      });

      if (res.success) {
        toast.success("تم رفع المرفق بنجاح");
        setSelectedFile(null);
        refetchAttachments();
      } else {
        toast.error(res.message);
      }
    }}
    className="bg-[#003c3c] text-white px-4 py-2 rounded-lg disabled:opacity-50"
  >
    {uploadLoading ? "جارِ الرفع..." : "رفع مرفق"}
  </button>
</div>
          </div>


         


          {/* Notes */}
          <div className="bg-white p-5 rounded-xl">
            <h3 className="font-semibold mb-3">الملاحظات</h3>

            {notesLoading ? (
              <p className="text-gray-500">جارِ تحميل الملاحظات...</p>
            ) : notes.length > 0 ? (
              notes.map((n) => (
                <div key={n.id} className="border p-3 rounded-lg mb-2">
                  <p>{n.note}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">لا توجد ملاحظات</p>
            )}

            {/* إضافة ملاحظة */}
            <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">إضافة ملاحظة جديدة</h3>
              <textarea
                className="w-full p-2 border rounded-lg mb-2"
                placeholder="أكتب ملاحظتك هنا..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <button
                className="bg-[#003c3c] text-white py-2 px-4 rounded-lg"
                onClick={handleAddNote}
              >
                إضافة الملاحظة
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg text-[#003c3c] mb-3">إجراءات المعالجة</h3>

            {!data.lock_token && (
              <p className="text-red-600 text-center font-semibold mb-4">
                يجب حجز الشكوى قبل التعديل
              </p>
            )}

            <select
              className="w-full bg-gray-100 p-3 rounded-lg border mb-4"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="new">جديدة</option>
              <option value="in_progress">قيد المعالجة</option>
              <option value="completed">منجزة</option>
              <option value="rejected">مرفوضة</option>
            </select>

            {/* Delete Complaint */}
              {role === "admin" && (
                <div className="bg-red-100 p-5 rounded-xl shadow-sm text-center">
                <button
                onClick={handleDeleteComplaint}
                className="bg-red-600 text-white py-3 px-6 w-full rounded-xl font-bold"
              >
                🗑️ حذف هذه الشكوى نهائيًا
              </button>
               </div>)}
           

            

            <button
              disabled={!data.lock_token}
              className={`w-full py-3 rounded-xl text-white mt-4 ${
                data.lock_token ? "bg-[#003c3c]" : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleSave}
            >
              حفظ التعديلات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;
