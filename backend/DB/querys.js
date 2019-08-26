var crypto = require('./authentication/crypto.js');
var common = require('./common/common.js');


var Request = require('tedious').Request;
var Connection = require('tedious').Connection;
var TYPES = require('tedious').TYPES;

var config = require('./config.js');



var connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.log(err)
    } else {
        // insertNewLoginToDB(login, lastName, firstName, pass, email)
        // selectAllUsers()
        var login = '14604af95d4a27f275d51b2aea6a972e'
        var lastName = 'Havia'
        var firstName = 'TEST'
        var pass = '123451231236'
        var email = 'd1@d1.com'
            //insertNewLoginToDB(login, lastName, firstName, pass, email);
        checkIfLoginExsits(login);
    }
});



function selectAllUsers() {
    // Read all rows from table
    var request = new Request("Select * from Users",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}



function insertNewLoginToDB(email, pass, firstName, lastName) {
    if (common.isNullOrEmpty(email) || common.isNullOrEmpty(pass)) {
        console.log('Login or Password cannot be Empty!');
        process.exit();
    }
    // if (isExists) {
    //     console.log('Login Name already Exists!');
    //     process.exit();
    // }
    pass = crypto.encrypt(pass);
    request = new Request("INSERT INTO Users VALUES (@lastName,@firstName,@pass,@email);",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        });
    request.addParameter('lastName', TYPES.NVarChar, lastName);
    request.addParameter('firstName', TYPES.NVarChar, firstName);
    request.addParameter('pass', TYPES.NVarChar, pass);
    request.addParameter('email', TYPES.NVarChar, email);

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {}
        });
    });
    connection.execSql(request);
}

function checkIfEmailExsits(email) {
    var isExists = false;
    request = new Request("SELECT TOP 1 1 FROM Users WHERE email = @email",
        function(err, rowCount, rows) {
            if (rowCount != 0 || rows.length() != 0) {
                return isExists = true;
            }
        });

    request.addParameter('email', TYPES.NVarChar, email);

    // request.on('row', function(columns) {
    //     columns.forEach(function(column) {
    //         if (column.value === null) {
    //             console.log('NULL');
    //         } else {

    //         }
    //     });
    // });
    connection.execSql(request);
    console.log(isExists + '2');
    return isExists;
}