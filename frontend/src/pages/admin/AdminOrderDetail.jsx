import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateOrder } from "../../api/admin";
import { apiFetch } from "../../api/client";
import "../../styles/adminOrderDetail.css";

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    setError("");
    apiFetch(`/orders/admin/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(setOrder)
      .catch(() => {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      });
  }, [id, token, navigate]);

  function changeStatus(status) {
    setUpdating(true);
    updateOrder(id, { status }, token)
      .then(setOrder)
      .catch(() => setError("Failed to update order status."))
      .finally(() => setUpdating(false));
  }

  if (error) return <p className="admin-error">{error}</p>;
  if (!order) return <p className="admin-loading">Loading order details...</p>;

  return (
    <div className="admin-order-detail">
      <h1 className="order-title">Order {order.order_no}</h1>

      <div className="order-meta">
        <p>
          <strong>Status:</strong>{" "}
          <span className={`status-badge status-${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </p>

        <select
          className="status-select"
          value={order.status}
          onChange={(e) => changeStatus(e.target.value)}
          disabled={updating}
        >
          <option value="NEW">New</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="COOKING">Cooking</option>
          <option value="OUT_FOR_DELIVERY">Out for delivery</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="order-section">
        <h3>Customer</h3>
        <p><strong>Name:</strong> {order.customer?.full_name}</p>
        <p><strong>Phone:</strong> {order.customer?.phone}</p>
        {order.customer?.email && (
          <p><strong>Email:</strong> {order.customer.email}</p>
        )}
      </div>

      <div className="order-section">
        <h3>Delivery Details</h3>
        <p><strong>Type:</strong> {order.order_type}</p>
        {order.delivery_address && (
          <p><strong>Address:</strong> {order.delivery_address}</p>
        )}
        {order.landmark && (
          <p><strong>Landmark:</strong> {order.landmark}</p>
        )}
      </div>

      <div className="order-section">
        <h3>Items</h3>
        <ul className="order-items">
          {order.items?.map((i) => (
            <li key={i.id}>
              {i.name} × {i.quantity}
            </li>
          ))}
        </ul>
      </div>

      <div className="order-section">
        <h3>Payment</h3>
        <p><strong>Method:</strong> {order.payment_method}</p>
        {order.payment_reference && (
          <p><strong>Reference:</strong> {order.payment_reference}</p>
        )}
      </div>

      <div className="order-summary">
        <p><strong>Subtotal:</strong> ₦{order.subtotal}</p>
        <p><strong>Delivery Fee:</strong> ₦{order.delivery_fee}</p>
        <p className="order-total">
          <strong>Total:</strong> ₦{order.total}
        </p>
      </div>
    </div>
  );
}
