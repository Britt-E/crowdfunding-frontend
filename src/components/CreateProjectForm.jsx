import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postProject from "../api/post-project.js";

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
      <form>
        <div>
        <h2>Create a project</h2>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="project title"
            onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="project description"
            onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="goal">Estimated Hours:</label>
          <input
            type="number"
            id="goal"
            placeholder="estimated hours"
            onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="url"
            id="image"
            placeholder="image url"
            onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="date_created">Date_Created:</label>
          <input
            type="datetime"
            id="date_created"
            placeholder="DD/MM/YYYY"
            onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit}>
            Create
            </button>
      </form>
    );
  }
  
export default CreateProjectForm;