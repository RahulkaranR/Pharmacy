const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const userList = asyncHandler(async (req, res) => {
    const users = await User.find();
    if(users.length == 0){
        res.status(400).json({ message : "NO User is created" })
    }
    res.status(200).json({users});
})

const createUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    console.log("req.body", req.body);
    if(!username || !password){
        return res.render( "register" , { error : "All fields are require" });
    }
    const regex = new RegExp("^([a-zA-Z0-9]+){8,}$")
    console.log(regex);
    const valid = regex.test(password);
    console.log(valid);
    if(!valid){
        return res.render( "register" , { error : "Password contain atleast One alphabet and one number and no Special characters and atleast 8 Characters" });
    }

    

    const duplicate = await User.findOne({ username })

    if(duplicate){
        return res.render( "register" , { error : "Username already taken" });
    }
    const hashedpwd = await bcrypt.hash(password, 10);
    const newUser = {username, "password": hashedpwd}
    const user = await User.create(newUser)
    console.log(user);
    res.render("login", {})
})

const updateUser = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    console.log(req.user);
    if(req.user._id.toString() !== id.toString()){
        return res.status(400).json({ message : "Unauthorize to access Other user Data"});
    }
    let usertu = await User.findByIdAndUpdate(id).exec();

    if(password){
        const hashedpwd = await bcrypt.hash(password, 10);
        usertu.password = hashedpwd
    }
    usertu.username = username || usertu.username

    const user = await usertu.save()

    res.status(200).render("Profile", {user, message: "User Updated Successfully"})

})


const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(req.user._id.toString() !== id.toString()){
        return res.status(400).json({ message : "Unauthorize to access Other user Data"});
    }
    const userdelet = await User.findById(id);
    if(!userdelet){
        return res.status(400).json({message: "User not Exist"})
    }


    await User.findByIdAndDelete(id)
    res.cookie("jwt", "", { maxAge: 1 });
    res.render("index", {message: "User Deleted Successfully"});
})


const createUserPage = asyncHandler(async (req, res) => {
    res.render("register", {})
})

const userProfilePage = asyncHandler(async (req, res) => {
    const user = req.user
    res.render("Profile", {user});
})

const updateUserPage = asyncHandler(async (req, res) => {
    const user = req.user
    res.render("updateUser", {user});
})



module.exports = { userList, updateUserPage, userProfilePage, createUser, updateUser, deleteUser, createUserPage };

