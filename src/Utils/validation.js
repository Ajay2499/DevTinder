const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName , lastName , emailId , password} = req;

    if(!firstName || !lastName){
        throw new Error ("First name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("email is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
};

module.exports = {
    validateSignUpData,
};