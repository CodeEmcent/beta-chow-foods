import { apiFetch, API_BASE } from "./client";

/* ============================
   AUTH
============================ */

export function adminLogin(username, password) {
  return apiFetch("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

/* ============================
   ORDERS
============================ */

export function fetchAllOrders(status = "") {
  const q = status ? `?status=${status}` : "";
  return apiFetch(`/api/orders/admin/${q}`);
}

export function updateOrder(id, payload) {
  return apiFetch(`/api/orders/admin/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function fetchSalesSummary() {
  return apiFetch("/api/orders/admin/summary/");
}

/* ============================
   MENU ITEMS
============================ */

export const fetchMenu = (qs = "") =>
  apiFetch(`/api/menu/items/${qs.startsWith("?") ? qs : qs ? "?" + qs : ""}`);

export const fetchCategories = () =>
  apiFetch("/api/menu/categories/");

/* ============================
   CREATE / UPDATE MENU ITEM (FormData)
============================ */

export const createMenuItem = async (formData) => {
  const token =
    localStorage.getItem("admin_token") ||
    localStorage.getItem("access_token");

  const res = await fetch(`${API_BASE}/api/menu/items/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // Do NOT set Content-Type for FormData
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};

export const updateMenuItem = async (id, formData) => {
  const token =
    localStorage.getItem("admin_token") ||
    localStorage.getItem("access_token");

  const res = await fetch(`${API_BASE}/api/menu/items/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};

export const deleteMenuItem = (id) =>
  apiFetch(`/api/menu/items/${id}/`, { method: "DELETE" });

export const bulkMenuAction = (action, ids, payload = {}) =>
  apiFetch(`/api/menu/items/bulk/`, {
    method: "POST",
    body: JSON.stringify({ action, ids, payload }),
  });

/* ============================
   CATEGORY CRUD
============================ */

export const createCategory = (data) =>
  apiFetch(`/api/menu/categories/`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateCategory = (id, data) =>
  apiFetch(`/api/menu/categories/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteCategory = (id) =>
  apiFetch(`/api/menu/categories/${id}/`, {
    method: "DELETE",
  });

export const toggleMenuItem = (id, is_available) =>
  apiFetch(`/api/menu/items/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({ is_available }),
  });