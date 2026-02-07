import { apiFetch } from "./client";

export function createOrder(payload) {
  return apiFetch("/orders/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function trackOrder(orderNo) {
  return apiFetch(`/orders/track/${orderNo}/`);
}

/* ✅ NEW: Customer order history */
export function fetchMyOrders() {
  return apiFetch("/orders/my/");
}

/* ✅ NEW: Customer order detail */
export function fetchMyOrderDetail(id) {
  return apiFetch(`/orders/my/${id}/`);
}

export async function createWhatsAppOrder(payload) {
  const res = await fetch("http://127.0.0.1:8000/api/orders/whatsapp/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail || "Failed to create WhatsApp order");
  }

  return res.json(); // { order_no, whatsapp_url, message }
}
