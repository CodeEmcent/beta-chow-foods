import { apiFetch } from "./client";

export function fetchCustomers() {
  return apiFetch("/api/accounts/customers/");
}

export function toggleCustomer(id) {
  return apiFetch(`/api/accounts/customers/${id}/toggle/`, {
    method: "PATCH",
  });
}