const express = require("express");
const User = require("../handlers/users/User");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const { cookie } = require("../config/config");
const jwt = require("../utils/jwt");

module.exports = (app) => {                              //  setup of midlewares   
    //view engine setup             
    app.engine("hbs", handlebars({                          
        layoutsDir: "views",                             // default folder for views   
        defaultLayout: "nest",                           //  The wrapper with {{> header/navigation}} {{{ body }}} {{> footer}}           
        partialsDir: "views/partials",                   // default folder for partials      
        extname: "hbs"
    }));
 
    app.use("/static", express.static("static"));                    // static files can be found in folder: public
    app.set("view engine", "hbs");                       // view engine is handlebars  
    app.use(express.json());                             // input from 'form' to be sent as json  
    app.use(cookieParser());                             // for the cookies middleware  
    app.use(express.urlencoded({ extended: true }));    // to be able to get the data from 'form'   
}