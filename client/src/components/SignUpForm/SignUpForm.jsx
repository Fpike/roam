import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../FormStyling.module.css";

import { submitNewUser } from "../../services/users.js";
import { useEffect } from "react";

export function SignUpForm() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[a-zA-Z\d@$!%*?&#]{8,}$/;

    const navigate = useNavigate();

    const validateFirstName = (firstName) => {
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        return nameRegex.test(firstName);
    };

    const validateLastName = (lastName) => {
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        return nameRegex.test(lastName);
    };

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        setNameError("");
        setPasswordError("");
        setGeneralError("");
        setSuccessMessage("");
    
        if (!validateFirstName(firstName)) {
            setNameError("Invalid first name.");
            return;
        }
    
        if (!validateLastName(lastName)) {
            setNameError("Invalid last name.");
            return;
        }
    
        if (!passwordRegex.test(password)) {
            setPasswordError("Password does not meet requirements.");
            return;
        }
    
        try {
            const data = await submitNewUser(firstName, lastName, email, password);
    
            console.log("Signup successful:", data);
    
            if (data.token) {
                localStorage.setItem("token", data.token); // Store token
                navigate("/build-profile"); // Redirect
            } else {
                setGeneralError("Signup successful, but token missing.");
            }
    
        } catch (error) {
            console.error("Error during signup:", error);
            setGeneralError(error.message || "Sign up failed. Please try again.");
        }
    };

    return (
        <div>
            <div className="container">
                <form className="form-container" onSubmit={handleSubmit}>
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

                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        style={{ marginBottom: "20px" }}
                        placeholder="First Name"
                        id="firstname"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />

                    {nameError && (
                        <div className="field-error" role="alert">
                            {nameError}
                        </div>
                    )}  

                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        style={{ marginBottom: "20px" }}
                        placeholder="Last Name"
                        id="lastname"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                    {nameError && (
                        <div className="field-error" role="alert">
                            {nameError}
                        </div>
                    )}  

                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        style={{ marginBottom: "20px" }}
                        placeholder="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        style={{ marginBottom: "8px" }}
                        placeholder="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {passwordError && (
                        <div className="field-error" role="alert">
                            {passwordError}
                        </div>
                    )}

                    <br />
                    <br />
                    <input className="form-button" role="submit-button" id="submit" type="submit" value="Let's go" />
                </form>
            </div>
        </div>
    );
};
