const express = require("express");
const UsersController = require("../controllers/users.js");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");
const passwordValidator = require("../middleware/passwordValidator.js")

// Routes here:

router.post("/", passwordValidator, UsersController.create);
router.get("/find/:email", UsersController.findByEmail);
router.get("/findById/:id", UsersController.findById);
router.get("/find", tokenChecker, UsersController.findUser);
router.post("/create-profile-blurb", tokenChecker, UsersController.createProfileBlurb);
router.post("/create-traveller-type", tokenChecker, UsersController.createTravellerType);
router.post("/create-countries-visited", tokenChecker, UsersController.createCountriesVisited);
router.post("/create-favourite-countries", tokenChecker, UsersController.createFavouriteCountries);



module.exports = router;