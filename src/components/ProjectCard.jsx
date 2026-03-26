import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Button from "../components/Button";
import SkillBadge from "./SkillBadge";
import { getProjectsCard } from "../api/Api";

const ProjectCard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProjectsCard();
        setProjects(Array.isArray(data) ? data : []);
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
    return <p>Error loading projects: {error.message}</p>;
  }

  return (
    <>
      <div className="card about-card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-4">Projects</h5>
          <div className="timeline">
            {projects.length === 0 ? (
              <p className="text-center">No projects found.</p>
            ) : (
              projects.map((project) => (
                <div
                  className="timeline-item"
                  key={project.id ?? project.title}
                >
                  <div className="timeline-left">
                    <div className="project-card">
                      <div className="card-body">
                        <h4>{project.title}</h4>

                        <h6 className="mt-3">Project Description</h6>
                        <p>{project.description}</p>

                        <h6>Tools Used</h6>
                        <ul>
                          {(Array.isArray(project.tools)
                            ? project.tools
                            : []
                          ).map((tool, i) => (
                            <li key={`${tool}-${i}`}>{tool}</li>
                          ))}
                        </ul>

                        <h6>Skills</h6>
                        {(Array.isArray(project.skills)
                          ? project.skills
                          : []
                        ).map((skill, index) => (
                          <SkillBadge
                            key={`${skill.SkillName}-${index}`}
                            SkillName={skill.SkillName}
                            value={skill.value}
                          />
                        ))}

                        <div className="project-buttons mt-3">
                          <Button
                            name="GitHub"
                            href={project.githubUrl}
                            className="btn btn-dark btn-sm me-2"
                            target={project.githubUrl ? "_blank" : undefined}
                            rel={project.githubUrl ? "noreferrer" : undefined}
                          />
                          {/* <Button
                            name="Live Demo"
                            href={project.liveUrl}
                            className="btn btn-primary btn-sm"
                            target={project.liveUrl ? "_blank" : undefined}
                            rel={project.liveUrl ? "noreferrer" : undefined}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-right">{project.year}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
