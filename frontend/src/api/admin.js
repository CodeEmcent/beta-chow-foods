import { apiFetch } from "./client";

export function adminLogin(username, password) {
  return apiFetch("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function fetchAllOrders(token, status = "") {
  const q = status ? `?status=${status}` : "";
  return apiFetch(`/orders/admin/${q}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updateOrder(id, payload, token) {
  return apiFetch(`/orders/admin/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}
