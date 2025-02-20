const Blog = require("../models/blogs");
const mongoose = require("mongoose");

async function createBlog(req, res) {
    try {
        const { country, sections } = req.body;
        
        console.log('Received request body:', req.body);
        console.log('User ID from token:', req.user_id);

        if (!country) {
            return res.status(400).json({ message: "Country is required." });
        }

        if (!Array.isArray(sections) || sections.length === 0) {
            return res.status(400).json({ message: "Blog must have at least one section." });
        }

        const invalidSections = sections.filter(
            section => !section.heading || !section.content
        );

        if (invalidSections.length > 0) {
            return res.status(400).json({
                message: "All sections must have both heading and content."
            });
        }

        const formattedSections = sections.map(section => ({
            heading: section.heading,
            content: section.content,
            imagePath: section.imagePath
        }));

        const newBlogData = {
            userId: new mongoose.Types.ObjectId(req.user_id),
            country,
            sections: formattedSections
        };

        console.log('Creating blog with data:', newBlogData);

        const blog = new Blog(newBlogData);
        await blog.save();

        res.status(201).json({
            message: "Blog created successfully",
            blogId: blog._id.toString(),
            blog: blog
        });
    } catch (error) {
        console.error("Detailed error:", error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Validation error", 
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: "Invalid ID format",
                error: error.message
            });
        }

        res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
}

const BlogsController = {
    createBlog,
};

module.exports = BlogsController;