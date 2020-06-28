const mongoose = require('mongoose');
const { Schema, model: Play } = mongoose;
const { String, ObjectId, Boolean } = Schema.Types;

const playSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
            },
    description: {
        type: String,
        required: true,
        maxlength: [50, "Description too long! Max is 50"],
        
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        required: true,
    },
    enrolledUsers: [{
        type: ObjectId,
        ref: "User",
    }],
    creator: {
        type: ObjectId,
        ref: "User"
    }
});

playSchema.path("imageUrl").validate(function (url) {       // validation for valid url for the image link
    return (url.startsWith("http://") || url.startsWith("https://")) && (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png"));
}, "Image url is not valid");

module.exports = new Play("Play", playSchema);