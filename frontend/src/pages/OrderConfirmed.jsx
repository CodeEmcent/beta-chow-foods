import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { trackOrder } from "../api/orders";
import Loading from "../components/Loading";
import "../styles/OrderConfirmed.css";
import { formatMoney } from "../utils/money";


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

  // Calculate subtotal from items
  const subtotal = useMemo(() => {
    if (!data) return 0;
    return data.items.reduce(
      (sum, it) => sum + it.unit_price * it.quantity,
      0
    );
  }, [data]);

  // Delivery fee = total - subtotal
  const deliveryFee = data ? data.total - subtotal : 0;

  return (
    <div className="order-confirmed">
      <h1>Order Confirmed ✅</h1>

      <p className="order-number">
        Your order number is: <b>{orderNo}</b>
      </p>

      {err && <p className="error-text">{err}</p>}

      {!data ? (
        <Loading text="Fetching order..." />
      ) : (
        <div className="order-card">
          {/* STATUS + TOTAL */}
          <div className="order-meta">
            <div>
              <span className="label">Status</span>
              <span className="value status">{data.status}</span>
            </div>

            <div>
              <span className="label">Total</span>
              <span className="value total">
                ₦{formatMoney(data.total)}
              </span>
            </div>
          </div>

          {/* COMPLETION CONFIRMATION */}
          {data.status === "COMPLETED" && data.completed_at && (
  <p className="completed-text">
    Delivered on{" "}
    {new Date(data.completed_at).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    })}
  </p>
)}

          {/* ITEMS */}
          <h3>Items Ordered</h3>

          <ul className="order-items">
            {data.items.map((it, idx) => (
              <li key={idx} className="order-item">
                <span>
                  {it.name} × {it.quantity}
                </span>
                <span>
                  ₦{formatMoney(it.unit_price * it.quantity)}
                </span>
              </li>
            ))}
          </ul>

          {/* COST BREAKDOWN */}
          <div className="order-breakdown">
            <div>
              <span>Subtotal</span>
              <span>₦{formatMoney(subtotal)}</span>
            </div>

            <div>
              <span>Delivery Fee</span>
              <span>₦{formatMoney(deliveryFee)}</span>
            </div>

            <div className="grand-total">
              <span>Total Paid</span>
              <span>₦{formatMoney(data.total)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="order-actions">
        <Link to="/menu" className="btn">Order Again</Link>
        <Link to="/track" className="btn">Track Order</Link>
      </div>
    </div>
  );
}
