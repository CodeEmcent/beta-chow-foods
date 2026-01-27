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
