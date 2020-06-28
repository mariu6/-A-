// Will return middleware to determine if the user is logged in
const jwt = require("./jwt");
const User = require("../handlers/users/User");
const { cookie } = require("../config/config");

module.exports = (justContinue = false) => {
    return function (req, res, next) {
        const token = req.cookies[cookie] || "";
        jwt.verifyToken(token)                          // de-cription
        .then((result) => {
            User.findById(result._id).then((user) => {  // find the user by his id
                req.user = user;                        // apply property with the name of the user, to use it in the handler after authenticatoin
                next();
            })
        }).catch((err) => {
            if (justContinue) {
                next();
                return;
            }
            res.status(300).redirect("/user/login");
        });
    }
}