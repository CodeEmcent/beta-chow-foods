import React from "react";
import "../styles/Contact.css";

export default function Contact() {
  const whatsappLink = "https://wa.me/234XXXXXXXXXX"; // replace with real number
  const instagramLink = "https://instagram.com/betachowfoods"; // replace if different

  return (
    <div className="contact-page">
      <h1>Contact</h1>

      <div className="contact-card">
        <p><b>Address:</b> Beta Chow Foods and Services, Lagos, Nigeria</p>
        <p><b>Phone:</b> 0800-000-0000 (replace)</p>
        <p><b>Hours:</b> 9am – 9pm</p>

        <div className="contact-actions">
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn">
            WhatsApp
          </a>
          <a href={instagramLink} target="_blank" rel="noreferrer" className="btn">
            Instagram
          </a>
        </div>
      </div>

      <div className="contact-card">
        <h3>Find Us</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4015.5037579574223!2d3.3872606999999997!3d6.535498400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d007641fe43%3A0x75ebcc94f0ac4822!2sBeta%20chow%20foods%20and%20services!5e1!3m2!1sen!2suk!4v1769207245534!5m2!1sen!2suk"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: 12 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
