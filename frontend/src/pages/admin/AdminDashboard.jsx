import React, { useEffect, useState } from "react";
import { fetchAllOrders } from "../../api/admin";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../api/client";
import "../../styles/admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);

  const token = localStorage.getItem("admin_token");

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  // Fetch summary
  useEffect(() => {
    if (!token) return;

    setLoadingSummary(true);
    apiFetch("/orders/admin/summary/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(setSummary)
      .catch(() => {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      })
      .finally(() => setLoadingSummary(false));
  }, [token, navigate]);

  // Fetch orders whenever status changes
  useEffect(() => {
    if (!token) return;

    setLoadingOrders(true);
    fetchAllOrders(token, status)
      .then(setOrders)
      .catch(() => {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      })
      .finally(() => setLoadingOrders(false));
  }, [token, status, navigate]);

  function logout() {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* SUMMARY */}
      {loadingSummary ? (
        <p className="loading-text">Loading summary...</p>
      ) : summary && (
        <div className="admin-summary">
          <div>Today Orders: <span>{summary.total_orders}</span></div>
          <div>Completed: <span>{summary.completed_orders}</span></div>
          <div>Pending: <span>{summary.pending_orders}</span></div>
          <div>Revenue: <span>₦{summary.total_revenue}</span></div>
        </div>
      )}

      {/* FILTER */}
      <div className="admin-filters">
        <label>Filter by status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="NEW">New</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="COOKING">Cooking</option>
          <option value="OUT_FOR_DELIVERY">Out for delivery</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* ORDERS LIST */}
      {loadingOrders ? (
        <p className="loading-text">Loading orders...</p>
      ) : (
        <div className="admin-orders">
          {orders.length === 0 ? (
            <p className="empty-text">No orders found.</p>
          ) : (
            orders.map((o) => (
              <div key={o.id} className="admin-order-card">
                <p>
                  <b>{o.order_no}</b> — {o.status} — ₦{o.total}
                </p>
                <Link className="view-link" to={`/admin/orders/${o.id}`}>
                  View
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
