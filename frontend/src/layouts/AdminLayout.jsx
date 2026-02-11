import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/adminLayout.css";

import {
  FiMenu,
  FiX,
  FiGrid,
  FiShoppingBag,
  FiBarChart2,
  FiCoffee,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function logout() {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  }

  // Close sidebar on route change (when user clicks a link)
  function closeSidebar() {
    setSidebarOpen(false);
  }

  // Prevent “stuck open” when resizing up to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 900) setSidebarOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="admin-layout">
      {/* Mobile topbar */}
      <header className="admin-mobile-topbar">
        <button
          className="admin-icon-btn"
          onClick={() => setSidebarOpen((s) => !s)}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        <div className="admin-mobile-title">Admin</div>

        <button className="admin-mobile-logout" onClick={logout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </header>

      {/* Backdrop (mobile only) */}
      {sidebarOpen && <div className="admin-backdrop" onClick={closeSidebar} />}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="admin-logo">Admin</h2>

        <nav className="admin-nav" onClick={closeSidebar}>
          <NavLink to="/admin" end>
            <FiGrid className="nav-ico" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/orders">
            <FiShoppingBag className="nav-ico" />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/admin/analytics">
            <FiBarChart2 className="nav-ico" />
            <span>Analytics</span>
          </NavLink>

          <NavLink to="/admin/menu">
            <FiCoffee className="nav-ico" />
            <span>Menu</span>
          </NavLink>

          <NavLink to="/admin/customers">
            <FiUsers className="nav-ico" />
            <span>Customers</span>
          </NavLink>

          <NavLink to="/admin/settings">
            <FiSettings className="nav-ico" />
            <span>Settings</span>
          </NavLink>
        </nav>

        <button className="admin-logout" onClick={logout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </aside>

      <main className="admin-main">
        {/* Desktop topbar */}
        <div className="admin-topbar">
          <h1>Admin Dashboard</h1>
          <button className="admin-logout desktop-only" onClick={logout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}