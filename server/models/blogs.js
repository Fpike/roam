const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    country: {
        type: String,
        required: true,
        enum: countryList,  // Make sure to validate that it's a country from the list
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Blog = mongoose.model('Blog', BlogSchema);
