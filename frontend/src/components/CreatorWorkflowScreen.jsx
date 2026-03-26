import React from "react";

export default function CreatorWorkflowScreen() {
  return (
    <div className="creator-ui">
      <p className="workflow-app-label">CREATOR MODE</p>
      <h3>Go Online</h3>
      <p className="workflow-subtext">
        Accept jobs. Navigate. Upload faster.
      </p>

      <div className="creator-stats">
        <div className="creator-stat-box">
          <strong>5</strong>
          <span>new jobs</span>
        </div>
        <div className="creator-stat-box">
          <strong>£420</strong>
          <span>this week</span>
        </div>
      </div>

      <div className="creator-job">
        <strong>Proposal Shoot</strong>
        <span>Zone 1 • Premium payout</span>
      </div>

      <div className="creator-job">
        <strong>Brand Content Session</strong>
        <span>Canary Wharf • Starts at 4:00 PM</span>
      </div>

      <button className="workflow-main-button creator-button">
        Go Online
      </button>
    </div>
  );
}