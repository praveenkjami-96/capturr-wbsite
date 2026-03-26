import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const wallImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519167758481-83f29c4d7b3a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=900&q=80",
];

const columns = [
  wallImages.slice(0, 4),
  wallImages.slice(4, 8),
  wallImages.slice(8, 12),
  wallImages.slice(2, 6),
  wallImages.slice(6, 10),
];

function Column({ images, reverse = false, speed = 28 }) {
  const doubled = [...images, ...images];

  return (
    <div className="photo-wall-column">
      <div
        className={`photo-wall-track ${reverse ? "reverse" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((src, index) => (
          <div className="photo-wall-card" key={`${src}-${index}`}>
            <img src={src} alt="Capturr gallery visual" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ScrollingPhotoWallCTA() {
  return (
    <section className="photo-wall-section">
      <div className="photo-wall-grid">
        <Column images={columns[0]} speed={30} />
        <Column images={columns[1]} reverse speed={24} />
        <Column images={columns[2]} speed={28} />
        <Column images={columns[3]} reverse speed={22} />
        <Column images={columns[4]} speed={32} />
      </div>

      <div className="photo-wall-overlay" />

      <motion.div
        className="photo-wall-content"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="photo-wall-label">Let’s Make It Happen</div>
        <h2>
          Ready For Your <span>Best Shot?</span>
        </h2>
        <p>
          Every moment tells a different story. Capturr makes booking,
          capturing, and receiving premium visual content feel effortless.
        </p>

        <button className="photo-wall-button">
          Book a call
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </section>
  );
}