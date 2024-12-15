import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import "./NavBar.css";

function NavBar() {
    const {auth, setAuth} = useAuth();
    
    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

    return (
    <div>
        <nav>
            <Link to="/">Home</Link>
            <div>

            {auth.token ? (
                <Link to="/" onClick={handleLogout}>
                    Log Out
                </Link>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            <Link to="/signup">Sign Up</Link>
            </div>
        </nav>
        <Outlet />
    </div>
    );
}

export default NavBar;