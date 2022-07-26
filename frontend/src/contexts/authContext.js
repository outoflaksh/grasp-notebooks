import { createContext, useState } from "react";
import jwt_decode from "jst-decode";

const AuthContext = createContext();
export default AuthContext;





export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const login = token => {
        setToken(token);
    }

    const logout = () => {
        setToken(null);
    }

    const hasExpired = () => {
        const jsonToken = jwt_decode(token);
    }

    const value = {
        token,
        login,
        logout,
        hasExpired,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}