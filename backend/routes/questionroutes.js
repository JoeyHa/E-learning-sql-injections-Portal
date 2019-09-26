var connection = require('../DB/config');

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

exports.getQuestion = function(req, res) {
    var question = {
        "questionID": req.body.questionID,
        "questionName": req.body.questionName,
        "option1": req.body.option1,
        "option2": req.body.option2,
        "option3": req.body.option3,
        "option4": req.body.option4,
    };
    connection.query('SELECT * FROM questions WHERE questionID = ? ', question.questionID, function(err, rows) {
        if (err) {
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
                "success": "getQuestion - sucessfull"
            });
            connection.end();
        }
    });

};