const mongoose = require("mongoose");
const dbString = require("./config").dbUrl + "NAME";     // TO DO the name of the DB

module.exports = () => {
    return mongoose.connect(dbString, {     // .connect returns promise, exported as a function
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err) => {
        if (err) {
            console.error("Mongoose error: Check configurations files! ", err);
            throw err;
        }
        console.log("<< Database is Active >>")
    })
}