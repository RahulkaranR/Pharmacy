
const Express = require("express");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const connectDb = require("./config/dbConn");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const asyncHandler = require("express-async-handler");
const { logEvents, logger } = require("./middleware/logger");
const jwt = require("jsonwebtoken");
const User = require("./model/User");

const PORT = process.env.PORT || 3000

const app = Express();

app.locals.moment = require('moment');
connectDb();
app.use(logger);
app.use(Express.json())
app.use(cookieParser())
app.use(Express.urlencoded({ extended: true}))


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(Express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', Express.static(__dirname + '/node_modules/bootstrap/dist'));  

app.get("/", asyncHandler( async (req, res) => {
    const token = req.cookies.jwt;
    let user;
    if(token){
        console.log("some thing wrong");
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        user = await User.findById(decode.UserId).select("-password");
        console.log("this is good" + user);
    }

    res.render("index", {user, title: "User Login"});
}))

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/medicine", require("./routes/medicineRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.all("*", (req, res) => {
    res.status(404)
    if(req.accepts("html")){
        console.log("hear is the html");
        res.sendFile(path.join(__dirname, "views", "404.html"))
    }else if(req.accepts("json")){
        console.log("hear is the json");
        res.json({ message: "404 not found"})
    }else {
        console.log("hear is the normel");
        res.type("txt").send("404 not found")
    }
})

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Mongo DB database Connected");
    app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`))
})

mongoose.connection.on("error", err => {
    console.log(err);
    logEvents(`${err.on}:${err.code}\t${err.hostname}`, "mongoErrLog.log")
})


