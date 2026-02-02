import { apiFetch, API_BASE } from "./client";

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

/* MENU */
export function fetchMenu(token) {
  return apiFetch("/menu/items/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function fetchCategories(token) {
  return apiFetch("/menu/categories/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function createMenuItem(token, data) {
  return apiFetch("/menu/items/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export function toggleMenuItem(token, id, is_available) {
  return apiFetch("/menu/items/${id}/", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ is_available }),
  });
}
