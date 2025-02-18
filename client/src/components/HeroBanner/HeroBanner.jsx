import "../../index.css"
import { getMyUserDetails } from "../../services/users";
import { TravellerType } from "../TravellerType/TravellerType";
import styles from "./HeroBanner.module.css"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HeroBanner() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchUserData() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                
                // Fetch fresh data from the API
                const response = await getMyUserDetails(token);
                if (response && response.userData) {
                    setUserData(response.userData);
                    // Update localStorage with fresh data
                    localStorage.setItem('userData', JSON.stringify(response.userData));
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data');
            } finally {
                setLoading(false);
            }
        }
        
        fetchUserData();
    }, [navigate]);
    
    if (loading) {
        return (
            <div className="container">
                <div className="row py-3 mb-3">
                    <div className="col-12 text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="container">
                <div className="row py-3 mb-3">
                    <div className="col-12 text-center text-danger">
                        {error}
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container p-2">
            <div className={styles.heroBannerContainer}>
            <div className="row align-items-center p-3">
                <div className="col-md-6 p-0">
                    <h3 style={{textAlign: "left"}} className={styles.h3}>Hi, I'm {userData?.firstName || 'there'}</h3>
                    <p style={{marginRight: "16px"}}>{userData?.profileBlurb || 'Loading profile...'}</p>
                    <TravellerType />
                </div>
                <div className="col-md-6 p-0">
                    <div className="my-0">
                        <img className={`img-fluid ${styles.imgHero}`}
                            src="/src/assets/patagonia.png" 
                            alt="Patagonia Logo" 
                        />
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}