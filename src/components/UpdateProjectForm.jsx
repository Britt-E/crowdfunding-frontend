import { useState } from "react";
import { useNavigate } from "react-router-dom";
import updateProject from "../api/update-project.js";
import "./Forms.css";

function UpdateProjectForm(props) { 
    const navigate = useNavigate();  
    const { project } = props;

    const [projectData, setProjectData] = useState({
        title: project.title,
        description: project.description,
        goal: project.goal,
        image: project.image,
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
        if (projectData.title && projectData.description && projectData.goal && projectData.image) {
            updateProject(
                projectData.title,
                projectData.description,
                projectData.goal,
                projectData.image,
                project.id   
            ).then((response) => {
              const id = response.id
              navigate(0) 
            });
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Update Project</h2>
            <div className="form-group">
                <label className="form-label" htmlFor="title">Project Title</label>
                <input
                    type="text"
                    id="title"
                    className="form-input"
                    placeholder="Enter project title"
                    value={projectData.title}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className="form-input"
                    placeholder="Describe your project"
                    value={projectData.description}
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
                    placeholder="Enter estimated hours"
                    value={projectData.goal}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="image">Project Image</label>
                <input
                    type="url"
                    id="image"
                    className="form-input"
                    placeholder="Enter image URL"
                    value={projectData.image}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="form-button" onClick={handleSubmit}>
                Save Changes
            </button>
        </div>
    );
  }
  
export default UpdateProjectForm;