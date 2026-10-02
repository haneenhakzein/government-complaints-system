import React from "react";
import { FiSearch } from "react-icons/fi";


export default function EmployeesFilters({ search, setSearch }) {
return (
<div className="w-full bg-white shadow-sm rounded-2xl p-4 border border-gray-200 mb-6">
<div className="flex items-center gap-3">
<FiSearch className="text-gray-500 text-xl" />
<input
type="text"
placeholder="ابحث عن موظف بالاسم..."
value={search}
onChange={(e) => setSearch(e.target.value)}
className="w-full outline-none text-gray-700"
/>
</div>
</div>
);
}