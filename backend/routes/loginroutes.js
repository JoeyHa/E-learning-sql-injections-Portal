var crypto = require('../authentication/crypto.js');
var connection = require('../DB/config');

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

exports.register = function(req, res) {
    var users = {
        // "email": crypto.encrypt(req.body.email),
        // "password": crypto.encrypt(req.body.password),
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
            connection.query('INSERT INTO USERS VALUES (?, ?, ?, ?)', [crypto.encrypt(users.email), crypto.encrypt(users.password), users.firstName, users.lastName], function(error, results) {
                if (error) {
                    console.log("error ocurred", err);
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

};
exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

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
                        "code": 200,
                        "success": "login sucessfull"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            } else {
                res.send({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
    });
}