import { createContext, useState } from "react";

export const MenuContext = createContext();


export function MenuProvider({children}){
    const [menuItems, setMenuItems] = useState([]);

    return (
        <MenuContext.Provider value={{}}>
            {children}
        </MenuContext.Provider>
    );

}