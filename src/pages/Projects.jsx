import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import SkillBadge from "../components/SkillBadge";
import Certifications  from "../components/Certification";
import { getSkills } from "../api/Api";

const Projects = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load skills");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <>
      <Header />
      <section className="container-fluid secMar">
      < Certifications/>
      </section> 
      <section className="container-fluid skills-section mb-4">
                <div className="card about-card ">
                  <div className="card-body">
                    <h5 className="card-title mb-4">My Skills</h5>
                    <div className="timeline">
                    {skills.map(({ id, SkillName, value }) => (
                      <div className="timeline-item" key={id}>
                        <SkillBadge SkillName={SkillName} value={value}/>
                        </div>
                    ))}
                      </div>
                    </div>
                  </div>
      </section>
      <section className="container-fluid">
        <ProjectCard />
      </section>
      <Footer />
    </>
  );
};

export default Projects;




