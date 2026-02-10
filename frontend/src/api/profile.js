import { apiFetch } from "./client";

export function fetchProfile() {
  return apiFetch("/api/accounts/profile/");
}

export function updateProfile(data) {
  return apiFetch("/api/accounts/profile/", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
