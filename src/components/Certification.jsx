import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { getCertifications } from "../api/Api"; // Make sure this import exists

const Certification = () => {
  const [certification, setCertification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCertifications();
        setCertification(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center">
          <p>Loading</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message || "An error occurred"}</div>;
  }

  return (
    <div className="card about-card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4">Certifications</h5>
        {certification.map((cert, index) => (
          <div className="timeline" key={index}>
            <div className="timeline-item" key={index}>
              <div className="timeline-left">{cert.title}</div>
              <div className="timeline-right">{cert.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certification;
