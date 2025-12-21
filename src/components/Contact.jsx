import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact-page">
      <h2>Contact</h2>
      <p className="contact-intro">
        Feel free to reach out!
      </p>

      <div className="contact-methods">
        <div className="contact-item">
          <h3>Email</h3>
          <a href="mailto:yourname@email.com">vhunany@unc.edu</a>
        </div>

        <div className="contact-item">
          <h3>Socials</h3>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/viktorya-hunanyan-8b57bb29a/" target="_blank" rel="noreferrer">LinkedIn</a>
            {/* <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a> */}
          </div>
        </div>
      </div>
    </section>
  );
}