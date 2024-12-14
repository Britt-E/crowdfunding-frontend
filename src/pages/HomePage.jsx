import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import CreateProjectForm from "../components/CreateProjectForm";
import useAuth from "../hooks/use-auth.js";
import { Link} from "react-router-dom";
import "./HomePage.css";

function HomePage() {
    const { projects, isLoading, error } = useProjects(); 
    const {auth} = useAuth();

    // Add particles
    const renderParticles = () => {
        const particles = [];
        for (let i = 0; i < 50; i++) {
            const randomLeft = Math.random() * 100;
            const randomDelay = Math.random() * 20;
            particles.push(
                <div
                    key={i}
                    className="particle"
                    style={{
                        left: `${randomLeft}%`,
                        animationDelay: `${randomDelay}s`
                    }}
                />
            );
        }
        return particles;
    };

    if (isLoading) {
        return (<p></p>) // Empty p tag for loading animation
    }
    
    if (error) {
        return (<p>{error.message}</p>)
    } 

    return (
        <div>
            <div className="particles">
                {renderParticles()}
            </div>
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