    var mysql = require('mysql');

    var config = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "AdminAdmin!",
        database: "elearning_sql"
    });
    module.exports = config;