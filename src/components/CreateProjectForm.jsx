import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postProject from "../api/post-project.js";
import "./Forms.css";

function CreateProjectForm() {
    const navigate = useNavigate();  

    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        goal: 0,
        image: "",
        is_open: true,
        date_created: "",
    });
        
    const handleChange = (event) => {
        const { id, value } = event.target;
        setProjectData((prevProjectData) => ({
            ...prevProjectData,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (projectData.title && projectData.description && projectData.goal && projectData.image && projectData.is_open && projectData.date_created) {
            postProject(
                projectData.title,
                projectData.description,
                projectData.goal,
                projectData.image,
                projectData.is_open,
                projectData.date_created   
            ).then((response) => {
              const id = response.id
              navigate(`project/${id}`) 
            });
        }
    };

    return (
        <form className="form-container">
            <h2 className="form-title">Create a Project</h2>
            <div className="form-group">
                <label className="form-label" htmlFor="title">Project Title</label>
                <input
                    type="text"
                    id="title"
                    className="form-input"
                    placeholder="Enter your project title"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className="form-input"
                    placeholder="Describe your project..."
                    onChange={handleChange}
                    rows="4"
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="goal">Estimated Hours</label>
                <input
                    type="number"
                    id="goal"
                    className="form-input"
                    placeholder="How many hours do you need?"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="image">Project Image</label>
                <input
                    type="url"
                    id="image"
                    className="form-input"
                    placeholder="Enter the URL for your project image"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="form-button" onClick={handleSubmit}>
                Create Project
            </button>
        </form>
    );
}
  
export default CreateProjectForm;