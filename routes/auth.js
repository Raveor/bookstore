let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let passport = require('passport');
let router = express.Router();

let config = require('../config');
let UserModel = require('../models/User');
let ApiUtils = require('../utils/ApiUtils');

router.post('/register', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if (!email) {
        sendApiError(res, 406, "Email is required");
        return;
    }

    if (!password) {
        sendApiError(res, 406, "Password is required");
        return;
    }

    let hash = bcrypt.hashSync(password, 8);

    UserModel
        .create({
            email: email,
            password: hash
        })
        .then(user => {
            sendApiOk(res, "Your account has been created. Now you can log in.");
        })
        .catch(reason => {
            sendApiError(res, 500, reason.message);
        })
});

router.post('/login', passport.authenticate('localClient', {failureRedirect: '/auth/login/error'}), function (req, res) {
    let userId = req.user._id;

    let token = jwt.sign({id: userId, role: "client"}, config.jwtSecret, {expiresIn: config.jwtTime});

    sendApiToken(res, token)
});

router.post('/administrator/login', passport.authenticate('localAdministrator', {failureRedirect: '/auth/login/error'}), function (req, res) {
    let userId = req.user._id;

    let token = jwt.sign({id: userId, role: "administrator"}, config.jwtSecret, {expiresIn: config.jwtTime});

    sendApiToken(res, token)
});

router.get('/login/error', function (req, res) {
    sendApiError(res, 418, "Couldn't log in. Check your login and password.")
});

function sendApiError(res, code, message) {
    return res
        .status(code)
        .send(JSON.stringify(ApiUtils.getApiError(message)))
        .end();
}


function sendApiOk(res, message) {
    return res
        .status(200)
        .send(JSON.stringify(ApiUtils.getApiOkResult(message)))
        .end();
}

function sendApiToken(res, token) {
    res
        .status(200)
        .send(JSON.stringify(ApiUtils.getApiToken(token)))
        .end();
}

module.exports = router;