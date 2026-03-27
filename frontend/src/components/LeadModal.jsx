import React, { useEffect, useState } from "react";

const customerInitial = {
  full_name: "",
  email: "",
  phone: "",
  city: "",
  event_type: "",
  event_date: "",
  service_type: "",
  notes: "",
};

const creatorInitial = {
  full_name: "",
  email: "",
  phone: "",
  city: "",
  instagram_handle: "",
  experience_years: "",
  gear: "",
  categories: "",
  portfolio_url: "",
  notes: "",
};

export default function LeadModal({ type, isOpen, onClose, apiBaseUrl }) {
  const isCustomer = type === "customer";

  const [form, setForm] = useState(isCustomer ? customerInitial : creatorInitial);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(isCustomer ? customerInitial : creatorInitial);
    setLoading(false);
    setSuccess("");
    setError("");
  }, [isCustomer, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetState = () => {
    setForm(isCustomer ? customerInitial : creatorInitial);
    setLoading(false);
    setSuccess("");
    setError("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!apiBaseUrl) {
        throw new Error("API base URL is missing. Check VITE_API_BASE_URL.");
      }

      const endpoint = isCustomer
        ? `${apiBaseUrl}/api/bookings`
        : `${apiBaseUrl}/api/creators`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Something went wrong");
      }

      setSuccess(
        isCustomer
          ? "Booking inquiry submitted."
          : "Creator application submitted."
      );
      setForm(isCustomer ? customerInitial : creatorInitial);
    } catch (err) {
      setError(err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-modal-overlay">
      <div className="lead-modal-card">
        <div className="lead-modal-head">
          <div>
            <h3>{isCustomer ? "Book now" : "Join as a creator"}</h3>
            <p>
              {isCustomer
                ? "Tell us about your shoot and we’ll match you."
                : "Apply to join the Capturr creator network."}
            </p>
          </div>
          <button className="lead-close-btn" type="button" onClick={handleClose}>
            ✕
          </button>
        </div>

        <form className="lead-form" onSubmit={handleSubmit}>
          <div className="lead-grid">
            <input
              name="full_name"
              placeholder="Full name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
            />

            {isCustomer ? (
              <>
                <input
                  name="event_type"
                  placeholder="Event type"
                  value={form.event_type}
                  onChange={handleChange}
                  required
                />
                <input
                  name="event_date"
                  type="date"
                  value={form.event_date}
                  onChange={handleChange}
                  required
                />
                <select
                  name="service_type"
                  value={form.service_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select service</option>
                  <option value="photography">Photography</option>
                  <option value="videography">Videography</option>
                  <option value="both">Photography + Videography</option>
                </select>
              </>
            ) : (
              <>
                <input
                  name="instagram_handle"
                  placeholder="Instagram handle"
                  value={form.instagram_handle}
                  onChange={handleChange}
                />
                <input
                  name="experience_years"
                  placeholder="Years of experience"
                  value={form.experience_years}
                  onChange={handleChange}
                  required
                />
                <input
                  name="categories"
                  placeholder="Categories (weddings, portraits, events...)"
                  value={form.categories}
                  onChange={handleChange}
                  required
                />
                <input
                  name="portfolio_url"
                  placeholder="Portfolio URL"
                  value={form.portfolio_url}
                  onChange={handleChange}
                />
                <input
                  name="gear"
                  placeholder="Camera / gear"
                  value={form.gear}
                  onChange={handleChange}
                />
              </>
            )}
          </div>

          <textarea
            name="notes"
            placeholder={isCustomer ? "Tell us about your shoot" : "Tell us about your work"}
            value={form.notes}
            onChange={handleChange}
            rows="4"
          />

          {success && <div className="lead-success">{success}</div>}
          {error && <div className="lead-error">{error}</div>}

          <div className="lead-actions">
            <button type="button" className="btn btn-glass" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Submitting..." : isCustomer ? "Submit inquiry" : "Submit application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}