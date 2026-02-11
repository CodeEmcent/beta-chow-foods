import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  BarChart3,
  Utensils,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import "../styles/adminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function logout() {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="admin-layout">
      {/* MOBILE TOPBAR */}
      <header className="admin-mobile-topbar">
        <h2 className="admin-logo">Admin</h2>

        <button
          className="admin-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* OVERLAY */}
      {sidebarOpen && <div className="admin-overlay" onClick={closeSidebar} />}

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="admin-logo desktop-only">Admin</h2>

        <nav className="admin-nav">
          <NavLink to="/admin" end onClick={closeSidebar}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="/admin/orders" onClick={closeSidebar}>
            <ShoppingBag size={18} /> Orders
          </NavLink>

          <NavLink to="/admin/analytics" onClick={closeSidebar}>
            <BarChart3 size={18} /> Analytics
          </NavLink>

          <NavLink to="/admin/menu" onClick={closeSidebar}>
            <Utensils size={18} /> Menu
          </NavLink>

          <NavLink to="/admin/customers" onClick={closeSidebar}>
            <Users size={18} /> Customers
          </NavLink>

          <NavLink to="/admin/settings" onClick={closeSidebar}>
            <Settings size={18} /> Settings
          </NavLink>
        </nav>

        <button className="admin-logout" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}