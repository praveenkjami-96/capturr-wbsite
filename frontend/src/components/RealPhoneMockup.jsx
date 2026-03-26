import React from "react";

export default function RealPhoneMockup({
  children,
  className = "",
  screenClassName = "",
}) {
  return (
    <div className={`real-phone ${className}`}>
      <img
        src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
        alt="iPhone"
        className="real-phone-frame"
      />

      <div className={`real-phone-screen ${screenClassName}`}>
        {children}
      </div>
    </div>
  );
}