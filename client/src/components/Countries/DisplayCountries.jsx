import { useEffect, useState } from "react";
import { getMyUserDetails } from "../../services/users";
import styles from "./DisplayCountries.module.css";
import { FavouriteButton } from "../FavouriteButton/FavouriteButton";

export function DisplayCountries() {
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
        <div className={`container ${styles.countryContainer}`}
        >
            <div className={`row d-flex align-items-center`}>
                <div className="col-md-7">
                    <h4>My Countries</h4>
                </div>
                <div className="col-md-5">
                    <div className={`${styles.addCountryButton}`}>Add country +</div>
                </div>
            </div>
            <hr />
            {userData?.countriesVisited?.map((item, index) => (
                <ul className="p-1 mx-3"
                    key={index}
                >
                    <div className="row" style={{ borderBottom: "0.5px solidrgb(130, 130, 130)" }}>
                        <div className="col-md-4 p-0">
                            <div className={styles.myCountries}>{item}</div>
                        </div>
                        <div className="col-md-1 p-0"></div>
                        <div className="col-md-4 p-0">
                            <div className={styles.addBlogButton}>Add blog +</div>
                        </div>
                        <div className="col-md-2 p-0"></div>
                        <div className="col-md-1 p-0" >
                            <FavouriteButton country={item} />
                        </div>
                    </div>
                </ul>
            ))}
        </div>
    )
}
