require("./config/database")().then(() => {         // executes the mongoose.connect and returns promise
    const config = require("./config/config");      // require the DB configuration
    const app = require("express")();               // execute express application    

    require("./config/express")(app);               // creation of the middlewares
    require("./config/routes")(app);                // creation of the routes

    app.listen(config.port, console.log(`Server is ready and listening on port ${config.port}`));
})