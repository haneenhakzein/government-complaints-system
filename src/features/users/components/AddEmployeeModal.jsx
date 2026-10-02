import { useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { useEntityOptions } from "@/features/entities";
import useCreateEmployee from "../hooks/useCreateEmployee";

const AddEmployeeModal = ({ open, onClose, fetchUsers }) => {
  const { createEmployee, loading } = useCreateEmployee();
  const { entities, loading: entitiesLoading } = useEntityOptions();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    entity_id: "",
    change_reason: "",
  });

  if (!open) return null;

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    if (!form.entity_id) {
      toast.warn("يرجى اختيار القسم");
      return;
    }

    try {
      await createEmployee({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        password_confirmation: form.password_confirmation,
        entity_id: Number(form.entity_id), // ✅ نفس الشي للـ API
        change_reason: form.change_reason,
      });

      toast.success("تم إضافة الموظف بنجاح");
      fetchUsers();
      onClose();

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        entity_id: "",
        change_reason: "",
      });
    } catch {
      toast.error("فشل في إضافة الموظف");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-lg">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 text-2xl"
        >
          <FiX />
        </button>

        <h2 className="text-xl font-bold text-[#003c3c] mb-4 text-center">
          إضافة موظف جديد
        </h2>

        <div className="space-y-4">

          <Input
            label="اسم الموظف"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
          />

          <Input
            label="البريد الإلكتروني"
            value={form.email}
            onChange={(v) => handleChange("email", v)}
          />

          <Input
            label="رقم الهاتف"
            value={form.phone}
            onChange={(v) => handleChange("phone", v)}
          />

          <Input
            label="كلمة المرور"
            type="password"
            value={form.password}
            onChange={(v) => handleChange("password", v)}
          />

          <Input
            label="تأكيد كلمة المرور"
            type="password"
            value={form.password_confirmation}
            onChange={(v) =>
              handleChange("password_confirmation", v)
            }
          />

          {/* ✅ اختيار القسم */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              القسم
            </label>
            <select
              value={form.entity_id}
              onChange={(e) =>
                handleChange("entity_id", e.target.value)
              }
              className="w-full border px-3 py-2 rounded-lg"
              disabled={entitiesLoading}
            >
              <option value="">اختر القسم</option>
              {entities.map((entity) => (
                <option key={entity.id} value={entity.id}>
                  {entity.name}
                </option>
              ))}
            </select>
          </div>

          {/* سبب الإضافة */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              سبب الإضافة
            </label>
            <textarea
              className="w-full border px-3 py-2 rounded-lg"
              rows="2"
              value={form.change_reason}
              onChange={(e) =>
                handleChange("change_reason", e.target.value)
              }
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#003c3c] text-white py-2 rounded-lg mt-6 hover:bg-[#002f2f] disabled:bg-gray-400"
        >
          {loading ? "جارٍ الإضافة..." : "إضافة"}
        </button>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm text-gray-500 mb-1">
      {label}
    </label>
    <input
      type={type}
      className="w-full border px-3 py-2 rounded-lg"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default AddEmployeeModal;
