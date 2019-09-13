// var crypto = require('../authentication/crypto.js');
// var connection = require('./config');

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });



// function RegisterUser(email, password, firstName, lastName) {
//     connection.query('Select * FROM USERS WHERE email = ? ', email, function(err, rows) {
//         if (err) {
//             connection.end();
//             return console.log(err);
//         }
//         if (!rows.length) {
//             connection.query('INSERT INTO users VALUES (?, ?, ?, ?)', [email, password, firstName, lastName], function(err, results) {
//                 connection.end();
//                 console.log("Register Compeleted !");

//             });
//         } else {
//             connection.end();
//             console.log("Email Already Exists!");
//         }
//     });

// };