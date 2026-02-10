export const API_BASE = import.meta.env.VITE_API_URL;

export async function apiFetch(url, options = {}) {
  const headers = { ...(options.headers || {}) };

  const token =
    localStorage.getItem("admin_token") ||
    localStorage.getItem("access_token");

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("admin_token");

    if (window.location.pathname.startsWith("/admin")) {
      window.location.href = "/admin/login";
    } else {
      window.location.href = "/login";
    }
    return;
  }

  if (!res.ok) {
    throw new Error(await res.text());
  }

  if (res.status === 204) return null;
  return res.json();
}