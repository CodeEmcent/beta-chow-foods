import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateOrder } from "../../api/admin";
import { apiFetch } from "../../api/client";
import { formatMoney } from "../../utils/money";
import "../../styles/adminOrderDetail.css";

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  // ✅ FULL STATUS LIST (always visible)
  const statuses = [
    "NEW",
    "ACCEPTED",
    "COOKING",
    "OUT_FOR_DELIVERY",
    "COMPLETED",
    "CANCELLED",
  ];

  const statusLabels = {
    NEW: "New",
    ACCEPTED: "Accepted",
    COOKING: "Cooking",
    OUT_FOR_DELIVERY: "Out for delivery",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  };

  // ✅ Allowed workflow transitions
  const allowedTransitions = {
    NEW: ["ACCEPTED", "CANCELLED"],
    ACCEPTED: ["COOKING", "CANCELLED"],
    COOKING: ["OUT_FOR_DELIVERY", "CANCELLED"],
    OUT_FOR_DELIVERY: ["COMPLETED", "CANCELLED"],
    COMPLETED: [],
    CANCELLED: [],
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    setError("");

    apiFetch(`/api/orders/admin/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(setOrder)
      .catch(() => {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      });
  }, [id, token, navigate]);

  async function changeStatus(newStatus) {
    if (!order) return;

    setError("");

    // If same status selected, ignore
    if (newStatus === order.status) return;

    const allowedNext = allowedTransitions[order.status] || [];

    // ❌ If admin tries to jump, show friendly error message
    if (!allowedNext.includes(newStatus)) {
      return setError(
        `You cannot move from "${statusLabels[order.status]}" to "${statusLabels[newStatus]}". 
        Please follow the correct workflow order.`
      );
    }

    // ✅ Confirmation for risky statuses
    if (newStatus === "CANCELLED") {
      const confirmCancel = window.confirm(
        "Are you sure you want to CANCEL this order?\n\nThis should only be done if the customer cancels."
      );
      if (!confirmCancel) return;
    }

    if (newStatus === "COMPLETED") {
      const confirmComplete = window.confirm(
        "Are you sure you want to mark this order as COMPLETED?\n\nOnly do this after delivery is confirmed."
      );
      if (!confirmComplete) return;
    }

    setUpdating(true);

    try {
      const updated = await updateOrder(id, { 
        status: newStatus,
        force: true,
      });
      setOrder(updated);
    } catch (err) {
      if (err?.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Failed to update order status. Please try again.");
      }
    } finally {
      setUpdating(false);
    }
  }

  async function forceChangeStatus(newStatus) {
    if (!order) return;

    const confirmOverride = window.confirm(
      `⚠️ You are forcing a status change.\n\nMove order from "${statusLabels[order.status]}" to "${statusLabels[newStatus]}"?\n\nContinue?`
    );

    if (!confirmOverride) return;

    setUpdating(true);
    setError("");

    try {
      const updated = await updateOrder(
        id,
        { status: newStatus, force: true },
        token
      );
      setOrder(updated);
    } catch (err) {
      if (err?.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Override failed. Please try again.");
      }
    } finally {
      setUpdating(false);
    }
  }

  if (!order) return <p className="admin-loading">Loading order details...</p>;

  const allowedNext = allowedTransitions[order.status] || [];

  return (
    <div className="admin-order-detail">
      <h1 className="order-title">Order {order.order_no}</h1>

      <div className="order-meta">
        <p>
          <strong>Status:</strong>{" "}
          <span className={`status-badge status-${order.status.toLowerCase()}`}>
            {statusLabels[order.status]}
          </span>
        </p>

        <select
          className="status-select"
          value={order.status}
          disabled={updating}
          onChange={(e) => changeStatus(e.target.value)}
        >
          {statuses.map((s) => (
            <option
              key={s}
              value={s}
              disabled={s !== order.status && !allowedNext.includes(s)}
            >
              {statusLabels[s]}
            </option>
          ))}
        </select>

        {(order.status === "CANCELLED" || order.status === "COMPLETED") && (
          <div style={{ marginTop: "12px" }}>
            <button
              className="override-btn"
              disabled={updating}
              onClick={() => forceChangeStatus("NEW")}
            >
              Reopen Order
            </button>
          </div>
        )}
      </div>

      {/* ✅ Friendly admin error message */}
      {error && <p className="admin-error">{error}</p>}

      <div className="order-section">
        <h3>Customer</h3>
        <p>
          <strong>Name:</strong> {order.customer?.full_name}
        </p>
        <p>
          <strong>Phone:</strong> {order.customer?.phone}
        </p>
        {order.customer?.email && (
          <p>
            <strong>Email:</strong> {order.customer.email}
          </p>
        )}
      </div>

      <div className="order-section">
        <h3>Delivery Details</h3>
        <p>
          <strong>Type:</strong> {order.order_type}
        </p>
        {order.delivery_address && (
          <p>
            <strong>Address:</strong> {order.delivery_address}
          </p>
        )}
        {order.landmark && (
          <p>
            <strong>Landmark:</strong> {order.landmark}
          </p>
        )}
      </div>

      <div className="order-section">
        <h3>Items</h3>
        <ul className="order-items">
          {order.items?.map((i) => (
            <li key={i.id} className="order-item">
              <div className="item-name">{i.name}</div>
              <div className="item-pricing">
                ₦{formatMoney(i.unit_price)} × {i.quantity}
                <span className="item-total">
                  {" "}
                  = ₦{formatMoney(i.unit_price * i.quantity)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-section">
        <h3>Payment</h3>
        <p>
          <strong>Method:</strong> {order.payment_method}
        </p>
        {order.payment_reference && (
          <p>
            <strong>Reference:</strong> {order.payment_reference}
          </p>
        )}
      </div>

      <div className="order-summary">
        <p>
          <strong>Subtotal:</strong> ₦{formatMoney(order.subtotal)}
        </p>
        <p>
          <strong>Delivery Fee:</strong> ₦{formatMoney(order.delivery_fee)}
        </p>
        <p className="order-total">
          <strong>Total:</strong> ₦{formatMoney(order.total)}
        </p>
      </div>
    </div>
  );
}