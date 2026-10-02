import React from "react";
import StatsCard from "./StatsCard";
import { FiX, FiCheck, FiClock, FiFileText, FiInbox } from "react-icons/fi";
import useComplaintsStatusCounts from "../hooks/useComplaintsStatusCounts";

export default function ComplaintsStats() {
  const { data, loading } = useComplaintsStatusCounts();

  if (loading) return <div>جاري تحميل الإحصائيات...</div>;
  if (!data) return null;

  const cards = [
    {
      title: "جديدة",
      value: data.new,
      icon: <FiInbox />,
      bg: "bg-gradient-to-r from-blue-500 to-blue-400",
    },
    {
      title: "قيد المعالجة",
      value: data.in_progress,
      icon: <FiClock />,
      bg: "bg-gradient-to-r from-orange-500 to-orange-400",
    },
    {
      title: "محجوزة",
      value: data.reserved,
      icon: <FiFileText />,
      bg: "bg-gradient-to-r from-purple-500 to-purple-400",
    },
    {
      title: "منجزة",
      value: data.completed,
      icon: <FiCheck />,
      bg: "bg-gradient-to-r from-green-500 to-green-400",
    },
    {
      title: "مرفوضة",
      value: data.rejected,
      icon: <FiX />,
      bg: "bg-gradient-to-r from-red-500 to-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
      {cards.map((card, index) => (
        <StatsCard
          key={index}
          title={card.title}
          value={card.value}
          percentage=""   // إذا بدنا نضيفها لاحقاً
          isUp={true}
          icon={card.icon}
          bg={card.bg}
        />
      ))}
    </div>
  );
}
