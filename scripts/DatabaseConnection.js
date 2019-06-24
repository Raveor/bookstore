const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://dbuser:UQ97bJo3PN6FGtKY@bookstore-vksrb.azure.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true}
).catch(reason => {
    console.log("MongoDB error: " + reason.message)
});
