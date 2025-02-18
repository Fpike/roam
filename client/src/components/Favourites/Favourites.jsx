import { useEffect, useState } from "react";
import { getMyUserDetails } from "../../services/users";
import styles from "./Favourites.module.css";

export function DisplayFavouriteCountries() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found");
            setLoading(false);
            return;
        }

        getMyUserDetails(token)
            .then((allData) => {
                setUserData(allData.userData);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error fetching user details");
                setLoading(false);
                console.error("Error fetching user details:", error);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (

        <div className={`container ${styles.favouriteCountriesContainer}`}>
            <h4>My Favourites</h4>
            {userData?.favouritedCountries?.map((item, index) => (
          <button
            style={{ pointerEvents: "none" }}
            key={index}
            className="traveller-button"
          >
            {item}
          </button>
            ))}
        </div>

    )
}
