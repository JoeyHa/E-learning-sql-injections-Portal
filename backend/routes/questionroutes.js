var connection = require('../DB/config');


exports.getQuestion = function(req, res) {
    var questionID = req.body.qid;

    console.log(questionID);
    connection.query('SELECT * FROM questions WHERE questionID = ?', questionID, function(err, results) {
        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
            connection.end();
        } else {
            if (results.length > 0) {
                res.send({
                    "questionID": results[0].questionID,
                    "questionName": results[0].questionName,
                    "option1": results[0].option1,
                    "option2": results[0].options2,
                    "option3": results[0].options3,
                    "option4": results[0].options4,
                    "code": 200,
                    "status": "Question Sent sucessfull"
                });
                console.log("Question Sent sucessfull");
            }
        }
    });

};