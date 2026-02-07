import { apiFetch } from "./client";

export function fetchAdminAnalytics(token) {
  return apiFetch("/orders/admin/analytics/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
