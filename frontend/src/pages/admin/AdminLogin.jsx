import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../api/admin";
import "../../styles/adminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await adminLogin(username, password);
      localStorage.setItem("admin_token", res.access);
      navigate("/admin"); // ✅ Redirect after successful login
    } catch {
      setErr("Invalid username or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      <p class="admin-subtitle">Internal Management Portal</p>

      {err && <p className="admin-login-error">{err}</p>}

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
