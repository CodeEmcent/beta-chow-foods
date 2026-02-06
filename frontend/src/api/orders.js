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
