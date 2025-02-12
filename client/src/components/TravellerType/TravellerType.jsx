import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyUserDetails } from "../../services/users";
import "./TravellerType.css";

export function TravellerType() {
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
        console.log("Yesiree user data right here:", response);
        if (response && response.userData) {
          setUserData(response.userData);
          // Update localStorage with fresh data
          localStorage.setItem('userData', JSON.stringify(response.userData));
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
        navigate('/login')
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container p-0">
        {userData?.travellerType?.map((item, index) => (
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

