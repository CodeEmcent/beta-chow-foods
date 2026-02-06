import { useEffect, useState } from "react";
import { fetchMyOrders } from "../api/orders";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyOrders()
      .then(setOrders)
      .catch(() => setError("Failed to load orders"));
  }, []);

  return (
    <div className="page">
      <h2>My Orders</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((o) => (
            <li key={o.id}>
              <Link to={`/my-orders/${o.id}`}>
                {o.order_no} - {o.status} - ₦{o.total}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
