let express = require('express');
let router = express.Router();

let ApiUtils = require('../utils/ApiUtils');

let AuthorModel = require('../models/Author');
let AdminTokenValidator = require('../utils/AdminTokenValidator');

router.get('/', function (req, res, next) {
    AuthorModel
        .find()
        .then(authors => {
            return res
                .status(200)
                .json(authors)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't download authors: " + reason.message)
        });
});

router.get('/:id', function (req, res, next) {
    let authorId = req.params.id;

    AuthorModel
        .findOne({"_id": authorId})
        .then(author => {
            return res
                .status(200)
                .json(author)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't download author: " + reason.message)
        });
});

router.post('/', AdminTokenValidator, function (req, res, next) {
    let authorName = req.body.name;
    let authorSurname = req.body.surname;

    if (!authorName) {
        sendApiError(res, 406, "Field 'name' couldn't be empty")
    }

    if (!authorSurname) {
        sendApiError(res, 406, "Field 'surname' couldn't be empty")
    }

    new AuthorModel({
        name: authorName,
        surname: authorSurname
    })
        .save()
        .then(author => {
            return res
                .status(200)
                .json(author)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't add author: " + reason.message)
        })
});

router.delete('/', AdminTokenValidator, function (req, res, next) {
    let authorId = req.body.id;

    if (!authorId) {
        sendApiError(res, 406, "Field 'id' couldn't be empty")
    }

    AuthorModel
        .deleteOne({"_id": authorId})
        .then(result => {
            return res
                .status(200)
                .json(result)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't delete author: " + reason.message)
        })
});

router.patch('/', AdminTokenValidator, function (req, res, next) {
    let authorId = req.body.id;

    if (!authorId) {
        sendApiError(res, 406, "Field 'id' couldn't be empty")
    }

    AuthorModel
        .findOneAndUpdate(
            {"_id": authorId},
            {$set: req.body},
            {new: true}
        )
        .then(modifiedAuthor => {
            return res
                .status(200)
                .json(modifiedAuthor);
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't edit author: " + reason.message)
        });
});

function sendApiError(res, code, message) {
    return res
        .status(code)
        .send(JSON.stringify(ApiUtils.getApiError(message)))
        .end();
}

module.exports = router;
