import { createContext, useState } from "react";

const getUserFromToken = () =>{

    const token = localStorage.getItem('token');

    if(!token) return null;

    return JSON.parson(atob(token.split ('.')[1])).payload;
}

const UserContext = createContext();

// function UserProvider({ children }) {
const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const value = { user, setUser };

    return (
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    );
};

export { 
    UserProvider,
    UserContext
};