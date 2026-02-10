import React, { useEffect, useState } from "react";
import { fetchAllOrders } from "../../api/admin";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../api/client";
import { formatMoney } from "../../utils/money";
import "../../styles/admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

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
    apiFetch("/api/orders/admin/summary/", {
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
    fetchAllOrders(status)
      .then(setOrders)
      .catch(() => {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      })
      .finally(() => setLoadingOrders(false));
  }, [token, status, navigate]);

  function sortBy(key) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  }

  return (
    <div className="admin-dashboard">

      {/* SUMMARY */}
      {loadingSummary ? (
        <p className="loading-text">Loading summary...</p>
      ) : summary && (
        <div className="admin-summary">
          <div className="summary-card orders">
            <p className="summary-label">Today Orders</p>
            <p className="summary-value">{summary.total_orders}</p>
          </div>
          <div className="summary-card completed">
            <p className="summary-label">Completed</p>
            <p className="summary-value">{summary.completed_orders}</p>
          </div>
          <div className="summary-card pending">
            <p className="summary-label">Pending</p>
            <p className="summary-value">{summary.pending_orders}</p>
          </div>
          <div className="summary-card revenue">
            <p className="summary-label">Revenue</p>
            <p className="summary-value">₦{formatMoney(Number(summary.total_revenue))}</p>
          </div>
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
      ) : orders.length === 0 ? (
        <p className="empty-text">No orders found.</p>
      ) : (
        <div className="admin-orders-table-wrapper">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th onClick={() => sortBy("order_no")}>Order No</th>
                <th onClick={() => sortBy("status")}>Status</th>
                <th onClick={() => sortBy("total")}>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[...orders]
                .sort((a, b) => {
                  const valA = a[sortKey];
                  const valB = b[sortKey];

                  if (typeof valA === "number") {
                    return sortDir === "asc" ? valA - valB : valB - valA;
                  }
                  return sortDir === "asc"
                    ? String(valA).localeCompare(String(valB))
                    : String(valB).localeCompare(String(valA));
                })
                .map((o) => (
                  <tr key={o.id}>
                    <td className="order-no">{o.order_no}</td>
                    <td>
                      <span className={`order-status ${o.status.toLowerCase()}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="order-total">
                      ₦{formatMoney(o.total)}
                    </td>
                    <td>
                      <Link to={`/admin/orders/${o.id}`} className="view-link">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="dashboard-footer">
        <Link to="/admin/orders" className="view-all-link">
          View all orders →
        </Link>
      </div>
    </div>
  );
}
