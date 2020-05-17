import React, { useState, useEffect, createContext } from 'react';

const authContext = createContext();
const authContextProvider = authContext.Provider;
const authContextConsumer = authContext.Consumer;

const App = () => {
    return (
        <AuthProvider>
            <p>Hey AuthService</p>
        </AuthProvider>    
    )
}

const AuthProvider = ({ children }) => {
    const auth = useAuthService();
    return <authContextProvider value={auth}>{children}</authContextProvider>;
}

