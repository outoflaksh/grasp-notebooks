import Menu from "./Menu";
import "../styles/nav.css"
function Nav() {
    return (
        <div className="nav">
            <div className="left">
                <h1 className="brand">grasp</h1>
                <Menu />
            </div>
            <div className="right">
                <button>Login</button>
                <button>Logout</button>
            </div>
        </div>
    );
}

export default Nav;