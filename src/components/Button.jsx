import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Button = forwardRef(
  ({ name, onClick, className, href, target, rel, type, ...props }, ref) => {
    if (href) {
      return (
        <a
          ref={ref}
          className={className}
          href={href}
          target={target}
          rel={rel}
          {...props}
        >
          {name}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={className}
        onClick={onClick}
        type={type || "button"}
        {...props}
      >
        {name}
      </button>
    );
  }
);

Button.propTypes = {
  name: PropTypes.string, // Text to display on the button
  onClick: PropTypes.func, // Click handler
  className: PropTypes.string, // Custom CSS classes
  href: PropTypes.string, // Optional link URL
  target: PropTypes.string, // Optional link target
  rel: PropTypes.string, // Optional rel attribute for links
  type: PropTypes.string, // Optional button type
};

Button.defaultProps = {
  name: "Click Me", // Default button text
  onClick: () => {}, // Default empty function
  className: "", // No additional class by default
};

export default Button;
