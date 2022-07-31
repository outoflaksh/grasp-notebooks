import Menu from "./Menu";
import "../styles/nav.css";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import { useNavigate, NavLink } from "react-router-dom";
function Nav() {
    const { logout, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate;
    return (
        <div className="nav">
            <div className="left">
                <h1 className="brand">grasp</h1>
                <Menu />
            </div>
            <div className="right">
                {isLoggedIn() ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p>Hello, {localStorage.getItem("currUser")}</p>
                        <button onClick={logout}>Logout</button>
                        <NavLink to="dashboard" className="nav-link btn">
                            Dashboard
                        </NavLink>
                    </div>
                ) : (
                    <NavLink to="" className="nav-link btn">
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    );
}

export default Nav;
