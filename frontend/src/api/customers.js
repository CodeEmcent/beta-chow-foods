import { apiFetch } from "./client";

export function fetchCustomers(token) {
  return apiFetch("/accounts/customers/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function toggleCustomer(token, id) {
  return apiFetch(`/accounts/customers/${id}/toggle/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
