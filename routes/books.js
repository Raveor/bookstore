let express = require('express');
let router = express.Router();

let ApiUtils = require('../utils/ApiUtils');

let BookModel = require('../models/Book');
let AdminTokenValidator = require('../utils/AdminTokenValidator');

router.get('/', function (req, res, next) {
    BookModel
        .find()
        .populate('author')
        .populate('bookType')
        .populate('publishingHouse')
        .then(books => {
            return res
                .status(200)
                .json(books)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't download books: " + reason.message)
        })

});

router.get('/:id', function (req, res, next) {
    let bookId = req.params.id;

    BookModel
        .findOne({"_id": bookId})
        .populate('author')
        .populate('bookType')
        .populate('publishingHouse')
        .then(book => {
            return res
                .status(200)
                .json(book)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't download book: " + reason.message)
        });
});

router.put('/', AdminTokenValidator, function (req, res, next) {
    let bookTitle = req.body.title;
    let bookPrice = req.body.price;
    let bookPublishYear = req.body.publishYear;
    let bookDescription = req.body.description;
    let bookAuthor = req.body.author;
    let bookType = req.body.bookType;
    let bookPublishingHouse = req.body.publishingHouse;

    if (!bookTitle) {
        sendApiError(res, 406, "Field 'title' couldn't be empty")
    }

    if (!bookPrice) {
        sendApiError(res, 406, "Field 'price' couldn't be empty")
    }

    if (!bookPublishYear) {
        sendApiError(res, 406, "Field 'publishYear' couldn't be empty")
    }

    if (!bookDescription) {
        sendApiError(res, 406, "Field 'description' couldn't be empty")
    }

    if (!bookAuthor) {
        sendApiError(res, 406, "Field 'author' couldn't be empty")
    }

    if (!bookType) {
        sendApiError(res, 406, "Field 'bookType' couldn't be empty")
    }

    if (!bookPublishingHouse) {
        sendApiError(res, 406, "Field 'publishingHouse' couldn't be empty")
    }

    new BookModel({
        title: bookTitle,
        price: bookPrice,
        publishYear: bookPublishYear,
        description: bookDescription,
        author: bookAuthor,
        bookType: bookType,
        publishingHouse: bookPublishingHouse
    })
        .save()
        .then(book => {
            return res
                .status(200)
                .json(book)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't add book: " + reason.message)
        })
});

router.delete('/', AdminTokenValidator, function (req, res, next) {
    let bookId = req.body.id;

    if (!bookId) {
        sendApiError(res, 406, "Field 'id' couldn't be empty")
    }

    BookModel
        .deleteOne({"_id": bookId})
        .then(result => {
            return res
                .status(200)
                .json(result)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't delete book: " + reason.message)
        })
});

router.patch('/', AdminTokenValidator, function (req, res, next) {
    let bookId = req.body.id;

    if (!bookId) {
        sendApiError(res, 406, "Field 'id' couldn't be empty")
    }

    BookModel
        .findOneAndUpdate(
            {"_id": bookId},
            {$set: req.body},
            {new: true}
        )
        .then(modifiedBook => {
            return res
                .status(200)
                .json(modifiedBook);
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't edit book: " + reason.message)
        });
});

function sendApiError(res, code, message) {
    return res
        .status(code)
        .send(JSON.stringify(ApiUtils.getApiError(message)))
        .end();
}

module.exports = router;