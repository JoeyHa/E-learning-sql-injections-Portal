var connection = require('../DB/config');


exports.getTopScores = function(req, res) {
    var sql = 'SELECT users.firstName ,results.userID,MAX(results.finalScore) AS finalScore,timeLeft,users.level FROM results ' +
        'INNER JOIN users ON users.userID = results.userID ' +
        'GROUP BY results.userID ' +
        'ORDER BY finalScore DESC';
    connection.query(sql, function(err, results) {
        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
            console.log("getTopScores Sent failed" + err);
        } else {
            if (results.length > 0) {
                res.send({
                    "code": 200,
                    "topScore": results
                });
                console.log("getTopScores Sent sucessfull" + results);
            }
        }
    });
};