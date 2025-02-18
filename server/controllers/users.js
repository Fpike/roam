const User = require("../models/user");
const mongoose = require("mongoose");
const { generateToken } = require("../lib/token");

// Create a new User


async function create(req, res) {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({
            firstName,
            lastName,
            email,
            password,
        });

        const savedUser = await user.save();
        const token = generateToken(savedUser._id);  // Generate token

        res.status(201).json({
            message: 'User created successfully',
            user: savedUser,
            token: token  // Send token back
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Something went wrong while creating user',
            error: error.message,
        });
    }
}

// Find own user

async function findUser(req,res){
    const user = await User.find({_id: req.user_id});
    const token = generateToken(req.user_id);

    const returnUserData = {
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        profileBlurb: user[0].profileBlurb,
        travellerType: user[0].travellerType,
        countriesVisited: user[0].countriesVisited,
        favouritedCountries: user[0].favouritedCountries,
    }
    res.status(200).json({userData: returnUserData, token: token });
}

// Find a User by Email

function findByEmail(req, res) {
    const { email } = req.params;
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        })
        .catch((err) => {
            console.error("Error finding user by email:", err);
            res.status(500).json({ message: "Something went wrong" });
        });
}


// Find a User by ID

async function findById(req, res) {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid User ID format" });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error("Error finding user by ID:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

// Set a user's blurb

async function createProfileBlurb(req, res) {
    const token = generateToken(req.user_id);
    try {
        const id = req.user_id
        for (const key in req.body) {
            if (typeof req.body[key] === "string") { //check if string
                let wordCount = req.body[key].trim().split(/\s+/).length; //count words
                if (wordCount >= 20 && wordCount <= 50) {
                    console.log("Valid blurb:", req.body[key]);
                } else {
                    console.log("Blurb must be between 20 and 50 words.")
                }
            }
        }
        const updateProfileBlurb = await User.updateOne(
            {_id: req.user_id},
            {$set: {
                profileBlurb: req.body.profileBlurb
            }}).then((updateProfileBlurb) => {
                res.status(201).json({token: token});
            })
    } catch (error) {
        res.status(400).json({message: "Error setting profile blurb", token: token})
    }
}

// Set a user's traveller type

async function createTravellerType(req, res) {
    const token = generateToken(req.user_id);
    try {
        const { travellerType } = req.body;
        
        // Validate that travellerType is an array
        if (!Array.isArray(travellerType)) {
            return res.status(400).json({ 
                message: "Traveller type must be an array",
                token: token 
            });
        }

        // Update the user
        const updateTravellerType = await User.findByIdAndUpdate(
            req.user_id,
            { $set: { travellerType: travellerType } },
            { new: true }
        );

        if (!updateTravellerType) {
            return res.status(404).json({ 
                message: "User not found",
                token: token 
            });
        }

        res.status(200).json({
            message: "Traveller type updated successfully",
            token: token
        });
    } catch (error) {
        console.error('Error updating traveller type:', error);
        res.status(400).json({
            message: "Error setting traveller type", 
            error: error.message,
            token: token
        });
    }
}


// Set a user's visited countries

async function createCountriesVisited(req, res) {
    const token = generateToken(req.user_id);
    try {
        const { countriesVisited } = req.body;
        
        // Validate that countriesVisited is an array
        if (!Array.isArray(countriesVisited)) {
            return res.status(400).json({ 
                message: "Countries visited must be an array",
                token: token 
            });
        }

        // Update the user
        const updateCountriesVisited = await User.findByIdAndUpdate(
            req.user_id,
            { $set: { countriesVisited: countriesVisited } },
            { new: true }
        );

        if (!updateCountriesVisited) {
            return res.status(404).json({ 
                message: "User not found",
                token: token 
            });
        }

        res.status(200).json({
            message: "Countries visited updated successfully",
            token: token
        });
    } catch (error) {
        console.error('Error updating countries visited:', error);
        res.status(400).json({
            message: "Error setting countries visited", 
            error: error.message,
            token: token
        });
    }
}

// Set a user's favourite countries

async function createFavouriteCountries(req, res) {
    const token = generateToken(req.user_id);
    try {
        const { favouritedCountries } = req.body;
        
        // Validate that countriesVisited is an array
        if (!Array.isArray(favouritedCountries)) {
            return res.status(400).json({ 
                message: "Favourited countries must be an array",
                token: token 
            });
        }

        // Update the user
        const updateFavouriteCountries = await User.findByIdAndUpdate(
            req.user_id,
            { $set: { favouritedCountries: favouritedCountries } },
            { new: true }
        );

        if (!updateFavouriteCountries) {
            return res.status(404).json({ 
                message: "User not found",
                token: token 
            });
        }

        res.status(200).json({
            message: "Favourited countries updated successfully",
            token: token
        });
    } catch (error) {
        console.error('Error updating countries visited:', error);
        res.status(400).json({
            message: "Error setting favourite countries", 
            error: error.message,
            token: token
        });
    }
}



const UsersController = {
    create: create,
    findByEmail,
    findById,
    findUser,
    createProfileBlurb,
    createTravellerType,
    createCountriesVisited,
    createFavouriteCountries,
};
module.exports = UsersController;
