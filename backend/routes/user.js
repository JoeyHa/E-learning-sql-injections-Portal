const express = require("express");
const router = express.Router();

const User = require("../models/user");
const quarys = require("..//DB/querys");



router.post("/register", (req, res, next) => {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.firstName = req.body.firstName;
    user.lastName = req.bod.lastName;

    if ((user.email).length() != 0 && (user.password).length() != 0) {
        quarys.insertNewLoginToDB(user.email, user.password, user.firstName, user.lastName).then((result) => {
            res.status(201).json({
                message: 'User Created',
                result: result
            });
        }).catch((err) => {
            res.status(500).json({
                error: err
            });
        });
    };

});


module.exports = router;