let express = require('express');
let router = express.Router();

let ApiUtils = require('../utils/ApiUtils');

let AuthorModel = require('../models/Author');

//TODO add TokenValidators

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

router.post('/add', function (req, res, next) {
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

router.delete('/delete', function (req, res, next) {
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

router.put('/edit', function (req, res, next) {
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