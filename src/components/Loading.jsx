import React from "react";
import "../styles/style.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <h4 className="loading-text">Loading...</h4>
    </div>
  );
};

export default Loading;