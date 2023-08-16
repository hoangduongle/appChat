import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                setIsLoading(false);
                navigate('/');
                return;
            }
            setIsLoading(false);
            navigate('/login');
        });
        return () => {
            unsubscribed();
        }
    }, [navigate]);

    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    )
}
