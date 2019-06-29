var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

require('./scripts/DatabaseConnection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var authorsRouter = require('./routes/authors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/authors', authorsRouter);

passport.use('localClient', new LocalStrategy(
    {usernameField: "email", passwordField: "password"},
    function (username, password, cb) {
        let UserModel = require('./models/User');

        UserModel
            .findOne({email: username})
            .then(user => {
                if (!user) {
                    return cb(null, false);
                }

                let isPasswordValid = bcrypt.compareSync(password, user.password);

                if (!isPasswordValid) {
                    return cb(null, false);
                }

                return cb(null, user);
            })
            .catch(reason => {
                return cb(reason);
            })
    }));

passport.use('localAdministrator', new LocalStrategy(
    {usernameField: "login", passwordField: "password"},
    function (username, password, cb) {
        let AdministratorModel = require('./models/Administrator');

        AdministratorModel
            .findOne({login: username})
            .then(user => {
                if (!user) {
                    return cb(null, false);
                }

                let isPasswordValid = bcrypt.compareSync(password, user.password);

                if (!isPasswordValid) {
                    return cb(null, false);
                }

                return cb(null, user);
            })
            .catch(reason => {
                return cb(reason);
            })
    }));

passport.serializeUser(function (user, cb) {
    let userId = user._id;
    let isAdmin = user.login !== undefined;

    cb(null, [userId, isAdmin]);
});

passport.deserializeUser(function (userData, cb) {
    let userId = userData[0];
    let isAdmin = userData[1];

    if (isAdmin) {
        let AdministratorModel = require('./models/User');

        AdministratorModel
            .findOne({_id: userId})
            .then(user => {
                cb(null, user);
            })
            .catch(reason => {
                return cb(reason);
            })
    } else {
        let UserModel = require('./models/User');

        UserModel
            .findOne({_id: userId})
            .then(user => {
                cb(null, user);
            })
            .catch(reason => {
                return cb(reason);
            })
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
