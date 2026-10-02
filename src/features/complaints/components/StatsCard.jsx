import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

export default function StatsCard({
  title,
  value,
  percentage,
  isUp,
  icon,
  bg
}) {
  return (
    <div
      className={`rounded-3xl p-6 shadow-md text-white flex items-center justify-between ${bg}`}
    >
      <div>
        <h3 className="text-lg opacity-90">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>

        <div className="flex items-center gap-2 mt-3 text-sm opacity-90">
          {isUp ? (
            <FiTrendingUp className="text-white" />
          ) : (
            <FiTrendingDown className="text-white" />
          )}
          <span>{percentage}</span>
        </div>
      </div>

      {/* دائرة الأيقونة */}
      <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white text-xl">
        {icon}
      </div>
    </div>
  );
}
