async function updateProject(title, description, goal, image, projectId) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "goal": goal,
        "image": image,
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error trying to create project`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default updateProject;