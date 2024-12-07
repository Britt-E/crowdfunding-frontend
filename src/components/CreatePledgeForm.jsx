import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postPledge from "../api/post-pledge.js";
import "./CreateProjectForm.css";

function CreatePledgeForm(props) {
    const navigate = useNavigate();  
    const { projectId } = props;

    const [pledgeData, setPledgeData] = useState({
        amount: 0,
        comment: "",
        anonymous: true,
        project: projectId,
    });
        
    const handleChange = (event) => {
        const { id, value } = event.target;
        setPledgeData((prevPledgeData) => ({
            ...prevPledgeData,
            [id]: value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (pledgeData.amount && pledgeData.comment && pledgeData.anonymous && pledgeData.project) {
            postPledge(
                pledgeData.amount,
                pledgeData.comment,
                pledgeData.anonymous,
                pledgeData.project,   
            ).then((response) => {
console.log(response)
            });
        }
    };

    return (
      <form>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            placeholder="pledge amount"
            onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            placeholder="comment"
            onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="anonymous">Anonymous:</label>
          <input
            type="checkbox"
            id="anonymous"
            onChange={handleChange}
            />
            pledge is anonymous
        </div>
        <button type="submit" onClick={handleSubmit}>
            Submit
            </button>
      </form>
    );
  }
  
export default CreatePledgeForm;