import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import postLogin from "../api/post-login.js";
import useAuth from "../hooks/use-auth.js";
import "./Forms.css";

function LoginForm() {
    const navigate = useNavigate();  
    const { setAuth } = useAuth();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            postLogin(credentials.username, credentials.password)
                .then((response) => {
                    window.localStorage.setItem("token", response.token);
                    setAuth({
                        token: response.token,
                    });
                    navigate("/");
                })
                .catch(() => {
                    setErrorMessage("Incorrect username or password. Please try again.");
                });
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title">Welcome Back</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form-group">
                <label className="form-label" htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    className="form-input"
                    placeholder="Enter your username"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="form-button">
                Log In
            </button>
            <Link to="/signup" className="form-link">
                Don&apos;t have an account? Sign up here
            </Link>
        </form>
    );
}

export default LoginForm;