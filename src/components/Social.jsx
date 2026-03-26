import React, { useEffect, useState } from "react";
import { getSocial } from "../api/Api";

// Move outside to prevent re-creation on every render
const SocialIcon = ({ url, icon, name,colour }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    aria-label={`Connect with me on ${name}`}
  >
    <i className={`bi ${icon} ${colour}`}></i>
  </a>
);

const Social = () => {
  const [social, setSocial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSocial();
        setSocial(Array.isArray(data) ? data : []); // Ensure it's an array
      } catch (err) {
        setError(err.message || "Error fetching social links");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center"><p>Loading...</p></div>
      </div>
    );
  }

  if (error) {
    return <p className="error text-center">Error: {error}</p>;
  }

  return (
    <>
      <h5 className="footer-title">Connect With Me</h5>
      <div className="social-icons">
        {social.map((item) => (
          <SocialIcon
            key={item.name}
            {...item} // Spreads url, icon, and name automatically
          />
        ))}
      </div>
    </>
  );
};

export default Social;
