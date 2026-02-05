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

/* MENU */
export const fetchMenu = (token, qs = "") =>
  apiFetch(`/menu/items/${qs.startsWith("?") ? qs : qs ? "?" + qs : ""}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchCategories = (token) =>
  apiFetch(`/menu/categories/`, { headers: { Authorization: `Bearer ${token}` } });

export const createMenuItem = (token, data) =>
  apiFetch(`/menu/items/`, { method:"POST", headers:{ Authorization:`Bearer ${token}` }, body: JSON.stringify(data) });

export const updateMenuItem = (token, id, data) =>
  apiFetch(`/menu/items/${id}/`, { method:"PATCH", headers:{ Authorization:`Bearer ${token}` }, body: JSON.stringify(data) });

export const deleteMenuItem = (token, id) =>
  apiFetch(`/menu/items/${id}/`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });

export const bulkMenuAction = (token, action, ids, payload={}) =>
  apiFetch(`/menu/items/bulk/`, { method:"POST", headers:{ Authorization:`Bearer ${token}` }, body: JSON.stringify({ action, ids, payload }) });

/* CATEGORY CRUD */
export const createCategory = (token, data) =>
  apiFetch(`/menu/categories/`, { method:"POST", headers:{ Authorization:`Bearer ${token}` }, body: JSON.stringify(data) });

export const updateCategory = (token, id, data) =>
  apiFetch(`/menu/categories/${id}/`, { method:"PATCH", headers:{ Authorization:`Bearer ${token}` }, body: JSON.stringify(data) });

export const deleteCategory = (token, id) =>
  apiFetch(`/menu/categories/${id}/`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });


export const toggleMenuItem = (token, id, is_available) =>
  apiFetch(`/menu/items/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ is_available }),
  });
