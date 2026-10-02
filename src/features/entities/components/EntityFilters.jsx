import React, { useState } from "react";

export default function EntityFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    name: "",
    employees: "",
    complaints: "",
    date: "",
  });

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilter(updated);  // نعيد كل الفلاتر للصفحة الأم لتطبيقها على البيانات
  };

  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center">

      {/* اسم القسم */}
      <input
        type="text"
        placeholder="ابحث باسم القسم..."
        value={filters.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="w-full md:w-1/4 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003c3c] outline-none text-right"
      />

      {/* عدد الموظفين */}
      <input
        type="number"
        placeholder="عدد الموظفين..."
        value={filters.employees}
        onChange={(e) => handleChange("employees", e.target.value)}
        className="w-full md:w-1/4 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003c3c] outline-none text-right"
      />

      {/* عدد الشكاوى */}
      <input
        type="number"
        placeholder="عدد الشكاوى..."
        value={filters.complaints}
        onChange={(e) => handleChange("complaints", e.target.value)}
        className="w-full md:w-1/4 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003c3c] outline-none text-right"
      />

      {/* تاريخ الإنشاء */}
      <input
        type="date"
        value={filters.date}
        onChange={(e) => handleChange("date", e.target.value)}
        className="w-full md:w-1/4 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003c3c] outline-none text-right"
      />
    </div>
  );
}
