const router = require('express').Router();
const handler = require('../handlers/plays');
const isAuth = require('../utils/isAuth');
// const validations = require('../utils/validator');

router.get("/create-play", isAuth(), handler.get.createPlay);
router.get("/details-play/:playId", isAuth(), handler.get.detailsPlay);
router.get("/edit-play/:playId", isAuth(), handler.get.editPlay);
router.get("/enroll-play/:playId", isAuth(), handler.get.enrollForPlay);
router.get("/delete-play/:playId", isAuth(), handler.get.deletePlay);

router.post("/create-play", isAuth(), handler.post.createPlay);
router.post("/edit-play/:playId", isAuth(), handler.post.editPlay);


module.exports = router; 