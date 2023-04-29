const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();

// app.use(morgan('combined'));

const bodyParser = require('body-parser');
const session = require('express-session');

const setupPassport = require('./passport/passport');
const router = require('./routes/routes')(express);

////////////////////////////////////////////////
// MIDDLEWARE
app.use(express.static('public')); // for static files
app.engine('handlebars', engine({ defaultLayout: 'main' })); //{ defaultLayout: 'main', partialsDir: './views/partials' }
app.set('view engine', 'handlebars'); // set engine

app.use(
  session({
    secret: 'superDifficultAndSecret',
    // secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false | true }));

setupPassport(app);

////////////////////////////////////////////////
// ROUTE
app.use('/', router);

// Server
app.listen(8080, function () {
  console.log(`Application is listening to port 8080`);
});
