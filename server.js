const express = require('express')
const app = express()
const port = 3000
var crypto = require('./authentications/crypto.js');
var common = require('./common/common.js');


var Request = require('tedious').Request;
var Connection = require('tedious').Connection;
var TYPES = require('tedious').TYPES;


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var config = {
    authentication: {
        options: {
            userName: 'sa',
            password: 'AdminAdmin!'
        },
        type: 'default'
    },
    server: 'localhost',
    options: {
        database: 'Elearning_SQL',
        encrypt: true
    }
};

var connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.log(err)
    } else {
        // insertNewLoginToDB(login, lastName, firstName, pass, email)
        // selectAllUsers()
        var login = 'JOEYTEST'
        var lastName = 'Havia'
        var firstName = 'TEST'
        var pass = '123451231236'
        var email = 'd1@d1.com'
        insertNewLoginToDB(login, lastName, firstName, pass, email);
    }
});



function selectAllUsers() {
    console.log('Reading rows from the Table...');

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



function insertNewLoginToDB(login, lastName, firstName, pass, email) {

    if (common.isNullOrEmpty(login) || common.isNullOrEmpty(pass)) {
        console.log('Login or Password cannot be Empty!');
        process.exit();
    }
    login = crypto.encrypt(login);
    pass = crypto.encrypt(pass);
    request = new Request("INSERT INTO Users VALUES (@login,@lastName,@firstName,@pass,@email);",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        });
    request.addParameter('login', TYPES.NVarChar, login);
    request.addParameter('lastName', TYPES.NVarChar, lastName);
    request.addParameter('firstName', TYPES.NVarChar, firstName);
    request.addParameter('pass', TYPES.NVarChar, pass);
    request.addParameter('email', TYPES.NVarChar, email);

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log("Product id of inserted item is " + column.value);
            }
        });
    });
    connection.execSql(request);
}