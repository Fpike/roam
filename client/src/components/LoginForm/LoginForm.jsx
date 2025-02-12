import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyUserDetails } from "../../services/users";
import { login } from "../../services/authentication";
import styles from "../../FormStyling.module.css"

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      const userDetails = await getMyUserDetails(token);
      localStorage.setItem("userData", JSON.stringify(userDetails.userData));

      navigate("/dashboard");
 
    } catch (err) {
      console.error(err);

      setEmail("");
      setPassword("");
      setErrorMessage("Incorrect email or password. Please try again.");
      ;
     
  }
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
    setErrorMessage("");
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setErrorMessage(""); 
  }

  return (
    <>
            <div className="form-container">
      <form onSubmit={handleSubmit}>
        {errorMessage && (
            <div className="error-message" role="alert">
              {errorMessage}
            </div>
          )}  

        <label htmlFor="email" className="form-label">Email</label>
        <input
          placeholder="Email"
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password" className="form-label">Password</label>
        <input
          style={{marginBottom: "20px"}}
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input className="form-button" role="submit-button" id="submit" type="submit" value="Log in" />
      </form>
      </div>
    </>
  );
}
