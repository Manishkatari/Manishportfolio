import React, { useState } from "react";
import Button from "./Button";
import { sendContactForm } from "../api/Api";

const ContactForm = () => {
  const [formMessage, setFormMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage(""); // Clear previous messages

    // Basic email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      setFormMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };
      const response = await sendContactForm(payload);
      if (response?.success) {
        setFormMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormMessage(
          response?.message || "Message sending failed. Please try again.",
        );
      }
    } catch (error) {
      setFormMessage("An error occurred. Please try again later.");
      console.error("Error sending form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className=" card about-card mb-4">
      <div className="card-body ">
        <h5 className="card-title mb-4">Contact Me</h5>
        <div className="timeline">
          <div className="timeline-item">
            {formMessage && (
              <div
                className={`alert ${
                  formMessage === "Message sent successfully!"
                    ? "alert-success"
                    : "alert-danger"
                } text-center`}
                role="alert"
              >
                {formMessage}
              </div>
            )}

            <form
              className="contact-form col-lg-6 col-md-8 col-12 mx-auto"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Your Message:
                </label>
                <textarea
                  id="message"
                  className="form-control"
                  placeholder="Your Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                ></textarea>
              </div>
              {/* Or fallback to native button */}
              <button
                className="btn btn-primary w-100 send-btn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
