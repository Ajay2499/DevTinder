const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
    },
    password: {
        type: String,
    },
    } ,   
    {
        timestamps: true,
    });

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id : user._id} , "DevAjay@123", {expiresIn: "1d"});

    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser , passwordHash);
    return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;