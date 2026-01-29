import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">

        {/* Page Title */}
        <h1 className="page-title">About Us</h1>

        {/* Intro Card */}
        <div className="about-card">
          <h3>Who We Are</h3>
          <p>
            <strong>Beta Chow Foods</strong> is a Lagos-based food business
            committed to preparing fresh, delicious Nigerian meals daily.
            We serve individuals, families, offices, and small events across
            major areas in Lagos.
          </p>

          <p>
            Our focus is simple — quality food, honest pricing, and reliable
            service you can trust.
          </p>
        </div>

        {/* Values */}
        <div className="about-card">
          <h3>What Makes Us Different</h3>

          <ul className="about-list">
            <li>Fresh ingredients cooked daily</li>
            <li>Hygienic food preparation standards</li>
            <li>Clear pricing with no hidden charges</li>
            <li>Reliable delivery and pickup options</li>
          </ul>
        </div>

        {/* Location & CTA */}
        <div className="about-card">
          <h3>Serving Lagos</h3>
          <p>
            We are proudly based in <strong>Bariga, Lagos</strong>, and deliver
            across nearby locations including Yaba, Shomolu, Surulere, and
            surrounding areas.
          </p>

          <p>
            Have questions or want to place an order?
          </p>

          <div className="about-actions">
            <a href="/menu" className="btn primary">
              View Menu
            </a>
            <a href="/contact" className="btn secondary">
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
