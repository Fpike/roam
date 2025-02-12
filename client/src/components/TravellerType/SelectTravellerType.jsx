import { useEffect, useState } from "react";
import { getMyUserDetails } from "../../services/users";
import { createTravellerType } from "../../services/users";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./TravellerType.css"

export function SelectTravellerType() {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    const travellerTypes = [
        "History Buff",
        "Sun Chaser",
        "Photo Snapper",
        "Party-er",
        "Thrill Seeker",
        "Budgeter",
        "Nature Lover",
        "Foodie",
        "Hiker",
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found");
            setLoading(false);
            return;
        }

        getMyUserDetails(token)
            .then((allData) => {
                localStorage.setItem("token", allData.token);
                // Store the userId here
                localStorage.setItem("userId", allData.userData._id);
                setSelectedTypes(allData.userData.travellerType || []);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error fetching user details");
                setLoading(false);
                console.error("Error fetching user details:", error);
            });
    }, []);

    const handleSelection = (type) => {
        setIsSaved(false)
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const saveTravellerTypes = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            await createTravellerType(token, selectedTypes);
            console.log("Traveller types updated:", selectedTypes);
            setIsSaved(true);
        } catch (error) {
            console.error("Error:", error);
            setIsSaved(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className="col px-0">
                <h5>What type of traveller are you?</h5>
                <p className="mb-2">Select any that apply to you</p>
            </div>

            <div className="flex gap-4 flex-wrap">
                {travellerTypes.map((type) => (
                    <button
                        key={type}
                        className={`flex items-center mt-2 mx-1 px-3 py-2 rounded-pill border-0
                          ${selectedTypes.includes(type) ? "bg-green" : "bg-green-light"}`}
                        onClick={() => handleSelection(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <button
                onClick={saveTravellerTypes}
                className={`mt-3 px-3 py-2 rounded-pill border-0 d-flex align-items-center gap-2
        ${isSaved ? 'bg-green-saved-preferences' : 'bg-green-preferences'}`}
            >
                {isSaved ? (
                    <>
                        <span>Preferences saved</span>
                        <i className="bi bi-check2 ms-2"></i>
                    </>
                ) : (
                    "Save preferences"
                )}
            </button>
        </div>
    );
}