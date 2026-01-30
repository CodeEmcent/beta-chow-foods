import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { trackOrder } from "../api/orders";
import { formatMoney } from "../utils/money";
import "../styles/TrackOrder.css";


export default function TrackOrder() {
  const [orderNo, setOrderNo] = useState("");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setData(null);

    if (!orderNo.trim()) return setErr("Enter an order number.");

    try {
      setLoading(true);
      const res = await trackOrder(orderNo.trim());
      setData(res);
    } catch {
      setErr("Order not found or invalid order number.");
    } finally {
      setLoading(false);
    }
  }

  // Subtotal from items
  const subtotal = useMemo(() => {
    if (!data) return 0;
    return data.items.reduce(
      (sum, it) => sum + it.unit_price * it.quantity,
      0
    );
  }, [data]);

  const deliveryFee = data ? data.total - subtotal : 0;

  return (
    <div className="track-order">
      <h1>Track Order</h1>

      <form onSubmit={submit} className="track-form">
        <input
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
          placeholder="Enter order number (e.g. BC-XXXXXX)"
          className="track-order-input"
        />
        <button disabled={loading} className="track-order-btn">
          {loading ? "Tracking..." : "Track"}
        </button>
      </form>

      {loading && <p className="loading-text">Fetching order details…</p>}
      {err && <p className="error-text">{err}</p>}

      {data && (
        <>
          {/* ORDER REPORT (READ-ONLY) */}
          <div className="track-card">
            {/* STATUS + TOTAL */}
            <div className="track-meta">
              <div>
                <span className="label">Status</span>
                <span className={`status ${data.status}`}>
                  {data.status}
                </span>
              </div>

              <div>
                <span className="label">Total</span>
                <span className="total">
                  ₦{formatMoney(data.total)}
                </span>
              </div>
            </div>

            {data.status === "COMPLETED" && data.completed_at && (
              <p className="completed-text">
                Delivered on{" "}
                {new Date(data.completed_at).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}

            {/* ORDER TYPE */}
            <p className="order-type">
              <b>Order Type:</b> {data.order_type}
            </p>

            {/* ITEMS */}
            <h3>Items</h3>
            <ul className="track-items">
              {data.items.map((it, idx) => (
                <li key={idx}>
                  <span>
                    {it.name} × {it.quantity}
                  </span>
                  <span>
                    ₦{formatMoney(it.unit_price * it.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            {/* BREAKDOWN */}
            <div className="track-breakdown">
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

          {/* NEXT ACTIONS (SEPARATE SECTION) */}
          <div className="track-actions">
            <Link to="/menu" className="primary-action-btn">
              Order Again
            </Link>

            <Link to="/" className="secondary-action-btn">
              Go to Home
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
