import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/adminLayout.css";

import {
  LayoutDashboard,
  Package,
  BarChart3,
  UtensilsCrossed,
  Users,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  }

  return (
    <div className="admin-layout">
      {/* MOBILE TOPBAR */}
      <div className="admin-mobile-topbar">
        <h2 className="admin-logo">Admin</h2>

        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${menuOpen ? "open" : ""}`}>
        <h2 className="admin-logo desktop-only">Admin</h2>

        <nav className="admin-nav">
          <NavLink to="/admin" end onClick={() => setMenuOpen(false)}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/orders" onClick={() => setMenuOpen(false)}>
            <Package size={18} />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/admin/analytics" onClick={() => setMenuOpen(false)}>
            <BarChart3 size={18} />
            <span>Analytics</span>
          </NavLink>

          <NavLink to="/admin/menu" onClick={() => setMenuOpen(false)}>
            <UtensilsCrossed size={18} />
            <span>Menu</span>
          </NavLink>

          <NavLink to="/admin/customers" onClick={() => setMenuOpen(false)}>
            <Users size={18} />
            <span>Customers</span>
          </NavLink>

          <NavLink to="/admin/settings" onClick={() => setMenuOpen(false)}>
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </nav>

        <button className="admin-logout" onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="admin-backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <div className="admin-topbar desktop-only">
          <h1>Admin Dashboard</h1>

          <button className="admin-logout" onClick={logout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}