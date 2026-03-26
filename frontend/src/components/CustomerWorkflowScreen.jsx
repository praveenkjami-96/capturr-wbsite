import React from "react";

export default function CustomerWorkflowScreen() {
  return (
    <div className="workflow-ui">
      <div className="workflow-header">
        <div>
          <p className="workflow-app-label">CAPTURR</p>
          <h3>Birthday Session</h3>
          <p className="workflow-subtext">
            London • Creator matched • ETA 11 min
          </p>
        </div>
        <div className="live-pill">LIVE</div>
      </div>

      <div className="workflow-progress">
        <div className="workflow-step active">
          <span className="step-dot" />
          <div>
            <strong>Request confirmed</strong>
            <p>Your booking is locked in</p>
          </div>
        </div>

        <div className="workflow-step active">
          <span className="step-dot" />
          <div>
            <strong>Creator en route</strong>
            <p>Tracking is now active</p>
          </div>
        </div>

        <div className="workflow-step">
          <span className="step-dot" />
          <div>
            <strong>Arrival verification</strong>
            <p>Session start code pending</p>
          </div>
        </div>

        <div className="workflow-step">
          <span className="step-dot" />
          <div>
            <strong>Live photo delivery</strong>
            <p>Images will begin appearing here</p>
          </div>
        </div>
      </div>

      <div className="workflow-preview-grid">
        <div className="preview-card preview-red">Live Photos</div>
        <div className="preview-card preview-dark">Portraits</div>
        <div className="preview-card preview-soft">Event Moments</div>
        <div className="preview-card preview-red-deep">Highlight Reel</div>
      </div>

      <button className="workflow-main-button">Open Live Session</button>
    </div>
  );
}
