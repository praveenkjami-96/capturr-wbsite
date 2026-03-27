import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  BadgeCheck,
  MapPinned,
  CloudUpload,
  Camera,
  CalendarDays,
  Clock3,
  MapPin,
  Star,
  Zap,
  ShieldCheck,
  GalleryVerticalEnd,
} from "lucide-react";
import logo from "./assets/capturr-logo-light.png";
import "./styles.css";

const heroRow1 = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
];

const heroRow2 = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=1400&q=80",
];

const heroRow3 = [
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1400&q=80",
];

const stats = [
  { value: "< 1 min", label: "to request a creator" },
  { value: "Live", label: "creator status" },
  { value: "Fast", label: "delivery loop" },
  { value: "Premium", label: "customer experience" },
];

const featureCards = [
  {
    icon: MapPinned,
    title: "Instant matching",
    text: "Get matched with nearby creators in seconds.",
  },
  {
    icon: CloudUpload,
    title: "Live updates",
    text: "Keep customers informed while the creator is on the way and the shoot is in progress.",
  },
  {
    icon: Camera,
    title: "Creator workflow",
    text: "A smoother process from request acceptance to shoot completion.",
  },
  {
    icon: GalleryVerticalEnd,
    title: "Faster delivery",
    text: "Customers receive polished content faster after the shoot.",
  },
  {
    icon: ShieldCheck,
    title: "Premium trust",
    text: "A cleaner, more reliable booking experience from start to finish.",
  },
  {
    icon: Zap,
    title: "Better operations",
    text: "One structured flow for booking, shooting, and delivery.",
  },
];

const caseStudies = [
  {
    title: "Proposal shoots",
    metric: "Live delivery in minutes",
    text: "Customers relive the moment before the event is even over, with premium creator coverage and fast delivery.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Restaurant content",
    metric: "Faster social content",
    text: "Brands get polished food, space, and team visuals with quicker turnaround and a premium experience.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Real estate media",
    metric: "Cleaner delivery workflow",
    text: "Agents receive organized photos and video assets with a delivery process that feels premium from start to finish.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80",
  },
];

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

function SectionEyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

