var connection = require('../DB/config');

exports.getQuestions = function(req, res) {
    var qlevel = req.body.qlevel;
    connection.query('SELECT * FROM questions WHERE Qlevel = ?', [qlevel], function(err, results) {
        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
            console.log("Question Sent failed" + err);
        } else {
            if (results.length > 0) {
                res.send({
                    "code": 200,
                    "questions": results
                });
                console.log("Question Sent sucessfull" + results);
            }
        }
    });
};