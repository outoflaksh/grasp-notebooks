import { useContext } from "react";
import { MenuContext } from "../contexts/menuContext";
import "../styles/menu.css";

function Menu() {
    const {menuItems} = useContext(MenuContext);
    return (
        <div className="menu">
            {menuItems}
        </div>
    );
}

export default Menu;