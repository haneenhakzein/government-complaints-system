import React from "react";
import "./Sidebar.css";
import logo from "../assets/logo.png";
import { FaListUl, FaUsers, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuthUser, useLogout } from "@/features/auth";



const Sidebar = () => {
  const { role } = useAuthUser();
  const { logout } = useLogout();

  return (
    <div className="sidebar">

      {/* العنوان + الشعار */}
      <div className="sidebar-header">
        <img src={logo} alt="logo" className="sidebar-logo" />
        <h2>نظام الشكاوى</h2>
      </div>

      {/* الروابط */}
      <nav className="sidebar-menu">

        <NavLink to="/dashboard/complaints" className="sidebar-link">
          <FaListUl /> إدارة الشكاوى
        </NavLink>

        {role === "admin" && (
          <NavLink to="/dashboard/employees" className="sidebar-link">
            <FaUsers /> المستخدمون
          </NavLink>
        )}

          <NavLink to="/dashboard/entities" className="sidebar-link">
  <FaChartBar /> الأقسام
</NavLink>


            <NavLink to="/dashboard/reports" className="sidebar-link">
  <FaChartBar /> التقارير
</NavLink>

        
        <NavLink to="/dashboard/settings" className="sidebar-link">
          <FaCog /> الإعدادات
        </NavLink>

      </nav>

       {/* تسجيل الخروج */}
      <div className="logout-section">
        <button className="logout-btn" onClick={logout}>
  <FaSignOutAlt /> تسجيل الخروج
</button>

      </div>
    </div>
  );
};

export default Sidebar;