function MarqueeRow({ items, reverse = false, duration = 30 }) {
  const doubled = [...items, ...items];

  return (
    <div className="hero-marquee-row">
      <div
        className={`hero-marquee-track ${reverse ? "reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((src, index) => (
          <div key={`${src}-${index}`} className="hero-marquee-card">
            <img src={src} alt="" loading="eager" referrerPolicy="no-referrer" />
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadModal({ type, isOpen, onClose, apiBaseUrl }) {
  const isCustomer = type === "customer";
  const [form, setForm] = useState(isCustomer ? customerInitial : creatorInitial);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  React.useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

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
        throw new Error(data.error || data.details || "Submission failed");
      }

      setSuccess(
        isCustomer
          ? "Booking inquiry submitted successfully."
          : "Creator application submitted successfully."
      );
      setForm(isCustomer ? customerInitial : creatorInitial);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-modal-overlay" onClick={onClose}>
      <div className="lead-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="lead-modal-head">
          <div>
            <h3>{isCustomer ? "Book now" : "Join as a creator"}</h3>
            <p>
              {isCustomer
                ? "Tell us about your shoot and we’ll route the request."
                : "Apply to join the Capturr creator network."}
            </p>
          </div>
          <button className="lead-close-btn" type="button" onClick={onClose}>
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
            rows={4}
          />

          {success && <div className="lead-success">{success}</div>}
          {error && <div className="lead-error">{error}</div>}

          <div className="lead-actions">
            <button type="button" className="btn btn-glass" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading
                ? "Submitting..."
                : isCustomer
                  ? "Submit inquiry"
                  : "Submit application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Navbar({ onOpenCustomer, onOpenCreator }) {
  return (
    <header className="nav-wrap">
      <div className="nav-shell">
        <div className="brand">
          <img
            src={logo}
            alt="Capturr"
            className="brand-logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="brand-copy">
            <strong>Capturr</strong>
            <span>On-demand photography, videography & AI delivery</span>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#platform">Platform</a>
          <a href="#booking-flow">Booking Flow</a>
          <a href="#features">Features</a>
          <a href="#cta">Book</a>
        </nav>

        <div className="nav-actions">
          <button className="btn btn-ghost" onClick={onOpenCreator}>
            Join as creator
          </button>
          <button className="btn btn-primary" onClick={onOpenCustomer}>
            Book now
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroSection({ onOpenCustomer }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.78]);

  return (
    <section className="hero-layered-section" id="platform" ref={ref}>
      <div className="hero-wall-wrap">
        <MarqueeRow items={heroRow1} duration={36} />
        <MarqueeRow items={heroRow2} reverse duration={30} />
        <MarqueeRow items={heroRow3} duration={34} />
        <div className="hero-wall-overlay" />
      </div>

      <div className="container hero-layered-inner">
        <motion.div
          className="hero-box"
          style={{ y: cardY, opacity: cardOpacity }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-grid">
            <div className="hero-copy">
              <SectionEyebrow>
                <Sparkles size={14} />
                On-demand creator booking with fast delivery
              </SectionEyebrow>

              <h1>
                Book a creator.
                <br />
                Get your moments
                <span> delivered fast.</span>
              </h1>

              <p>
                Capturr helps customers instantly book photographers and
                videographers, track creator arrival, manage premium shoots, and
                receive polished content faster.
              </p>

              <div className="hero-actions">
                <button className="btn btn-primary btn-lg" onClick={onOpenCustomer}>
                  Book a shoot
                  <ArrowRight size={16} />
                </button>
                <button className="btn btn-glass btn-lg">
                  <Play size={16} />
                  See how it works
                </button>
              </div>

              <div className="hero-proof-list">
                <div>
                  <CheckCircle2 size={16} />
                  Premium creator matching
                </div>
                <div>
                  <CheckCircle2 size={16} />
                  Faster shoot coordination
                </div>
                <div>
                  <CheckCircle2 size={16} />
                  Cleaner customer experience
                </div>
                <div>
                  <CheckCircle2 size={16} />
                  Better delivery workflow
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-card hero-visual-card-tight">
                <div className="hero-media-large">
                  <img
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80"
                    alt="Capturr proposal shoot"
                  />
                  <div className="hero-media-overlay">
                    <div className="media-chip">
                      <BadgeCheck size={14} />
                      Creator confirmed
                    </div>
                    <div className="media-card-copy">
                      <strong>Proposal coverage</strong>
                      <span>Premium creator booking and faster delivery</span>
                    </div>
                  </div>
                </div>

                <div className="hero-side-stack">
                  <div className="hero-mini-card">
                    <img
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                      alt="Capturr lifestyle content"
                    />
                  </div>

                  <div className="hero-status-card">
                    <div className="status-kicker">Creator status</div>
                    <div className="status-main">8 min away</div>
                    <p>
                      Your creator is on the way. Capturr keeps the customer
                      updated before the session begins and makes the process
                      feel premium.
                    </p>
                    <div className="status-progress">
                      <div className="status-progress-fill" />
                    </div>
                    <div className="status-tags">
                      <span>
                        <MapPinned size={13} />
                        Route
                      </span>
                      <span>
                        <CloudUpload size={13} />
                        Updates
                      </span>
                      <span>
                        <Camera size={13} />
                        Shoot
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-stats">
                {stats.map((item) => (
                  <div key={item.label} className="hero-stat-card">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BookingFlowSection() {
  const steps = [
    {
      icon: CalendarDays,
      title: "Choose service",
      text: "Pick photography, videography, or both.",
    },
    {
      icon: MapPin,
      title: "Add location",
      text: "Share where the shoot is happening.",
    },
    {
      icon: Clock3,
      title: "Set timing",
      text: "Book now or schedule ahead.",
    },
    {
      icon: Camera,
      title: "Creator matched",
      text: "Capturr routes the request fast.",
    },
  ];

  return (
    <section className="booking-section" id="booking-flow">
      <div className="container booking-layout">
        <div className="booking-copy">
          <SectionEyebrow>
            <Camera size={14} />
            Booking flow
          </SectionEyebrow>
          <h2>From request to confirmed creator in one smooth flow.</h2>
          <p>
            Customers should feel the product working immediately. The booking
            flow is built to feel fast, premium, and confidence-building from
            the first tap.
          </p>

          <div className="booking-steps-list">
            {steps.map((step) => (
              <div key={step.title} className="booking-step-row">
                <div className="booking-step-icon">
                  <step.icon size={18} />
                </div>
                <div>
                  <strong>{step.title}</strong>
                  <span>{step.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="booking-ui-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="booking-ui-header">
            <div>
              <div className="booking-kicker">NEW REQUEST</div>
              <h3>Book a creator</h3>
            </div>
            <div className="booking-live-pill">LIVE</div>
          </div>

          <div className="booking-input-grid">
            <div className="booking-input booking-input-wide">
              <span className="booking-label">Service</span>
              <strong>Photography + Videography</strong>
            </div>
            <div className="booking-input">
              <span className="booking-label">Date</span>
              <strong>Saturday</strong>
            </div>
            <div className="booking-input">
              <span className="booking-label">Time</span>
              <strong>6:30 PM</strong>
            </div>
            <div className="booking-input booking-input-wide">
              <span className="booking-label">Location</span>
              <strong>Jersey City Waterfront</strong>
            </div>
          </div>

          <div className="booking-match-card">
            <div className="booking-match-top">
              <div className="booking-match-avatar">A</div>
              <div>
                <strong>Aarav Lens matched</strong>
                <span>Premium creator • 8 min away</span>
              </div>
            </div>
            <div className="booking-match-bar">
              <div className="booking-match-fill" />
            </div>
          </div>

          <div className="booking-actions">
            <button className="btn btn-glass">Edit details</button>
            <button className="btn btn-primary">Confirm booking</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  return (
    <section className="case-section">
      <div className="container">
        <div className="section-head">
          <SectionEyebrow>
            <Star size={14} />
            Use cases
          </SectionEyebrow>
          <h2>
            Built for real content needs across personal, brand, and business
            shoots.
          </h2>
          <p>
            Capturr works best when speed, creator quality, and delivery
            experience all matter at once.
          </p>
        </div>

        <div className="case-grid">
          {caseStudies.map((item, index) => (
            <motion.div
              key={item.title}
              className="case-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
            >
              <div className="case-image-wrap">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="case-body">
                <div className="case-metric">{item.metric}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-head">
          <SectionEyebrow>
            <Zap size={14} />
            Why Capturr
          </SectionEyebrow>
          <h2>Faster booking. Better delivery. Premium experience.</h2>
          <p>
            Capturr brings booking, creator operations, and delivery into one
            seamless experience.
          </p>
        </div>

        <div className="bento-grid">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="bento-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="bento-icon">
                <card.icon size={20} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onOpenCustomer, onOpenCreator }) {
  return (
    <section className="cta-section" id="cta">
      <div className="container">
        <div className="cta-card">
          <div className="cta-copy">
            <SectionEyebrow>
              <Star size={14} />
              Ready to book
            </SectionEyebrow>
            <h2>
              Turn every shoot into a premium content experience with Capturr.
            </h2>
            <p>
              Book creators on demand, keep customers confident through the
              process, and deliver better photos and videos faster.
            </p>
          </div>

          <div className="cta-actions cta-actions-equal">
            <button className="btn btn-primary btn-lg cta-equal-btn" onClick={onOpenCustomer}>
              Book now
            </button>
            <button className="btn btn-glass btn-lg cta-equal-btn" onClick={onOpenCreator}>
              Become a creator
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="site-v2">
      <Navbar
        onOpenCustomer={() => setActiveModal("customer")}
        onOpenCreator={() => setActiveModal("creator")}
      />
      <HeroSection onOpenCustomer={() => setActiveModal("customer")} />
      <BookingFlowSection />
      <CaseStudiesSection />
      <FeaturesSection />
      <CTASection
        onOpenCustomer={() => setActiveModal("customer")}
        onOpenCreator={() => setActiveModal("creator")}
      />

      <LeadModal
        type="customer"
        isOpen={activeModal === "customer"}
        onClose={() => setActiveModal(null)}
        apiBaseUrl={API_BASE_URL}
      />
      <LeadModal
        type="creator"
        isOpen={activeModal === "creator"}
        onClose={() => setActiveModal(null)}
        apiBaseUrl={API_BASE_URL}
      />
    </div>
  );
}