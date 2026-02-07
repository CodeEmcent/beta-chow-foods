import { apiFetch } from "./client";

export function fetchCategories() {
  return apiFetch("/menu/public/categories/");
}

export function fetchMenuItems(categoryId) {
  const q = categoryId ? `?category_id=${categoryId}` : "";
  return apiFetch(`/menu/public/items/${q}`);
}
