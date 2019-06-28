let express = require('express');
let router = express.Router();

let ApiUtils = require('../utils/ApiUtils');

let PublishingHouseModel = require('../models/PublishingHouse');

//TODO add TokenValidators

router.get('/', function (req, res, next) {
    let publishingHouseId = req.body.id;

    if (publishingHouseId) {
        PublishingHouseModel
            .findOne({"_id": publishingHouseId})
            .then(publishingHouse => {
                return res
                    .status(200)
                    .json(publishingHouse)
            })
            .catch(reason => {
                sendApiError(res, 500, "Couldn't download publishing houses: " + reason.message)
            });
    } else {
        PublishingHouseModel
            .find()
            .then(publishingHouses => {
                return res
                    .status(200)
                    .json(publishingHouses)
            })
            .catch(reason => {
                sendApiError(res, 500, "Couldn't download publishing houses: " + reason.message)
            });
    }
});

router.post('/add', function (req, res, next) {
    let publishingHouseName = req.body.name;

    if (!publishingHouseName) {
        sendApiError(res, 406, "Field 'name' couldn't be empty")
    }

    new PublishingHouseModel({
        name: publishingHouseName
    })
        .save()
        .then(publishingHouse => {
            return res
                .status(200)
                .json(publishingHouse)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't add publishing house: " + reason.message)
        })
});

router.delete('/delete', function (req, res, next) {
    let publishingHouseId = req.body.id;

    if (!publishingHouseId) {
        sendApiError(res, 406, "Field 'id' couldn't be empty")
    }

    PublishingHouseModel
        .deleteOne({"_id": publishingHouseId})
        .then(result => {
            return res
                .status(200)
                .json(result)
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't delete publishing house: " + reason.message)
        })
});

router.patch('/edit', function (req, res, next) {
    let publishingHouseId = req.body.id;

    if (!publishingHouseId) {
        sendApiError(res, 406, "Field 'id' couldn't be empty")
    }

    PublishingHouseModel
        .findOneAndUpdate(
            {"_id": publishingHouseId},
            {$set: req.body},
            {new: true}
        )
        .then(modifiedPublishingHouse => {
            return res
                .status(200)
                .json(modifiedPublishingHouse);
        })
        .catch(reason => {
            sendApiError(res, 500, "Couldn't edit publishing house: " + reason.message)
        });
});

function sendApiError(res, code, message) {
    return res
        .status(code)
        .send(JSON.stringify(ApiUtils.getApiError(message)))
        .end();
}

module.exports = router;