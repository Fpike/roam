const express = require("express");
const BlogsController = require("../controllers/blogs.js");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");

// Routes here:


router.post("/create-blog", tokenChecker, BlogsController.createBlog);


module.exports = router;