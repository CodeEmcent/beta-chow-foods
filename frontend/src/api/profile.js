import { apiFetch } from "./client";

export function fetchProfile() {
  return apiFetch("/accounts/profile/");
}

export function updateProfile(data) {
  return apiFetch("/accounts/profile/", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
