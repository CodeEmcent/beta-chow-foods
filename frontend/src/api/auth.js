import { apiFetch } from "./client";

export function signupCustomer(data) {
  return apiFetch("/api/accounts/signup/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function loginCustomer(email, password) {
  return apiFetch("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify({
      username: email,   // 🔥 IMPORTANT FIX
      password: password,
    }),
  });
}
