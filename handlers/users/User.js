const mongoose = require('mongoose');
const { Schema, model: User } = mongoose;
const { String, ObjectId } = Schema.Types;
const bcrypt = require("bcrypt");
const saltRounds = 15;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Username too short!"],
        maxlength: [150, "Username too long! Max is 150"],
        match: [/^[A-Za-z0-9 ]+$/, "Username is using not valid chars!"],
    },
    password: {
        type: String,
        required: true,
        minlength: [3, "Password too short!"],
        maxlength: [150, "Password too long! Max is 150"],
        match: [/^[A-Za-z0-9 ]+$/, "Password is using not valid chars!"],
    },
    linkedPlays: [{
        type: ObjectId,
        ref: "Play"
    }]
});

userSchema.methods = {
    passwordsMatch(password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre("save", function (next) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        })
    })
})

module.exports = new User("User", userSchema);