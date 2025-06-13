import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);

    const login = (token) => {
        localStorage.setItem("authToken", token);
        setIsLoggedIn(true);
        window.dispatchEvent(new Event("storage"));
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};