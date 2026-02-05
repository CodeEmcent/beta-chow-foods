import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    apiFetch("/accounts/profile/")
      .then(setProfile);
  }, []);

  if (!profile) return <p>Loading…</p>;

  return (
    <div>
      <h2>My Profile</h2>
      <p>Email: {profile.email}</p>
      <p>Name: {profile.first_name} {profile.last_name}</p>
    </div>
  );
}
