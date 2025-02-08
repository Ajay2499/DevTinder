const express = require("express");
const connectDB = require("./Config/Database");
const app = express();
const User = require("./models/User");
const {validateSignUpData} = require("./Utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middleware/auth");


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(express.json());
app.use(cookieParser( ));

app.post("/signUp" ,async (req,res) => {
    try{
        validateSignUpData(req.body);
        const {firstName, lastName , emailId , password} = req.body;
        const passwordHash = await bcrypt.hash(password , 10);
        console.log(passwordHash);

        const user = new User({
            firstName, lastName, emailId , password : passwordHash
        });
        console.log(user);
        await user.save();
        res.send("Data saved successfully");
    }catch(err){
        res.status(400).send("Error hello:" + err.message);
    }  
});

app.post("/login" ,async (req,res) => {
    try{
        const {emailId , password} = req.body;
        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("User is not present");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJWT();

            res.cookie("token" , token , {expires: new Date(Date.now() + 8*3600000),});
            res.send("Login successfully");
        }else{
            throw new Error("Invalid credential");
        }
    }catch(err){
        res.status(400).send("Error :" + err.message);
    }  
});

app.get("/profile" , userAuth , async (req,res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("Error :" + err.message);
    }  
});

app.post("/sendConnectionRequest", userAuth , (req,res) => {
    const user = req.user;

    res.send(user.firstName + " send the connection request");
});

connectDB().then(() => {
    console.log("Database connection established..");
    app.listen(3000 ,  ()=>{
        console.log("Listening on server 3000....");
    });
})
.catch((error)=>{
    console.log("Database connection cannot be established..");
})
