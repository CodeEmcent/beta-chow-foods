import { apiFetch } from "./client";

export function fetchAdminAnalytics() {
  return apiFetch("/api/orders/admin/analytics/");
}