import { useContext, useEffect } from "react";
import { MenuContext } from "./contexts/menuContext";

export function useMenu(menuItems){
    const {setMenuItems} = useContext(MenuContext);
    useEffect(()=>{
        setMenuItems(menuItems);
    },[]);
}