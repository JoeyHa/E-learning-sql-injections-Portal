var connection = require('../DB/config');


exports.getTopScores = function(req, res) {
    var sql = 'select users.firstName ,results.userID,finalScore,timeLeft,users.level from results ' +
        'inner join users on users.userID = results.userID ' +
        'group by results.userID ' +
        'order by results.finalScore desc';
    connection.query(sql, function(err, results) {
        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
            console.log("getTopScores Sent failed");
        } else {
            if (results.length > 0) {
                res.send({
                    "code": 200,
                    "topScore": results
                });
                console.log("getTopScores Sent sucessfull");
            }
        }
    });
};