import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import CreateProjectForm from "../components/CreateProjectForm";
import useAuth from "../hooks/use-auth.js";
import { Link} from "react-router-dom";
import "./HomePage.css";

function HomePage() {
    const { projects, isLoading, error } = useProjects(); 
    const {auth} = useAuth();
    if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>{error.message}</p>)
    } 
    return (
        <div>
            <h2>Project Buddy</h2>
            <h3>Need some help with your next project?</h3>
        <div id="project-list">
            {projects.map((projectData, key) => {
                return <ProjectCard key={key} projectData={projectData} />;  
                })}
        </div>
        {auth.token ? (
            <CreateProjectForm />
                ) : (
                <Link to="/login" className="login-button">Login to create your project</Link>
                )}
        </div>
    );
    }

export default HomePage;