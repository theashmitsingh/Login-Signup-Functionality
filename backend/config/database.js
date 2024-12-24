const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect (process.env.MONGODB_URL)
    .then (() => {
        console.log("MongoDB is connected successfully!");
    })
    .catch (() => {
        console.log("Error connecting to MongoDB: ", err);
    });
}
