import React, { useState, createContext } from 'react';

const authContext = createContext();
const AuthContextProvider = authContext.Provider;

const App = () => {
    return (
        <AuthProvider>
            <p>Here one can consume AuthContextConsumer</p>
        </AuthProvider>    
    )
}

const AuthProvider = ({ children }) => {
    const auth = useAuthService();
    return <AuthContextProvider value={auth}>{children}</AuthContextProvider>;
}

const useAuthService = () => {
    const [ userInfo, setUserInfo ] = useState(null);
    const login = (username, password) => {
        return loginApi(username, password)
                .then(response => setUserInfo(response));
    }

    const logout = () => {
        return unauthenticate()
                .then(setUserInfo(null));
    }

    return { userInfo, login, logout };
}

