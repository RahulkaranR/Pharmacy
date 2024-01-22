const User = require("../model/User");
const Medicine = require("../model/Medicine")
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateTokenandSet = require("../middleware/generateTokenandSet");


const login = asyncHandler( async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        return res.render("login", { error: "all Field are required"})
    }
    const user = await User.findOne({username}) 
    if(!user){
        return res.render("login", {error: "Username or password is Wrong1"})
    }
    const compare = await bcrypt.compare(password, user.password);

    // if(!compare){
    //     return res.render("login", {error: "Username or password is Wrong2"})
    // }
    const medicines = await Medicine.find()
    generateTokenandSet(user._id, res);
    res.status(200).render( "medicineList", {medicines, user, message : `${user.username} Login Successfully`})

})

const logout = asyncHandler(async (req, res) => {
    
    res.cookie("jwt", "", {maxAge: 1});

    res.status(200).render("index" , {})

})

const loginPage = asyncHandler(async (req, res) => {
    res.render("login", {})
})


module.exports = { login, logout, loginPage }

