const express = require("express");
const connectDB = require("./Config/Database");
const app = express();
const User = require("./models/User");

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(express.json());

app.post("/signUp" ,async (req,res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.send("Data saved successfully");
    }catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
    
});

app.get("/user" , async (req,res) => {
    const email = req.body.emailId;
    console.log(email);
    try{
        const data = await User.find({emailId : email});
        res.send(data);
    }catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }

});
app.get("/feed" , async (req,res) => {
    try{
        const data = await User.find({});
        res.send(data);
    }catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }

});

app.delete("/user" , async (req,res) => {
    const userId = req.body.userId;
    try{
        const data = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }

});

app.patch("/user" , async (req,res) => {
    const { emailId, ...updatedData } = req.body;
    try{
        const data = await User.findOneAndUpdate({emailId}, updatedData);
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }

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
