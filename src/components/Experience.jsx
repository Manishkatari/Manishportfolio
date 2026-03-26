import React, { useEffect, useState } from "react";
import Loading from './Loading'
import { getExperience } from "../api/Api";

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getExperience();
        setExperience(data);
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
        <div className="text-center"><p>Loading</p></div>
      </div>
  );
}

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
    <div className="card about-card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4">Professional Experience</h5>
        <div className="timeline">
          {experience.map((experienceItem, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-left">
                <h6>{experienceItem.role}</h6>
                <p className="text-muted">{experienceItem.company}</p>
                <ul role="list">
                  {experienceItem.points.map((point, i) => (
                    <li key={i} role="listitem">{point}</li>
                  ))}
                </ul>
              </div>
              <div className="timeline-right">{experienceItem.date}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default Experience;