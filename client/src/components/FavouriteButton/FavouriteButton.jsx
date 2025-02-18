import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { createFavouriteCountries, getMyUserDetails } from "../../services/users";
import redHeart from "../../assets/red_heart.png";
import whiteHeart from "../../assets/white_heart.png";

export function FavouriteButton({ country }) {
    const [favourite, setFavourite] = useState(false);
    const [selectedCountries, setSelectedCountries] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        getMyUserDetails(token)
            .then((allData) => {
                const userFavourites = allData.userData.favouritedCountries || [];
                setSelectedCountries(userFavourites);
                setFavourite(userFavourites.includes(country)); // Check if this country is already favorited
            })
            .catch((error) => console.error("Error fetching user details:", error));
    }, [country]);

    const saveFavouriteCountries = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        let updatedFavourites;
        if (favourite) {
            updatedFavourites = selectedCountries.filter(c => c !== country); // Remove if already in list
        } else {
            updatedFavourites = [...selectedCountries, country]; // Add if not in list
        }

        setSelectedCountries(updatedFavourites);
        setFavourite(!favourite); // Toggle favorite status

        try {
            await createFavouriteCountries(token, updatedFavourites);
            localStorage.setItem("favouritedCountries", JSON.stringify(updatedFavourites)); // Save to localStorage
        } catch (error) {
            console.error("Error saving favourites:", error);
        }
    };

    return (
        <div className="col-md-1 p-0">
            <img 
                onClick={saveFavouriteCountries}
                style={{ width: "24px", height: "auto", cursor: "pointer" }}
                src={favourite ? redHeart : whiteHeart} 
                alt="Favourite Button"
            />
        </div>
    );
}

// ✅ Fix prop validation error
FavouriteButton.propTypes = {
    country: PropTypes.string.isRequired
};