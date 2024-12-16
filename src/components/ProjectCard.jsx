import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
  const { projectData } = props;
  const projectLink = `project/${projectData.id}`;
  const totalPledged = projectData.pledges ? 
    projectData.pledges.reduce((sum, pledge) => sum + pledge.amount, 0) : 0;
  const progress = Math.min((totalPledged / projectData.goal) * 100, 100);

  return (
    <div className="project-card">
      <Link to={projectLink}>
        <img src={projectData.image} alt={projectData.title} />
        <h3>{projectData.title}</h3>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <div className="progress-text">
            {totalPledged} / {projectData.goal} hours pledged
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;