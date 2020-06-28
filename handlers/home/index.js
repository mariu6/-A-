const Play = require("../plays/Play");

module.exports = {
    get: {
        home(req, res) {
            const isLoggedIn = (req.user !== undefined);
            Play.find({ isPublic: true })
                .lean()
                .then((plays) => {
                    res.render('home.hbs', {
                        isLoggedIn,                                      // isLoggedIn: isLoggedIn, 
                        username: req.user ? req.user.username : "",
                        plays                                         // hbs each
                    });
                })
        },
        likes(req, res) {
            const isLoggedIn = (req.user !== undefined);
            const criteria = { enrolledUsers: "-1"}  // sort in descending order (for date or enrolled users)
            Play.find({ isPublic: true })
                .lean()
                .sort(criteria)
                .limit(1)
                .then((plays) => {
                    res.render('home.hbs', {
                        isLoggedIn,                                      // isLoggedIn: isLoggedIn, 
                        username: req.user ? req.user.username : "",
                        plays                                         // hbs each
                    });
                })
        },
        date(req, res) {
            const isLoggedIn = (req.user !== undefined);
            const criteria = { createdAt: "-1"}  // sort in descending order (for date or enrolled users)
            Play.find({ isPublic: true })
                .lean()
                .sort(criteria)
                .then((plays) => {
                    res.render('home.hbs', {
                        isLoggedIn,                                      // isLoggedIn: isLoggedIn, 
                        username: req.user ? req.user.username : "",
                        plays                                         // hbs each
                    });
                })
        }
    },
    post: {

    }
};