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
app.use('/users', usersRouter);
app.use('/auth', authRouter);

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

passport.serializeUser(function (user, cb) {
    let userId = user._id;

    cb(null, userId);
});

passport.deserializeUser(function (userData, cb) {
    let UserModel = require('./models/User');

    let id = userData;

    UserModel
        .findOne({_id: id})
        .then(user => {
            cb(null, users);
        })
        .catch(reason => {
            return cb(reason);
        })
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
