import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;



const getTokenFromStorage = () => {
    const token = localStorage.getItem("access_token");
    return token ? token : null;
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(getTokenFromStorage());

    const login = token => {
        setTokenAndStore(token);
    }

    const logout = () => {
        setTokenAndStore(token);
    }

    const isLoggedIn = () => {
        const jsonToken = jwt_decode(token);
        return false;
    }

    const setTokenAndStore = (token) => {
        setToken(token);
        localStorage.setItem("access_token", token);
    }

    const value = {
        token,
        login,
        logout,
        isLoggedIn,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}