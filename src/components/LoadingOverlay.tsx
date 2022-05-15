import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="loading">
      <div className="loading-overlay"></div>
      <div className="loading-dots-container">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
