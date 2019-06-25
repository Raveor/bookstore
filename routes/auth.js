let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let passport = require('passport');
let router = express.Router();

let config = require('../config');
let UserModel = require('../models/User');
let ApiUtils = require('../utils/ApiUtils');

router.post('/register', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if (!email) {
        sendApiError(res, 500, "Email is required"); //TODO change HTTP code
        return;
    }

    if (!password) {
        sendApiError(res, 500, "Password is required"); //TODO change HTTP code
        return;
    }

    let hash = bcrypt.hashSync(password, 10);

    UserModel
        .create({
            email: email,
            password: password
            // password: hash
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

    let token = jwt.sign({id: userId}, config.jwtSecret, {expiresIn: config.jwtTime});

    sendApiToken(res, token)
});

router.get('/login/error', function (req, res) {
    res.send("login error")
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