import { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../api/profile";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchProfile().then(setProfile);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    updateProfile({
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone,
    }).then((res) => {
      setProfile(res);
      setMsg("Profile updated successfully");
    });
  }

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>My Profile</h2>

      {msg && <p style={{ color: "green" }}>{msg}</p>}

      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          value={profile.first_name || ""}
          onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
        />

        <label>Last Name</label>
        <input
          value={profile.last_name || ""}
          onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
        />

        <label>Phone</label>
        <input
          value={profile.phone || ""}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
