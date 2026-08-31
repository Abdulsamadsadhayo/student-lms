"use client";

import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import "./sidebar.css";

export default function Sidebar({
  activePage,
  setActivePage,
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-icon">
              <GraduationCap size={25} />
            </div>

            <div>
              <h2>Student LMS</h2>
              <span>Admin Panel</span>
            </div>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={21} />
          </button>
        </div>

        <div className="sidebar-menu">
          <p className="menu-title">MAIN MENU</p>

          <button
            className={`menu-item ${
              activePage === "dashboard" ? "active" : ""
            }`}
            onClick={() => {
              setActivePage("dashboard");
              setMobileOpen(false);
            }}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            className={`menu-item ${
              activePage === "students" ? "active" : ""
            }`}
            onClick={() => {
              setActivePage("students");
              setMobileOpen(false);
            }}
          >
            <Users size={19} />
            <span>Students</span>
          </button>

          <p className="menu-title settings-title">SYSTEM</p>

          <button className="menu-item">
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </div>

        <div className="sidebar-bottom">
          <button className="menu-item logout">
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}