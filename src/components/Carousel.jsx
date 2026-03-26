import React, { useEffect, useState } from "react";
import Button from "./Button";
import Loading from './Loading';
import "../styles/style.css";
import { getProfile } from "../api/Api";

const Carousel = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-danger">Error: {error}</p>;
  }

  return (

    <div className="card shadow profileCards">
      {/* Cover Image */}
      <div className="position-relative">
        <img
          src={profile.coverImg}
          alt="Cover"
          className="w-100 coverImg"
        />

        {/* Profile Image Overlapping */}
        <div className="profileImg position-absolute">
          {profile.profileImg && (
            <img
              src={profile.profileImg}
              alt="Profile"
              className="rounded-circle"
            />
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body profileDetals mt-5">
        <div>
           <h3 className="mb-0">{profile.name}</h3>
        <p className="text-muted">{profile.title}</p>
        <p className="text-muted">{profile.location}</p>

        <div className="mt-3">
          <button className="btn btn-primary me-2">Message</button>
          <button className="btn btn-outline-secondary">More</button>
        </div>

        <p className="mt-3">{profile.description}</p>
        </div>
      </div>

    </div>
  );
};

export default Carousel;