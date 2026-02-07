import { useEffect, useState } from "react";
import { fetchMyOrders } from "../api/orders";
import { Link } from "react-router-dom";
import "../styles/MyOrders.css";
import { formatMoney } from "../utils/money";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders()
      .then(setOrders)
      .catch(() => setError("Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-card">
        <div className="orders-header">
          <h2>My Orders</h2>
          <p>View your previous orders and track your delivery status.</p>
        </div>

        {/* Loading */}
        {loading && <p className="orders-info">Loading your orders...</p>}

        {/* Error */}
        {error && <p className="orders-error">{error}</p>}

        {/* Empty */}
        {!loading && orders.length === 0 ? (
          <div className="orders-empty">
            <h3>No Orders Yet</h3>
            <p>You haven’t placed any orders yet. Browse our menu to get started.</p>

            <Link to="/menu" className="orders-btn">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((o) => (
              <Link
                to={`/my-orders/${o.id}`}
                key={o.id}
                className="order-box"
              >
                <div className="order-box-top">
                  <p className="order-no">{o.order_no}</p>

                  <span
                    className={`status-badge status-${o.status.toLowerCase()}`}
                  >
                    {o.status}
                  </span>
                </div>

                <div className="order-box-mid">
                  <p className="order-total">
                    Total: <span>₦{formatMoney(Number(o.total))}</span>
                  </p>

                  <p className="order-date">
                    {o.created_at ? new Date(o.created_at).toDateString() : ""}
                  </p>
                </div>

                <div className="order-box-bottom">
                  <span className="order-view-btn">View Order →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
