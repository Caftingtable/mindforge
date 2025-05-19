import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import PropTypes from 'prop-types';
import auth from './firebase.config';
import axios from 'axios';

export const AuthContext = createContext();
const Authentication = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();
    const providerGitHub = new GithubAuthProvider();

    const handleRegister = (email, password, role = 'student') => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password).then(res => {
            const currentUser = res.user;
            return axios.post('http://localhost:5050/api/users/upsert', {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName || currentUser.email,
                role
            }).then(() => res);
        });
    }

    const handleLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const handleGoogle_Login = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const handleGithub_Login = () => {
        setLoading(true);
        return signInWithPopup(auth, providerGitHub);
    }

    const handleLogOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                const isAdmin = currentUser.email === 'studyatmindforge@gmail.com'; // ✅ Set your admin email here
                axios.post('http://localhost:5050/api/users/upsert', {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName || currentUser.email,
                    role: isAdmin ? 'admin' : undefined
                });
            }
        });
        return () => unsubscribe();
    }, []);

    const value = {
        handleGoogle_Login,
        handleGithub_Login,
        handleLogOut,
        handleLogin,
        handleRegister,
        user,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

Authentication.propTypes = {
    children: PropTypes.node,
}

export default Authentication;
