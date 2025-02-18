import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";
import { DisplayCountries } from "../../components/Countries/DisplayCountries";
import { DisplayFavouriteCountries } from "../../components/Favourites/Favourites";
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
            <div className="container bg-white pb-1">
                <div className="py-3">
                    <HeroBanner />
                </div>
                <div className="container">
                    <div className="row g-3 mb-3">
                        <div className="col-md-7">
                            <LatestBlogs />
                        </div>
                        <div className="col-md-5">
                            <DisplayFavouriteCountries />
                            <br />
                            <DisplayCountries />
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}
