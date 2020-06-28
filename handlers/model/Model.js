const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;
const { String, ObjectId, Boolean } = Schema.Types;

const modelSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        match: [/^[A-Za-z0-9 ]+$/, "Course title is using not valid chars!"],
    },
    description: {
        type: String,
        required: true,
        minlength: [1, "Description too short!"],
        maxlength: [50, "Description too long! Max is 50"],
        match: [/^[A-Za-z0-9,. ]+$/, "Course description is using not valid chars!"],
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

modelSchema.path("imageUrl").validate(function (url) {       // validation for valid url for the image link
    return (url.startsWith("http://") || url.startsWith("https://")) && (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png"));
}, "Image url is not valid");

module.exports = new Model("Model", modelSchema);