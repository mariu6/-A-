// used for validation
const { body } = require("express-validator");

module.exports = {
    user: [
        body("username").isLength({ min: 5 }),
        body("password").isLength({ min: 5 }),
        body("repassword").isLength({ min: 5 })
    ],
    event: [
        body("property").isLength({ min: 5 }),
        body("otherProperty").isLength({ min: 5 })
    ]
}