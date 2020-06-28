const router = require("express").Router();
const handler = require("../handlers/home");
const isAuth = require("../utils/isAuth");


router.get("/", isAuth(true), handler.get.home);   // each path will be checked if isAuth(). true is normaly used. False - once after logout, to send to login page

module.exports = router;