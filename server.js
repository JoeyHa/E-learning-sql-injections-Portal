var express = require("express");
var login = require('./backend/routes/loginroutes');
var questions = require('./backend/routes/questionroutes');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

var router = express.Router();


//route to handle user registration
router.post('/register', login.register);
router.post('/login', login.login);


router.post('/question', questions.getQuestion);

app.use('/api', router);



app.listen(3000);