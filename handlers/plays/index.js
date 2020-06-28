// Insert the EVENT model
const User = require("../users/User");
const Play = require("./Play");
const { model } = require("mongoose");

module.exports = {
    get: {
        createPlay(req, res) {
            const isLoggedIn = (req.user !== undefined);
            res.render("courses/create-course.hbs", {
                isLoggedIn,
                username: req.user ? req.user.username : null,
            });
        },
        detailsPlay(req, res) {
            const { courseId } = req.params;
            Play
                .findById(courseId)
                .populate("enrolledUsers")
                .lean().then((course) => {
                    const enrolled = JSON.stringify(course.enrolledUsers).includes(JSON.stringify(req.user._id));
                    const isLoggedIn = (req.user !== undefined);
                    res.render("courses/details-course.hbs", {
                        isLoggedIn,
                        username: req.user ? req.user.username : null,
                        course,
                        isCreator: JSON.stringify(course.creator) === JSON.stringify(req.user._id),
                        enrolled,
                    });

                })
        },
        enrollForPlay(req, res) {
            const { courseId } = req.params;
            const userId = req.user._id;

            return Promise.all([                                                  // Update of related fields in 2 DB's
                Model.updateOne({ _id: courseId }, { $push: { enrolledUsers: userId } }),
                User.updateOne({ _id: userId }, { $push: { enrolledCourses: courseId } })
            ]).then(([updatedModel, updatedUser]) => {
                res.redirect(`/courses/details-course/${courseId}`)
            }).catch((err) => console.log(err.message));
        },
        deletePlay(req, res) {
            const { courseId } = req.params;
            const userId = req.user._id;

            return Promise.all([                                                  // Update of related fields in 2 DB's
                Model.updateOne({ _id: courseId }, { $pull: { "enrolledUsers": userId } }),
                Model.deleteOne({_id: courseId}),
                User.updateOne({ _id: userId }, { $pull: { "enrolledCourses": courseId } })
            ]).then(([updatedModel, deleteModel, updatedUser]) => {
                res.redirect(`/`)
            }).catch((err) => console.log(err.message, err));
        }



    },
    post: {
        createPlay(req, res) {
            const { title, description, imageUrl, isPublic: public } = req.body;        // isPublic: "on" || undefined
            isPublic = !!public;
            const createdAt = (new Date() + "").slice(0, 24);                           // Date & time only
            const creator = req.user._id;
            Model.create({ title, description, imageUrl, isPublic, createdAt, creator })  // enrolled will be created by default 
                .then((createdCourse) => {
                    // console.log(createdCourse);
                    res.status(201).redirect("/");
                }).catch(function (err) {
                    if (err.name === 'ValidationError') {
                        console.error('Error Validating!', err);
                        res.status(422).render("courses/create-course.hbs", {
                            message: err.errors.description || err.errors.imageUrl
                        });
                    } else if (err.name === 'MongoError') {
                        console.error(err);
                        res.status(422).render("courses/create-course.hbs", {
                            message: "Course name already exists!"
                        });
                    } else {
                        console.error(err);
                        res.status(500).json(err);
                    }
                })
        }
    }
}