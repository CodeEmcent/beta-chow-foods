import { apiFetch } from "./client";

export function fetchCategories() {
  return apiFetch("/api/menu/public/categories/");
}

export function fetchMenuItems(categoryId) {
  const q = categoryId ? `?category_id=${categoryId}` : "";
  return apiFetch(`/api/menu/public/items/${q}`);
}