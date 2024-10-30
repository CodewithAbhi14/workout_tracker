import React, { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 
    const { dispatch } = useAuthContext();
    

    const signUp = async (email, password) => {
        setError(null);
        setLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Signup failed. Please try again.');
            } else {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch && dispatch({ type: 'LOGIN', payload: json });
            }
        } catch (err) {
            setError('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return { signUp, error, loading };
};

export default useSignup;
