import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMyOrderDetail } from "../api/orders";
import { formatMoney } from "../utils/money";
import "../styles/orderDetail.css";

export default function MyOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchMyOrderDetail(id).then(setOrder);
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="order-detail-page">
      <div className="order-detail-header">
        
        {/* ✅ TITLE ROW */}
        <div className="order-title-row">
          <h2>Order: {order.order_no}</h2>

          <span className={`order-status-badge ${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </div>

        <p className="order-detail-meta">
          <strong>Status:</strong>{" "}
          <span className={`order-status-text ${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </p>

        <p className="order-detail-meta">
          <strong>Total:</strong> ₦{formatMoney(Number(order.total))}
        </p>
      </div>

      <div className="order-items-section">
        <h3>Items</h3>

        <div className="order-items-table">
          <div className="order-items-header">
            <span>Item</span>
            <span>Unit Price</span>
            <span>Qty</span>
            <span>Subtotal</span>
          </div>

          {order.items.map((item, idx) => {
            const subtotal = Number(item.unit_price) * Number(item.quantity);

            return (
              <div key={idx} className="order-item-row">
                <span className="order-item-name">{item.name}</span>
                <span>₦{formatMoney(Number(item.unit_price))}</span>
                <span>{item.quantity}</span>
                <span className="order-item-subtotal">
                  ₦{formatMoney(subtotal)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="order-summary-box">
        <h4>Order Summary</h4>
        <p>
          <strong>Total Items:</strong> {order.items.length}
        </p>
        <p>
          <strong>Total Amount:</strong> ₦{formatMoney(Number(order.total))}
        </p>
      </div>

      <Link to="/my-orders" className="order-back-btn">
        ← Back to Orders
      </Link>
    </div>
  );
}