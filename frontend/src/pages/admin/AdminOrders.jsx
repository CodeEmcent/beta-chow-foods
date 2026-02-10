import { useEffect, useState } from "react";
import { fetchAllOrders } from "../../api/admin";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney } from "../../utils/money";
import "../../styles/admin.css";

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("order_no");
  const [sortDir, setSortDir] = useState("asc");

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) navigate("/admin/login");

    setLoading(true);
    fetchAllOrders(status)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [token, status, navigate]);

  function sortBy(key) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <div className="admin-dashboard">
      <h2>All Orders</h2>

      <div className="admin-filters">
        <label>Status:</label>
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

      {loading ? (
        <p className="loading-text">Loading orders...</p>
      ) : (
        <div className="admin-orders-table-wrapper">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th onClick={() => sortBy("order_no")}>Order</th>
                <th onClick={() => sortBy("status")}>Status</th>
                <th onClick={() => sortBy("total")}>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[...orders]
                .sort((a, b) =>
                  sortDir === "asc"
                    ? String(a[sortKey]).localeCompare(String(b[sortKey]))
                    : String(b[sortKey]).localeCompare(String(a[sortKey]))
                )
                .map((o) => (
                  <tr key={o.id}>
                    <td>{o.order_no}</td>
                    <td>
                      <span className={`order-status ${o.status.toLowerCase()}`}>
                        {o.status}
                      </span>
                    </td>
                    <td>₦{formatMoney(o.total)}</td>
                    <td>
                      <Link to={`/api/admin/orders/${o.id}`} className="view-link">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
