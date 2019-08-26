const express = require('express')
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const app = express()
const port = 3000

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.route('/register').post((req, res) => {
    res.send(201, req.body)
})


app.post('/submit', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))