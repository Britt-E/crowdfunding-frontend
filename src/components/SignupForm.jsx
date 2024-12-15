import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import postSignup from "../api/signup.js";
import useAuth from "../hooks/use-auth.js";
import "./Forms.css";

function SignupForm() {
    const navigate = useNavigate();  
    const {auth, setAuth} = useAuth();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: "",
    });
        
    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password && credentials.email) {
            postSignup(
                credentials.username,
                credentials.password,
                credentials.email            
            ).then((response) => {
                window.localStorage.setItem("token", response.token);
                setAuth({
                    token: response.token,
                });
                navigate("/");
            });
        }
    };

    return (
        <form className="form-container">
            <h2 className="form-title">Join Project Buddy</h2>
            <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    className="form-input"
                    placeholder="Choose a username"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Create a password"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="form-button" onClick={handleSubmit}>
                Sign Up
            </button>
            <Link to="/login" className="form-link">
                Already have an account? Log in here
            </Link>
        </form>
    );
}

export default SignupForm;