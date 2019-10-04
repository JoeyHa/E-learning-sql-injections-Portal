const crypto = require('../authentication/crypto.js');
const connection = require('../DB/config');

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

exports.register = function(req, res) {
    console.log("Start function - Register");
    var users = {
        "email": req.body.email,
        "password": req.body.password,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
    };
    console.log(users);
    connection.query('SELECT * FROM USERS WHERE email = ? ', crypto.encrypt(users.email), function(err, rows) {
        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
            connection.end();
        }
        if (!rows.length) {
            connection.query('INSERT INTO USERS (email,password,firstName,LastName) VALUES (?, ?, ?, ?)', [crypto.encrypt(users.email), crypto.encrypt(users.password), users.firstName, users.lastName], function(error, results) {
                if (error) {
                    console.log("error ocurred", error);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    });
                    connection.end();
                } else {
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "user registered sucessfully"

                    });
                    console.log("END function - Register");
                }
            });
        } else {
            res.send({
                "code": 400,
                "failed": "error ocurred - email already Exsits"
            });
            connection.end();
        }
    });
    console.log("END function - Register");

};
exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log("login function start for user: " + email + " " + password);
    connection.query('SELECT * FROM USERS WHERE email = ?', [crypto.encrypt(email)], function(error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            if (results.length > 0) {
                if (results[0].password == crypto.encrypt(password)) {
                    res.send({
                        "userID": results[0].userID,
                        "password": results[0].password,
                        "firstName": results[0].firstName,
                        "lastName": results[0].lastName,
                        "level": results[0].level,
                        "code": 200,
                        "status": "login sucessfull"
                    });
                    console.log("login function sucessfull");
                } else {
                    res.send({
                        "code": 204,
                        "status": "Email and password does not match"
                    });
                }
            } else {
                res.send({
                    "code": 204,
                    "status": "Email does not exits"
                });
            }
        }
    });
};

exports.updateUserLevel = function(req, res) {
    var newLevel = req.body.level;
    var userID = req.body.userID;
    console.log(userID);
    console.log(newLevel);

    if (newLevel == null && userID == null) {
        res.send({
            "code": 400,
            "failed": "error ocurred"
        });
    } else {
        console.log("updateUserLevel function start for userID: " + userID);
        connection.query('UPDATE USERS SET level = ? WHERE userID = ?', [newLevel, userID], function(error, results) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                });
                connection.end();
            } else {
                console.log('The solution is: ', results);
                res.send({
                    "code": 200,
                    "success": "updated User Level sucessfully"
                });
            }
        });
    };
};