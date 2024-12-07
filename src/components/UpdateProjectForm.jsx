import { useState } from "react";
import { useNavigate } from "react-router-dom";
import updateProject from "../api/update-project.js";

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
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="project title"
            value={projectData.title}
            onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="project description"
            value={projectData.description}
            onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="goal">Goal:</label>
          <input
            type="number"
            id="goal"
            placeholder="funding goal"
            value={projectData.goal}
            onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="url"
            id="image"
            placeholder="image url"
            value={projectData.image}
            onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit}>
            Update
            </button>
      </form>
    );
  }
  
export default UpdateProjectForm;