import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import CreateProjectForm from "../components/CreateProjectForm";
import useAuth from "../hooks/use-auth.js";
import { Link} from "react-router-dom";
import "./HomePage.css";
import connectIcon from '../assets/connect-icon.svg';
import collaborateIcon from '../assets/collaborate-icon.svg';
import createIcon from '../assets/create-icon.svg';

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
            <section className="hero-section">
                <div className="logo-container">
                    <h1 className="logo-text">Project Buddy</h1>
                    <div className="logo-tagline">Connect • Collaborate • Create</div>
                </div>
                <h3>Need some help with your next project?</h3>
                {!auth.token && (
                    <Link to="/signup" className="login-button">Join Our Community</Link>
                )}
            </section>

            <section className="features-section">
                <div className="features-grid">
                    <div className="feature-card">
                        <img src={connectIcon} alt="Connect" className="feature-icon" />
                        <h3>Connect</h3>
                        <p>Find skilled volunteers ready to help with your project</p>
                    </div>
                    <div className="feature-card">
                        <img src={collaborateIcon} alt="Collaborate" className="feature-icon" />
                        <h3>Collaborate</h3>
                        <p>Work together to bring your ideas to life</p>
                    </div>
                    <div className="feature-card">
                        <img src={createIcon} alt="Create" className="feature-icon" />
                        <h3>Create</h3>
                        <p>Build amazing projects with expert guidance</p>
                    </div>
                </div>
            </section>

            <h2 className="projects-section-title">Featured Projects</h2>
            <div id="project-list">
                {projects.map((projectData, key) => {
                    return <ProjectCard key={key} projectData={projectData} />;  
                })}
            </div>
            
            {auth.token ? (
                <CreateProjectForm />
            ) : (
                <div className="bottom-cta">
                    <h3>Ready to get started?</h3>
                    <Link to="/signup" className="login-button">Join Our Community</Link>
                </div>
            )}
        </div>
    );
}

export default HomePage;