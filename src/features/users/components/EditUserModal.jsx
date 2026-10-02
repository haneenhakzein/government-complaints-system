import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiPhone, FiEdit3, FiShuffle } from "react-icons/fi";
import { useEntityOptions } from "@/features/entities";
import useUpdateUser from "../hooks/useUpdateUser";
import useUpdateUserStatus from "../hooks/useUpdateUserStatus";
import useTransferEmployee from "../hooks/useTransferEmployee";

const EditUserModal = ({ open, onClose, user, onSuccess }) => {
  const { submitUpdate } = useUpdateUser();
  const { updateStatus } = useUpdateUserStatus();
  const { entities } = useEntityOptions();
  const { transferEmployee } = useTransferEmployee();

  const [status, setStatus] = useState("active");
  const [saving, setSaving] = useState(false);
  const [reasonError, setReasonError] = useState("");

  // 🔹 نقل الموظف
  const [newEntityId, setNewEntityId] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    change_reason: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        change_reason: "",
      });

      setStatus(user.is_locked ? "inactive" : "active");
      setReasonError("");
      setNewEntityId("");
      setTransferError("");
    }
  }, [user]);

  if (!open || !user) return null;

  // ======================
  // حفظ التعديلات
  // ======================
  const handleSubmit = async () => {
    if (!form.change_reason || form.change_reason.trim().length < 5) {
      setReasonError("سبب التعديل يجب أن يكون 5 أحرف على الأقل");
      return;
    }

    setSaving(true);
    try {
      await submitUpdate(user.id, form);

      const originalStatus = user.is_locked ? "inactive" : "active";
      if (status !== originalStatus) {
        await updateStatus(user.id, status, form.change_reason);
      }

      onSuccess();
      onClose();
    } finally {
      setSaving(false);
    }
  };

  // ======================
  // نقل الموظف
  // ======================
  const handleTransfer = async () => {
    if (!newEntityId) {
      setTransferError("يرجى اختيار القسم الجديد");
      return;
    }

    if (!form.change_reason || form.change_reason.trim().length < 5) {
      setTransferError("يرجى كتابة سبب النقل (5 أحرف على الأقل)");
      return;
    }

    setTransferLoading(true);
    try {
      await transferEmployee(user.id, {
        entity_id: newEntityId,
        change_reason: form.change_reason,
      });

      onSuccess();
      onClose();
    } finally {
      setTransferLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] shadow-xl flex flex-col">

        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center gap-2 shrink-0">
          <FiEdit3 className="text-emerald-600" />
          <h2 className="font-semibold text-gray-800">
            تعديل بيانات المستخدم
          </h2>
        </div>

        {/* Body (Scrollable) */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto flex-1">

          <Input
            icon={<FiUser />}
            label="الاسم"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />

          <Input
            icon={<FiMail />}
            label="البريد الإلكتروني"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />

          <Input
            icon={<FiPhone />}
            label="رقم الهاتف"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
          />

          {/* الحالة */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">
              حالة المستخدم
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-xl px-4 py-2"
            >
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>

          {/* 🔁 نقل الموظف */}
          {user.role === "employee" && (
            <div className="md:col-span-2 border rounded-xl p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <FiShuffle className="text-blue-600" />
                <h3 className="font-medium text-gray-700">
                  نقل الموظف إلى قسم آخر
                </h3>
              </div>

              <div className="mb-3">
                <label className="text-sm text-gray-500 block mb-1">
                  القسم الحالي
                </label>
                <input
                  value={user.entity?.name || "—"}
                  disabled
                  className="w-full border rounded-xl px-4 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  القسم الجديد
                </label>
                <select
                  value={newEntityId}
                  onChange={(e) => setNewEntityId(e.target.value)}
                  className="w-full border rounded-xl px-4 py-2"
                >
                  <option value="">اختر القسم</option>
                  {entities
                    .filter((e) => e.id !== user.entity?.id)
                    .map((entity) => (
                      <option key={entity.id} value={entity.id}>
                        {entity.name}
                      </option>
                    ))}
                </select>
              </div>

              {transferError && (
                <p className="text-sm text-red-600 mt-2">
                  {transferError}
                </p>
              )}
            </div>
          )}

          {/* السبب */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-500 mb-1 block">
              سبب التعديل / النقل
            </label>
            <textarea
              rows={3}
              className={`w-full border rounded-xl px-4 py-2 outline-none
                focus:ring-2 focus:ring-emerald-500
                ${reasonError ? "border-red-500" : ""}`}
              value={form.change_reason}
              onChange={(e) => {
                setForm({ ...form, change_reason: e.target.value });
                setReasonError("");
                setTransferError("");
              }}
            />

            {reasonError && (
              <p className="text-sm text-red-600 mt-1">
                {reasonError}
              </p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            disabled={saving || transferLoading}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50 disabled:opacity-60"
          >
            إلغاء
          </button>

          {newEntityId && (
            <button
              onClick={handleTransfer}
              disabled={transferLoading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white
                         hover:bg-blue-700 disabled:opacity-60"
            >
              {transferLoading ? "جارٍ النقل..." : "نقل الموظف"}
            </button>
          )}

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-emerald-600 text-white
                       hover:bg-emerald-700 disabled:opacity-60"
          >
            {saving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
          </button>
        </div>

      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, icon }) => (
  <div>
    <label className="text-sm text-gray-500 mb-1 block">{label}</label>
    <div className="flex items-center border rounded-xl px-3 focus-within:ring-2 focus-within:ring-emerald-500">
      <span className="text-gray-400">{icon}</span>
      <input
        className="w-full px-3 py-2 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

export default EditUserModal;
