import { apiFetch } from "./client";

export function fetchCategories() {
  return apiFetch("/menu/categories/");
}

export function fetchMenuItems(categoryId) {
  const q = categoryId ? `?category=${categoryId}` : "";
  return apiFetch(`/menu/items/${q}`);
}
