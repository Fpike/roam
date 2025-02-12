import { NavBar } from "../../components/NavBar";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";
import { LatestBlogs } from "../../components/LatestBlogs/LatestBlogs";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const storedUserData = JSON.parse(localStorage.getItem("userData"));
            console.log("StoredUserData:", storedUserData);
            if (storedUserData) {
                setUserData(storedUserData);
            }
        }
        setLoading(false);
    }, [navigate]);

    if (loading) {
        return <div>Loading Profile...</div>;
    }

    return (
        <>
        <NavBar />
        <div className="container vh-100 bg-white">
        <HeroBanner />
        <div className="container">
            <div className="row py-3 mb-3">
                <div className="col-md-7">
                    <LatestBlogs />  
                </div>
                <div className="col-md-5">
                <p>My Favourite Countries</p>
                </div>
            </div>
            
        </div>
        </div>
        </>
    );
}
