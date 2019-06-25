var express = require('express');
var router = express.Router();

let TokenValidator = require('../utils/TokenValidator');

/* GET users listing. */
router.get('/', TokenValidator, function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;