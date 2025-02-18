import { useEffect, useState } from "react";
import { getMyUserDetails } from "../../services/users";
import { createCountriesVisited } from "../../services/users";

export function SelectCountries() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    const countryList = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
        "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Congo (Congo-Kinshasa)",
        "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
        "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
        "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
        "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
        "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South",
        "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
        "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
        "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
        "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
        "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
        "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
        "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
        "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
        "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
        "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
        "Vietnam", "Yemen", "Zambia", "Zimbabwe"
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
                    setSelectedCountries(allData.userData.countriesVisited || []);
                    setLoading(false);
                })
                .catch((error) => {
                    setError("Error fetching user details");
                    setLoading(false);
                    console.error("Error fetching user details:", error);
                });
        }, []);

        const toggleDropdown = () => {
            setDropdownOpen(!dropdownOpen);
        };

        const handleSelection = (type) => {
            setIsSaved(false)
            setSelectedCountries((prev) =>
                prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
            );
            setDropdownOpen(false);
        };

        const saveCountriesVisited = async () => {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    return;
                }
        
                try {
                    await createCountriesVisited(token, selectedCountries);
                    console.log("Countries visited updated:", selectedCountries);
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
        <>
    <div>
        <div className="col px-0">
            <h5>What countries have you visited?</h5>
            <p className="mb-2">Select any that apply to you</p>
        </div>

        <div className="dropdown">
            <button 
                onClick={toggleDropdown} 
                className={`flex items-center mt-2 mx-1 px-3 py-2 rounded-pill border-0 bg-green-light `}
                type="button" 
                aria-expanded="false"
            >
                Select Countries <i className="bi bi-chevron-down ms-2"></i>
            </button>
            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`} style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {countryList.map((country) => (
                    <li key={country}>
                        <a 
                            className={`dropdown-item ${selectedCountries.includes(country) ? "bg-green" : ""}`} 
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelection(country)}}
                            href="#"
                            style={{ cursor: 'pointer' }}
                        >
                            {country}
                        </a>
                    </li>
                ))}
            </ul>
        </div>

        <div className="flex gap-4 flex-wrap mt-3">
            {selectedCountries.map((country) => (
                <button
                    key={country}
                    className={`flex items-center mt-2 mx-1 px-3 py-2 rounded-pill border-0 bg-green`}
                    onClick={() => handleSelection(country)}
                >
                    {country} 
                    <i className="bi bi-x ms-2"></i>
                </button>
            ))}
        </div>

        {selectedCountries.length > 0 && (
            <button
                onClick={saveCountriesVisited}
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
        )}
    </div>
    </>
    )
}