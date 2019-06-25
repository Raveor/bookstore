const jwt = require('jsonwebtoken');
const ApiUtils = require('./ApiUtils');
const config = require('../config');

function verifyAdminToken(req, res, next) {
    let token = req.headers[config.jwtHeader];

    if (!token) {
        res
            .status(403)
            .send(ApiUtils.getApiError("There is no token in headers"));
        return;
    }

    jwt.verify(token, config.jwtSecret, function (err, decoded) {
        if (err) {
            res
                .status(500)
                .send(ApiUtils.getApiError("Token is incorrect. Reason: " + err.message));
            return;
        }

        if (decoded.isAdmin === false) {
            res
                .status(401)
                .send(ApiUtils.getApiError("Token doesn't belong to administrator"));
            return;
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyAdminToken;