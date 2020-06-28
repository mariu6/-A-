const env = process.env.NODE_ENV || "development";

const config = {
    development: {
        port: process.env.PORT || 7070,         // the port where the app will run
        dbUrl: "mongodb://localhost:27017",
        cookie: "x-auth-token",                 // authentication cookie name
        secret: "Alleluia",                     // secret word for jwt
    },
    productin: {}
};

module.exports = config[env];