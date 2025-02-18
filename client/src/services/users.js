const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export async function getMyUserDetails(token) {
    const requestOptions = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    }
    const response = await fetch(`${BACKEND_URL}/users/find`, requestOptions);
    if (response.status !== 200) {
        throw new Error("Unable to fetch user details");
    }

    const data = await response.json();
    return data;
}

export async function getUserByEmail(token, email) {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    };
    const response = await fetch(`${BACKEND_URL}/users/find/${email}`, requestOptions);

    if (!response.ok) {
        throw new Error(`User not found or error: ${response.statusText}`);
    }

    const user = await response.json();
    return user;
}

export async function getUserByName(token, firstName) {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    };
    const response = await fetch(`${BACKEND_URL}/users/find/${firstName}`, requestOptions);

    if (!response.ok) {
        throw new Error(`User not found or error: ${response.statusText}`);
    }
    const user = await response.json();
    return user;
}


export const submitNewUser = async (firstName, lastName, email, password) => {
    try {
        const response = await fetch('http://localhost:9000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem("token", data.token);  // Store token for authentication
            return data;
        } else {
            throw new Error(data.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};

export async function createProfileBlurb(token, profileBlurb) {
    const payload = {
        profileBlurb: profileBlurb,
    }
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    };
    const response = await fetch(`${BACKEND_URL}/users/create-profile-blurb`, requestOptions)

    if (!response.ok) {
        throw new Error(`Failed to update profile blurb: ${response.statusText} (Status: ${response.status})`);
    }
}


export async function createTravellerType(token, travellerType) {
    const payload = {
        travellerType: travellerType,
    }
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    };
    const response = await fetch(`${BACKEND_URL}/users/create-traveller-type`, requestOptions)

    if (!response.ok) {
        throw new Error(`Failed to update traveller type: ${response.statusText} (Status: ${response.status})`);
    }
}

export async function createCountriesVisited(token, countriesVisited) {
    const payload = {
        countriesVisited: countriesVisited,
    }
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    };
    const response = await fetch(`${BACKEND_URL}/users/create-countries-visited`, requestOptions)

    if (!response.ok) {
        throw new Error(`Failed to update traveller type: ${response.statusText} (Status: ${response.status})`);
    }
}

export async function createFavouriteCountries(token, favouritedCountries) {
    const payload = {
        favouritedCountries: favouritedCountries,
    }
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    };
    const response = await fetch(`${BACKEND_URL}/users/create-favourite-countries`, requestOptions)

    if (!response.ok) {
        throw new Error(`Failed to update traveller type: ${response.statusText} (Status: ${response.status})`);
    }
}