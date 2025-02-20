import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProfileBlurb, getMyUserDetails } from "../../services/users.js";
import styles from "./BuildProfile.module.css"

export function BuildProfileForm() {
    const [errorStatus, setErrorStatus] = useState(false);
    const [profileBlurb, setProfileBlurb] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();
    let errorHelp = false;

    useEffect(() => {
        const token = localStorage.getItem("token");
        getMyUserDetails(token)
            .then((allData) => {
                localStorage.setItem("token", allData.token);
                return allData.userData;
            })
            .then((data) => setProfileBlurb(data.profileBlurb || ""))
            .catch((error) => {
                console.error("Error fetching user details:", error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        errorHelp = false;
        setErrorStatus(false);
        setGeneralError("");

        const token = localStorage.getItem("token");

        try {
            // Trim and count words
            const wordCount = profileBlurb.trim().split(/\s+/).length;

            // Validate word count (must be 20-50 words)
            if (wordCount < 20 || wordCount > 50) {
                errorHelp = true;
                setErrorStatus(true);
                setGeneralError("Your blurb must be between 20 and 50 words.");
            }

            if (errorHelp) {
                return; // Stop submission if there's an error
            }

            // If valid, submit the blurb
            await createProfileBlurb(token, profileBlurb);
            setSuccessMessage("Profile updated successfully!");
            navigate("/dashboard");
        } catch (err) {
            console.error("Error during profile update:", err);
            setGeneralError(err.message || "Profile build failed. Please try again.");
            setErrorStatus(true);
        }
    };

    return (
        <div>
            <div className="container p-0">
                <form onSubmit={handleSubmit}>
                    <h5 style={{textAlign: "left"}}>Tell us a bit about yourself...</h5>

                    {successMessage && (
                        <div className="success-message" role="alert">
                            {successMessage}
                        </div>
                    )}
                    
                    {generalError && (
                        <div className="error-message" role="alert">
                            {generalError}
                        </div>
                    )}

                    <div className="row">
                        <div className="col d-flex">
                            <textarea
                        placeholder="We recommend 20-40 words introducing yourself and what you love about travel."
                        id="profileBlurb"
                        value={profileBlurb}
                        onChange={(e) => setProfileBlurb(e.target.value)}
                        required
                    />
                        </div>
                    </div>
                    <hr />
                    <input className="form-button" role="submit-button" id="submit" type="submit" value="Let's go" />
                </form>
            </div>
        </div>
    );
};