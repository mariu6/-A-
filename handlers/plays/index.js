// Insert the EVENT 
const User = require("../users/User");
const Play = require("./Play");
// const { model } = require("mongoose");

module.exports = {
    get: {
        createPlay(req, res) {
            const isLoggedIn = (req.user !== undefined);
            res.render("plays/create-play.hbs", {
                isLoggedIn,
                username: req.user ? req.user.username : null,
            });
        },
        detailsPlay(req, res) {
            const { playId } = req.params;
            Play
                .findById(playId)
                .populate("enrolledUsers")
                .lean().then((play) => {
                    const enrolled = JSON.stringify(play.enrolledUsers).includes(JSON.stringify(req.user._id));
                    const isLoggedIn = (req.user !== undefined);
                    res.render("plays/details-play.hbs", {
                        isLoggedIn,
                        username: req.user ? req.user.username : null,
                        play,
                        isCreator: JSON.stringify(play.creator) === JSON.stringify(req.user._id),
                        enrolled,
                    });

                })
        },
        editPlay(req, res) {
            const { playId } = req.params;
            const userId = req.user._id;
            Play
                .findById(playId).lean().then((play) => {
                    const isLoggedIn = (req.user !== undefined);
                    res.render("plays/edit-play.hbs", {
                        isLoggedIn,
                        username: req.user ? req.user.username : null,
                        play,
                        playId
                    });
                })
        },
        enrollForPlay(req, res) {
            const { playId } = req.params;
            const userId = req.user._id;
            return Promise.all([                                                  // Update of related fields in 2 DB's
                Play.updateOne({ _id: playId }, { $push: { enrolledUsers: userId } }),
                User.updateOne({ _id: userId }, { $push: { enrolledCourses: playId } })
            ]).then(([updatedPlay, updatedUser]) => {
                res.redirect(`/plays/details-play/${playId}`)
            }).catch((err) => console.log(err.message));
        },
        deletePlay(req, res) {
            const { playId } = req.params;
            const userId = req.user._id;

            return Promise.all([                                                  // Update of related fields in 2 DB's
                Play.updateOne({ _id: playId }, { $pull: { "enrolledUsers": userId } }),
                Play.deleteOne({ _id: playId }),
                Play.updateOne({ _id: userId }, { $pull: { "enrolledCourses": playId } })
            ]).then(([updatedPlay, deletePlay, updatedUser]) => {
                res.redirect(`/`)
            }).catch((err) => console.log(err.message, err));
        },
    },
    post: {
        createPlay(req, res) {
            const { title, description, imageUrl, isPublic: public } = req.body;        // isPublic: "on" || undefined
            // console.log(public);
            isPublic = !!public;
            const createdAt = (new Date() + "").slice(0, 24);                           // Date & time only
            const creator = req.user._id;
            Play.create({ title, description, imageUrl, isPublic, createdAt, creator })  // enrolled will be created by default 
                .then((createdCourse) => {
                    // console.log(createdCourse);
                    res.status(201).redirect("/");
                }).catch(function (err) {
                    if (err.name === 'ValidationError') {
                        console.error('Error Validating!', err);
                        const isLoggedIn = (req.user !== undefined);
                        res.status(422).render("plays/create-play.hbs", {
                            isLoggedIn,
                            username: req.user ? req.user.username : null,
                            message: err.errors.description || err.errors.imageUrl
                        });
                    } else if (err.name === 'MongoError') {
                        console.error(err);
                        const isLoggedIn = (req.user !== undefined);
                        res.status(422).render("plays/create-play.hbs", {
                            isLoggedIn,
                            username: req.user ? req.user.username : null,
                            message: "Course name already exists!"
                        });
                    } else {
                        console.error(err);
                        res.status(500).json(err);
                    }
                })
        },
        editPlay(req, res) {
            const { title, description, imageUrl, isPublic: public } = req.body;        // isPublic: "on" || undefined
            isPublic = !!public;
            Play.findByIdAndUpdate({ _id: req.params.playId }, {
                "title": title,
                "description": description,
                "imageUrl": imageUrl,
                "isPublic": isPublic
            }).then((err, updated) => {
                if (err) console.log("Update error:    ", err)
                const isLoggedIn = (req.user !== undefined);
                res.render("home.hbs", {
                    isLoggedIn,
                    username: req.user ? req.user.username : null,
                    updated,
                });
            })
        },

    }
}