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
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();
    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id);  
    // Get authentication information
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

    return (
    <div>
        <h2>{project.title}</h2>
        <h3>{project.image}</h3>
        <h3>{project.description}</h3>
        <h3>Created at: {project.date_created}</h3>
        <ul>
            {project.pledges.map((pledgeData, key) => {
                return (
                <li key={key}>
                    {pledgeData.amount} from {pledgeData.supporter}
                </li>
                );
            })}
        </ul>
        {auth.token ? (
            <CreatePledgeForm projectId={project.id} />
                ) : (
                <Link to="/login" className="login-button">Login to pledge your time</Link>
                )}
        {auth.token ? (
            <UpdateProjectForm project={project} />
        ) : (
            <Link to="/login" className="login-button">Login to update project</Link>
        )}
        {auth.token && (  
        <button onClick={handleDelete} className="delete-button">
            Delete
        </button>
        )}
    </div>
);
}

export default ProjectPage;