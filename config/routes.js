const routes = require("../routes");       

module.exports = (app) => {
    app.use("/", routes.home);            
    app.use("/users", routes.users);
    app.use("/plays", routes.plays);
    app.use("*", (req, res, next) => {
        res.render("../views/404.hbs");
        next();
    });
}