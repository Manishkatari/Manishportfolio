import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import SkillBadge from "../components/SkillBadge";
import ProjectsCard  from "../components/ProjectCard";
import { getHome, getSkills, getAbout } from "../api/Api";

const Home = () => {
  // Initialize as null since API returns an object
  const [homeData, setHomeData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      

      try {
        const [home, skillsData, aboutData] = await Promise.all([
          getHome(),
          getSkills(),
          getAbout(),
        ]);
          
        setHomeData(home);
        setSkills(Array.isArray(skillsData) ? skillsData : []);
        setAbout(aboutData);
        console.log(homeData);
       
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      {/* About section: display fetched data */}
      <section className="container-fluid secMar">
        <Hero />
      </section>

      {/* Display about data if available */}
      <section className="container-fluid mb-4">
        <div className="card about-card">
          <div className="card-body">
            <h5 className="card-title mb-4">About Me</h5>
            <div className="timeline">
              <div className="timeline-item">
                <p className="about-text">{about.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills and Certifications */}
      <section className=" container-fluid mb-4">
        <div className="card about-card">
          <div className="card-body">
            <h5 className="card-title mb-4">Skills</h5>
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

      <section className="container-fluid mb-4">
       <ProjectsCard/>
      </section>

      <Footer />
    </>
  );
};

export default Home;


 