import React from "react";
import "../styles/Contact.css";

export default function Contact() {
  const whatsappLink = "https://wa.me/2347062163979";
  const instagramLink = "https://instagram.com/betachowfoods";

  return (
    <div className="contact-page">

      <div className="contact-container">
        <h1 className="page-title">Contact Us</h1>

        <div className="contact-grid">
          <div className="contact-card light-card">
            <div className="contact-info">
              <p><span>📍 Address</span>  
                5 Abule Okuta Road, Bariga, Lagos
              </p>

              <p><span>📞 Phone</span>  
                0806 085 4010
              </p>

              <p><span>🕘 Hours</span>  
                9:00 AM – 9:00 PM (Daily)
              </p>
            </div>

            <div className="contact-actions">
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="social-btn whatsapp"
    >
      WhatsApp
    </a>

    <a
      href={instagramLink}
      target="_blank"
      rel="noreferrer"
      className="social-btn instagram"
    >
      Instagram
    </a>
  </div>
          </div>

          <div className="contact-card light-card">
            <h3 className="section-title">Find Us</h3>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4015.5037579574223!2d3.3872606999999997!3d6.535498400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d007641fe43%3A0x75ebcc94f0ac4822!2sBeta%20chow%20foods%20and%20services!5e1!3m2!1sen!2suk!4v1769207245534!5m2!1sen!2suk"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: 12 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
