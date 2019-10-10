var express = require("express");
var login = require('./backend/routes/loginroutes');
var questions = require('./backend/routes/questionroutes');
var results = require('./backend/routes/resultsroutes');
var topScore = require('./backend/routes/topScoresroute');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(cors());
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
router.post('/updateLevel', login.updateUserLevel);

router.post('/questions', questions.getQuestions);
router.post('/results', results.SaveResultsToDB);
router.get('/topScore', topScore.getTopScores);

app.use('/api', router);



app.listen(3000);