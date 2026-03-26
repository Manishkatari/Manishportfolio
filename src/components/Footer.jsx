import React, { useEffect, useState } from "react";
import Loading from './Loading';
import { Link } from "react-router-dom";
import Social from "./Social";
import { getFooter, getSocial } from "../api/Api";

const Footer = () => {
  const [footer, setFooter] = useState({ links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 
      try {
        const data = await getFooter();
        setFooter(data);
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
    <footer className="footer">
      <div className="container">
        <div className="text-center"><p>Loading</p></div>
      </div>
    </footer>
  );
}

  if (error) {
    return (
      <footer className="footer">
        <div className="container">
          <p>Error loading footer data: {error.message}</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* About */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="footer-logo">{footer.name}</h4>
            <p className="footer-text">{footer.description}</p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              {footer.links.map((link) => (
                <li key={link.name || link.path}>
                  <Link
                    to={link.path}
                    className="nav-link"
                    aria-label={link.name}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-lg-4 col-md-12 mb-4">
            <Social/>
          </div>
        </div>

        <hr className="footer-line" />
        <div className="text-center footer-bottom">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
