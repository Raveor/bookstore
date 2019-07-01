let express = require('express');
let router = express.Router();

let ApiUtils = require('../utils/ApiUtils');

let BookTypeModel = require('../models/BookType');
let AdminTokenValidator = require('../utils/AdminTokenValidator');

router.get('/', function (req, res, next) {
    BookTypeModel
        .find()
        .then(bookTypes => {
            return res
                .status(200)
                .json(bookTypes)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't download book types: " + reason.message)
        });
});

router.get('/:id', function (req, res, next) {
    let bookTypeId = req.params.id;

    BookTypeModel
        .findOne({"_id": bookTypeId})
        .then(bookType => {
            return res
                .status(200)
                .json(bookType)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't download book type: " + reason.message)
        });
});

router.post('/', AdminTokenValidator, function (req, res, next) {
    let bookTypeName = req.body.name;

    if (!bookTypeName) {
        sendApiError(res, 406, "Field 'name' couldn't be empty")
    }

    new BookTypeModel({
        name: bookTypeName
    })
        .save()
        .then(bookType => {
            return res
                .status(200)
                .json(bookType)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't add book type: " + reason.message)
        })
});

router.delete('/', AdminTokenValidator, function (req, res, next) {
    let bookTypeId = req.body.id;

    if (!bookTypeId) {
        sendApiError(res, 406, "Field 'id' couldn't be empty")
    }

    BookTypeModel
        .deleteOne({"_id": bookTypeId})
        .then(result => {
            return res
                .status(200)
                .json(result)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't delete book type: " + reason.message)
        })
});

router.patch('/', AdminTokenValidator, function (req, res, next) {
    let bookTypeId = req.body.id;

    if (!bookTypeId) {
        sendApiError(res, 406, "Field 'id' couldn't be empty")
    }

    BookTypeModel
        .findOneAndUpdate(
            {"_id": bookTypeId},
            {$set: req.body},
            {new: true}
        )
        .then(modifiedBookType => {
            return res
                .status(200)
                .json(modifiedBookType);
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't edit book type: " + reason.message)
        });
});

function sendApiError(res, code, message) {
    return res
        .status(code)
        .send(JSON.stringify(ApiUtils.getApiError(message)))
        .end();
}

module.exports = router;
