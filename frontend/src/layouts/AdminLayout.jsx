import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/adminLayout.css"

export default function AdminLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin</h2>

        <nav className="admin-nav">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/analytics">Analytics</NavLink>
          <NavLink to="/admin/menu">Menu</NavLink>
          <NavLink to="/admin/customers">Customers</NavLink>
          {/* Future */}
          {/* <NavLink to="/admin/inventory">Inventory</NavLink> */}
          <NavLink to="/admin/settings">Settings</NavLink>
        </nav>

        <button className="admin-logout" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <h1>Admin Dashboard</h1>
          <button className="admin-logout" onClick={logout}>
            Logout
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
