import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScanFace,
  Sparkles,
  CloudUpload,
  CheckCircle2,
  Camera,
  Wifi,
} from "lucide-react";

const people = [
  {
    id: "ava",
    name: "Ava",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "liam",
    name: "Liam",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "maya",
    name: "Maya",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "noah",
    name: "Noah",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
];

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    faces: ["ava", "liam"],
    time: "Uploaded 8s ago",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    faces: ["ava"],
    time: "Uploaded 16s ago",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
    faces: ["maya", "noah"],
    time: "Uploaded 29s ago",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    faces: ["liam", "maya"],
    time: "Uploaded 43s ago",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1519167758481-83f29c4d7b3a?auto=format&fit=crop&w=900&q=80",
    faces: ["ava", "maya"],
    time: "Uploaded 1m ago",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
    faces: ["noah"],
    time: "Uploaded 1m ago",
  },
];

export default function LiveGallerySection() {
  const [selectedFace, setSelectedFace] = useState("all");

  const filteredPhotos = useMemo(() => {
    if (selectedFace === "all") return photos;
    return photos.filter((photo) => photo.faces.includes(selectedFace));
  }, [selectedFace]);

  const selectedPerson =
    selectedFace === "all"
      ? null
      : people.find((person) => person.id === selectedFace);

  return (
    <section className="live-gallery-section">
      <div className="live-gallery-shell">
        <div className="live-gallery-copy">
          <div className="section-badge">
            <Sparkles size={16} />
            Live gallery + face sorting
          </div>

          <h2>
            Real-time uploads from camera to cloud, then straight into the
            customer app.
          </h2>

          <p>
            During the shoot, images can appear live, faces can be detected and
            grouped, and customers can tap a person to instantly open only that
            person’s photos.
          </p>

          <div className="feature-points">
            <div>
              <CheckCircle2 size={18} />
              Camera → cloud → customer app flow
            </div>
            <div>
              <CheckCircle2 size={18} />
              Face circles like modern photo apps
            </div>
            <div>
              <CheckCircle2 size={18} />
              Tap a person and show only their images
            </div>
            <div>
              <CheckCircle2 size={18} />
              Name people later after detection
            </div>
          </div>

          <div className="live-flow-row">
            <div className="flow-chip">
              <Camera size={16} />
              Creator camera
            </div>
            <div className="flow-arrow" />
            <div className="flow-chip">
              <CloudUpload size={16} />
              Cloud sync
            </div>
            <div className="flow-arrow" />
            <div className="flow-chip">
              <Wifi size={16} />
              Customer app
            </div>
          </div>
        </div>

        <div className="phone-stage">
          <div className="hand-phone-mockup">
            <div className="iphone-17pm">
              <div className="iphone-bezel">
                <div className="iphone-top-ui">
                  <span>12:11</span>
                  <div className="dynamic-island" />
                  <span>⋯</span>
                </div>

                <div className="iphone-screen search-screen">
                  <div className="search-bar-wrap">
                    <div className="search-bar">
                      <span className="search-icon">⌕</span>
                      <span className="search-placeholder">
                        Search your photos
                      </span>
                    </div>
                    <button className="cancel-btn" type="button">
                      Cancel
                    </button>
                  </div>

                  <div className="ask-photos-card">
                    <div className="ask-photos-star">✦</div>
                    <div>
                      <strong>New! Search your pics with AI.</strong>
                      <span>Ask Photos</span>
                    </div>
                  </div>

                  <div className="faces-scroll-row">
                    {people.map((person) => (
                      <button
                        key={person.id}
                        className={`search-face-item ${
                          selectedFace === person.id ? "active" : ""
                        }`}
                        onClick={() => setSelectedFace(person.id)}
                        type="button"
                      >
                        <img src={person.avatar} alt={person.name} />
                      </button>
                    ))}

                    <button
                      className={`search-face-item more-face ${
                        selectedFace === "all" ? "active" : ""
                      }`}
                      onClick={() => setSelectedFace("all")}
                      type="button"
                    >
                      <span>•••</span>
                    </button>
                  </div>

                  <div className="search-list">
                    <button className="search-list-item" type="button">
                      <span className="search-list-icon">🕘</span>
                      <span>
                        {selectedFace === "all"
                          ? "All people"
                          : selectedPerson?.name || "Person"}
                      </span>
                    </button>

                    <button className="search-list-item" type="button">
                      <span className="search-list-icon">▶</span>
                      <span>Videos</span>
                    </button>

                    <button className="search-list-item" type="button">
                      <span className="search-list-icon">▣</span>
                      <span>Screenshots</span>
                    </button>

                    <button className="search-list-item" type="button">
                      <span className="search-list-icon">⌖</span>
                      <span>Places</span>
                    </button>

                    <button className="search-list-item" type="button">
                      <span className="search-list-icon">☰</span>
                      <span>{filteredPhotos.length} matched photos</span>
                    </button>
                  </div>

                  <div className="search-result-grid">
                    <AnimatePresence mode="popLayout">
                      {filteredPhotos.slice(0, 6).map((photo) => (
                        <motion.div
                          layout
                          key={photo.id}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.22 }}
                          className="search-result-card"
                        >
                          <img src={photo.src} alt="Filtered result" />
                          <div className="search-result-overlay">
                            <span>{photo.time}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            <div className="phone-shadow-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}