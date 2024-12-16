import { oneProject } from "../data";
import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import CreatePledgeForm from "../components/CreatePledgeForm";
import useAuth from "../hooks/use-auth.js";
import { Link} from "react-router-dom";
import UpdateProjectForm from "../components/UpdateProjectForm.jsx";
import deleteProject from "../api/delete-project.js";
import { useNavigate } from "react-router-dom";
import "./ProjectPage.css";

function ProjectPage() {
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);  
    const {auth} = useAuth();
    const navigate = useNavigate();

    if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>{error.message}</p>)
    }

    const handleDelete = (event) => {
        deleteProject(
                project.id   
            ).then((response) => {
              const id = response.id
              navigate("/") 
            });
    };

    const totalPledged = project.pledges ? 
        project.pledges.reduce((sum, pledge) => sum + pledge.amount, 0) : 0;
    const progress = Math.min((totalPledged / project.goal) * 100, 100);
    const hoursRemaining = Math.max(project.goal - totalPledged, 0);

    return (
        <div className="project-page">
            <div className="project-header">
                <h1 className="project-title">{project.title}</h1>
                <p className="project-description">{project.description}</p>
                <img src={project.image} className="project-image" alt={project.title} />
                
                <div className="progress-section">
                <h2 className="pledges-title">Pledged Support</h2>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="progress-stats">
                        <div className="stat">
                            <span className="stat-value">{totalPledged}</span>
                            <span className="stat-label">Hours Pledged</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{project.goal}</span>
                            <span className="stat-label">Hours Needed</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{hoursRemaining}</span>
                            <span className="stat-label">Hours to Go</span>
                        </div>
                    </div>
                </div>
            </div>

            {auth.token ? (
                <div className="project-actions">
                    <CreatePledgeForm projectId={project.id} />
                    <UpdateProjectForm project={project} />
                    <button 
                        onClick={handleDelete} 
                        className="delete-button"
                        aria-label="Delete Project"
                    >
                        Delete Project
                    </button>
                </div>
            ) : (
                <Link to="/login" className="login-button">Login to support this project</Link>
            )}
        </div>
    );
}

export default ProjectPage;