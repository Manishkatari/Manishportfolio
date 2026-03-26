import React from "react";
import PropTypes from "prop-types"; // Import prop-types

const SkillBadge = ({ SkillName, value }) => {
  return (
    <div className="col-md-6 mb-4">
      <div className="skill-card">
        <div className="d-flex justify-content-between">
          <h6>{SkillName}</h6>
          <span>{value}%</span>
        </div>
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            style={{ width: `${value}%` }} // Consider moving styling to CSS class if possible
            role="progressbar" //ARIA role
            aria-valuenow={value} // Current value
            aria-valuemin="0" // Minimum value
            aria-valuemax="100" // Maximum value
          ></div>
        </div>
      </div>
    </div>
  );
};

SkillBadge.propTypes = { //Prop validation
  SkillName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default SkillBadge;
