import { apiFetch, API_BASE } from "./client";

export function createOrder(payload) {
  return apiFetch("/api/orders/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function trackOrder(orderNo) {
  return apiFetch(`/api/orders/track/${orderNo}/`);
}

/* ✅ Customer order history */
export function fetchMyOrders() {
  return apiFetch("/api/orders/my/");
}

/* ✅ Customer order detail */
export function fetchMyOrderDetail(id) {
  return apiFetch(`/api/orders/my/${id}/`);
}

/* ✅ WhatsApp order */
export async function createWhatsAppOrder(payload) {
  const res = await fetch(`${API_BASE}/api/orders/whatsapp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail || "Failed to create WhatsApp order");
  }

  return res.json();
}