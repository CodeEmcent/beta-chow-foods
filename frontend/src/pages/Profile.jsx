import { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../api/profile";
import "../styles/Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile()
      .then(setProfile)
      .catch(() => setError("Failed to load profile"));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setError("");
    setSaving(true);

    updateProfile({
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone,
    })
      .then((res) => {
        setProfile(res);
        setMsg("Profile updated successfully");
      })
      .catch(() => setError("Failed to update profile"))
      .finally(() => setSaving(false));
  }

  if (!profile) return <p className="account-info">Loading profile...</p>;

  return (
    <div className="account-page">
      <div className="account-card">
        <h2 className="account-title">My Profile</h2>
        <p className="account-subtitle">
          Update your personal details for smooth delivery experience.
        </p>

        {msg && <p className="account-success">{msg}</p>}
        {error && <p className="account-error">{error}</p>}

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>First Name</label>
            <input
              value={profile.first_name || ""}
              onChange={(e) =>
                setProfile({ ...profile, first_name: e.target.value })
              }
              placeholder="Enter first name"
            />
          </div>

          <div className="form-row">
            <label>Last Name</label>
            <input
              value={profile.last_name || ""}
              onChange={(e) =>
                setProfile({ ...profile, last_name: e.target.value })
              }
              placeholder="Enter last name"
            />
          </div>

          <div className="form-row">
            <label>Phone</label>
            <input
              value={profile.phone || ""}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              placeholder="e.g. 0806 085 4010"
            />
          </div>

          <button className="account-btn" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
