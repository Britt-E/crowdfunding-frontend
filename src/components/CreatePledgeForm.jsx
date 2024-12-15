import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postPledge from "../api/post-pledge.js";
import "./Forms.css";

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
        <div className="form-container">
            <h2 className="form-title">Support This Project</h2>
            <div className="form-group">
                <label className="form-label" htmlFor="amount">Hours to Contribute</label>
                <input
                    type="number"
                    id="amount"
                    className="form-input"
                    placeholder="Enter number of hours"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="comment">Your Message</label>
                <textarea
                    id="comment"
                    className="form-input"
                    placeholder="Share your skills and how you'd like to help..."
                    onChange={handleChange}
                    rows="4"
                />
            </div>
            <button type="submit" className="form-button" onClick={handleSubmit}>
                Pledge Support
            </button>
        </div>
    );
}
  
export default CreatePledgeForm;