const Play = require("../plays/Play");

module.exports = {
    get: {
        home(req, res) {
            const isLoggedIn = (req.user !== undefined);

            // limit and sort
            // const limit = isLoggedIn ? 0 : 3;
            // const criteria = isLoggedIn ? {createdAt: "-1"} : { enrolledUsers: "-1"}  // sort in descending order (for date or enrolled users)

            Play.find({ isPublic: true })
            .lean()
            // .limit(limit)
            // .sort(criteria)
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