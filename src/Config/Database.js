const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://nodejs:spBwyrbEAAdwZBxB@nodejs.6zibd.mongodb.net/devTinder"
    );
};

module.exports = connectDB;
