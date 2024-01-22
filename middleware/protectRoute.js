const jwt = require("jsonwebtoken");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");

const protectRoute = asyncHandler( async (req, res, next) => {
    const token = req.cookies.jwt;
    
    if(!token) return res.render("index")

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.UserId).select("-password");
    req.user = user;
    next();

})

module.exports = protectRoute

