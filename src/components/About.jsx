import React, { useEffect, useState } from "react";
import Experience from "./Experience";
import Certification from "./Certification";
import Eduction from "./Eduction";
import Loading from "./Loading";
import { getAbout } from "../api/Api";

const About = () => {
  const [about, setAbout] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAbout();
        setAbout(data);
        setError(null);
      } catch (e) {
        setError(e);
        console.error("Error fetching about data:", e);
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
    return (
      <div className="text-center text-danger">Error: {error.message}</div>
    );
  }

  return (
        <>
          {/* About Summary */}
        <div className="card about-card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4">About Me</h5>
            <div className="timeline">
              <div className="timeline-item">
                <p className="about-text">{about.summary}</p>
              </div>
            </div>
          </div>
        </div>
      {/* Professional Experience */}
      <section className="mb-4">
        <Experience />
      </section>
      {/* Certifications */}
      <section className="mb-4">
        <Certification />
      </section>
      {/* Education */}
      <section className="mb-4">
        <Eduction />
      </section>
      </>
  );
};

export default About;
