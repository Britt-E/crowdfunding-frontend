import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import CreateProjectForm from "../components/CreateProjectForm";
import CreatePledgeForm from "../components/CreatePledgeForm";
import "./HomePage.css";

function HomePage() {
    const { projects, isLoading, error } = useProjects(); 
    if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>{error.message}</p>)
    } 
    return (
        <div>
        <div id="project-list">
            {projects.map((projectData, key) => {
                return <ProjectCard key={key} projectData={projectData} />;  
                })}
        </div>
        <CreateProjectForm />
        <CreatePledgeForm />
        </div>
    );
    }

export default HomePage;