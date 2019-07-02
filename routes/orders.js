let express = require('express');
let router = express.Router();

let ApiUtils = require('../utils/ApiUtils');

let OrderModel = require('../models/Order');
let TokenValidator = require('../utils/TokenValidator');

router.get('/', TokenValidator, function (req, res, next) {
    OrderModel
        .find()
        .populate('userId')
        .populate({
            path: 'books.bookId',
            model: 'Book',
            populate: [{
                path: 'author',
                model: 'Author'
            },
            {
                path: 'bookType',
                model: 'BookType'
            },
            {
                path: 'publishingHouse',
                model: 'PublishingHouse'
            }]
        })
        .then(orders => {
            return res
                .status(200)
                .json(orders)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't download orders: " + reason.message)
        });
});

router.get('/user', TokenValidator, function (req, res) {
    OrderModel
        .find({
            userId: req.userId
        })
        .populate('userId')
        .populate({
            path: 'books.bookId',
            model: 'Book',
            populate: [{
                path: 'author',
                model: 'Author'
            },
                {
                    path: 'bookType',
                    model: 'BookType'
                },
                {
                    path: 'publishingHouse',
                    model: 'PublishingHouse'
                }]
        })
        .then(orders => {
            return res
                .status(200)
                .json(orders)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't download orders: " + reason.message)
        });
});



router.get('/:id', TokenValidator, function (req, res, next) {
    let orderId = req.params.id;

    OrderModel
        .findOne({"_id": orderId})
        .populate('userId')
        .populate({
            path: 'books.bookId',
            model: 'Book',
            populate: [{
                path: 'author',
                model: 'Author'
            },
                {
                    path: 'bookType',
                    model: 'BookType'
                },
                {
                    path: 'publishingHouse',
                    model: 'PublishingHouse'
                }]
        })
        .then(order => {
            return res
                .status(200)
                .json(order)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't download order: " + reason.message)
        });
});

router.post('/', TokenValidator, function (req, res, next) {
    let userId = req.userId;
    let books = req.body.books;

    if (!userId) {
        sendApiError(res, 406, "Field 'userId' couldn't be empty")
    }

    if (!books) {
        sendApiError(res, 406, "Field 'books' couldn't be empty")
    }

    new OrderModel({
        userId: userId,
        books: books
    })
        .save()
        .then(order => {
            return res
                .status(200)
                .json(order)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't add order: " + reason.message)
        })
});

router.delete('/', TokenValidator, function (req, res, next) {
    let orderId = req.body.id;

    if (!orderId) {
        sendApiError(res, 406, "Field 'id' couldn't be empty")
    }

    OrderModel
        .deleteOne({"_id": orderId})
        .then(result => {
            return res
                .status(200)
                .json(result)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't delete order: " + reason.message)
        })
});

function sendApiError(res, code, message) {
    return res
        .status(code)
        .send(JSON.stringify(ApiUtils.getApiError(message)))
        .end();
}

module.exports = router;
