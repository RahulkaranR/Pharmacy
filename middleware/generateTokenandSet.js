const jwt = require("jsonwebtoken");


const generateTokenandSet = (UserId, res) => {
    const token = jwt.sign({UserId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
    })
    return token;

}

module.exports = generateTokenandSet;

