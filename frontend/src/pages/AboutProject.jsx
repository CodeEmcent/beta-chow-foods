import React from "react";
import "../styles/AboutProject.css";

export default function AboutProject() {
  return (
    <div className="about-project">
      <h1>About This Project</h1>

      <section>
        <h2>Project Overview</h2>
        <p>
          This is a real-world full-stack food ordering system built for a Lagos-based restaurant (Beta Chow Foods).
          It enables customers to browse meals, place orders online, and track order status in real time.
        </p>
      </section>

      <section>
        <h2>Problem It Solves</h2>
        <ul>
          <li>Eliminates manual order taking via calls and chats</li>
          <li>Reduces order errors</li>
          <li>Improves customer experience</li>
          <li>Creates a digital presence for a local SME</li>
        </ul>
      </section>

      <section>
        <h2>Key Features</h2>
        <ul>
          <li>Online food ordering (Django REST + React)</li>
          <li>Cart and checkout system</li>
          <li>Order tracking by order number</li>
          <li>Lagos delivery logic</li>
          <li>WhatsApp fallback ordering</li>
          <li>Admin management via Django Admin</li>
        </ul>
      </section>

      <section>
        <h2>Technology Stack</h2>
        <ul>
          <li><b>Frontend:</b> React (Vite)</li>
          <li><b>Backend:</b> Django + Django REST Framework</li>
          <li><b>Database:</b> PostgreSQL (or SQLite for dev)</li>
          <li><b>Deployment:</b> Planned (Netlify + Render)</li>
        </ul>
      </section>

      <section>
        <h2>My Role</h2>
        <p>
          I designed, developed, and integrated the full system as part of my MSc in Management of Business Information Technology,
          focusing on IT–business alignment, SME digital transformation, and real-world system deployment.
        </p>
      </section>
    </div>
  );
}
