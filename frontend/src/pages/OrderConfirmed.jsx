import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { trackOrder } from "../api/orders";
import Loading from "../components/Loading";
import "../styles/OrderConfirmed.css";

export default function OrderConfirmed() {
  const { orderNo } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await trackOrder(orderNo);
        setData(res);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [orderNo]);

  return (
    <div className="order-confirmed">
      <h1>Order Confirmed ✅</h1>
      <p className="order-number">
        Your order number is: <b>{orderNo}</b>
      </p>

      {err ? <p className="error-text">{err}</p> : null}

      {data ? (
        <div className="order-card">
          <p><b>Status:</b> {data.status}</p>
          <p><b>Total:</b> ₦{data.total}</p>

          <h3>Items</h3>
          <ul className="order-items">
            {data.items.map((it, idx) => (
              <li key={idx}>
                {it.name} x{it.quantity} — ₦{it.unit_price}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Loading text="Fetching order..." />
      )}

      <div className="order-actions">
        <Link to="/menu" className="btn">Order Again</Link>
        <Link to="/track" className="btn">Track Order</Link>
      </div>
    </div>
  );
}
