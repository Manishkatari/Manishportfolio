import React, { useEffect, useState } from "react";
import Loading from './Loading';
import { Link } from "react-router-dom";
import { getHeader } from "../api/Api";
import PropTypes from "prop-types";

const Header = () => {
  const [header, setHeader] = useState({ logo: "", navLinks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getHeader();
        setHeader(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

if (loading) {
  return (
    <header className="navbar-custom fixed-top" aria-busy="true">
      <div className="container">
        <div className="text-center"><p>Loading</p></div>
      </div>
    </header>
  );
}

  if (error) {
    return (
      <header className="navbar-custom fixed-top" aria-invalid="true">
        <div className="container">
          <p>Error loading header: {error.message}</p>
        </div>
      </header>
    );
  }

  // Destructure for cleaner access
  const { logo, navLinks } = header;

  return (
    <header className="navbar-custom fixed-top" aria-label="Main Navigation">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark" role="navigation" aria-label="Primary menu">
          <a className="navbar-brand fw-bold logo-text" href="#" aria-label="Logo">
            {logo}
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-controls="navMenu"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navMenu">
            <ul className="navbar-nav ms-auto nav-links">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.name || link.path}>
                  <Link
                    to={link.path}
                    className="nav-link"
                    aria-label={link.name}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

// Optional: PropTypes validation if props are added in future
Header.propTypes = {
  // For now, no props, but you can add if needed
};

export default Header;
