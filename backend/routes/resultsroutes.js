var connection = require('../DB/config');


exports.SaveResultsToDB = function(req, res) {
    console.log("Start Function - SaveResultsToDB");
    var userResults = {
        "userID": req.body.userID,
        "finalScore": req.body.finalScore,
        "currectAnswers": req.body.currectAnswers,
        "timeLeft": req.body.timeLeft
    };
    if (userResults == null) {
        res.send({
            "code": 400,
            "failed": "error ocurred"
        });
    }
    connection.query('INSERT INTO results (userID,finalScore,currectAnswers,timeLeft) VALUES (?, ?, ?, ?)', [userResults.userID, userResults.finalScore, userResults.currectAnswers, userResults.timeLeft],
        function(error, results) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "error": error
                });
                console.log("END Function - SaveResultsToDB");
                connection.end();
            } else {
                console.log('The solution is: ', results);
                res.send({
                    "code": 200,
                    "success": "user's Results saved sucessfully",
                    "results": userResults
                });
                console.log("END Function - SaveResultsToDB");
            }
        });

};