var connection = require('../DB/config');


// exports.getQuestions = function(req, res) {
//     var Qlevel = req.body.qlevel;
//     connection.query('SELECT * FROM questions WHERE Qlevel = ?', [Qlevel], function(err, results) {
//         if (err) {
//             console.log("error ocurred", err);
//             res.send({
//                 "code": 400,
//                 "failed": "error ocurred"
//             });
//             connection.end();
//         } else {
//             if (results.length > 0) {
//                 res.send({
//                     "questions": results,
//                     "code": 200,
//                     "status": "Questions Sent sucessfull"
//                 });
//                 console.log("Question Sent sucessfull");
//             }
//         }
//     });
// };

exports.getQuestions = function(req, res) {
    var qlevel = req.body.qlevel;
    connection.query('SELECT * FROM questions WHERE Qlevel = ?', [qlevel], function(err, results) {
        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
            console.log("Question Sent failed");
        } else {
            if (results.length > 0) {
                res.send({
                    "code": 200,
                    "questions": results
                });
                console.log("Question Sent sucessfull");
            }
        }
    });
};