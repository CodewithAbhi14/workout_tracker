import React, { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 
    const { dispatch } = useAuthContext();
    

    const logIn = async (email, password) => {
        setError(null);
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();

            if (!response.ok) {
                // Set error message from response or a default message
                setError(json.error || 'Login failed. Please try again.');
                setLoading(false);
            } else {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch && dispatch({ type: 'LOGIN', payload: json });
                setLoading(false);
            }
        } catch (err) {
            setError('Network error. Please check your connection.');
            setLoading(false);
        }
    };

    return { logIn, error, loading };
};

export default useLogin;
