const mongoose = require('mongoose');
const { Schema, model: User } = mongoose;
const { String, Number, ObjectId } = Schema.Types;
const bcrypt = require("bcrypt");
const saltRounds = 15;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [{
        type: ObjectId,
        ref: "Model"
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