import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from "../assets/roam_white.svg";
import "./Footer.css";
import { LogOutButton } from "./LogOutButton.jsx";

export function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // Check if the user is logged in by checking for the token
        if (token) {
            const storedUserData = JSON.parse(localStorage.getItem("userData"));
            setUserData(storedUserData);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        setLoading(false); // Stop loading when the data is processed
    }, [navigate]);

    if (loading) {
        return <div>Loading Profile...</div>;
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Conditionally render the logo link based on login status */}
                <Link to={isLoggedIn ? "/dashboard" : "/"}>
                    <img className="logo" src={logo} alt="Logo" />
                </Link>

                <div className="nav-links">
                    {isLoggedIn ? (
                        <>
                            <Link className="nav-link" to="/dashboard">{userData?.name}</Link>
                            <Link className="nav-link" to="/build-profile">Edit Profile</Link>
                            <LogOutButton />
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/login">Log in</Link>
                            <Link className="nav-link" to="/signup">Sign up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}