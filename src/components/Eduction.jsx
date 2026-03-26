import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { getEducation } from "../api/Api";

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetch
      try {
        const data = await getEducation();
        setEducation(data);
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
      <div className="container">
        <div className="text-center">
          <p>Loading</p>
        </div>
      </div>
    );
  }
  if (error) {
    return <p>Error: {error.message || "An error occurred"}</p>;
  }

  return (
    <div className="card about-card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4">Education</h5>
        <div className="timeline">
          {education.map((edu, index) => (
            <div className="timeline-item" key={edu.id || index}>
              {" "}
              {/* Use id if available, fallback to index */}
              <div className="timeline-left">
                <h6>{edu.degree}</h6>
                <p className="text-muted">{edu.college}</p>
              </div>
              <div className="timeline-right">{edu.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
