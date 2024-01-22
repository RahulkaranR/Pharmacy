const express = require("express");
const authController = require("../controllers/authControllers")

const routes = express.Router();

routes.post("/login", authController.login);
routes.get("/logout", authController.logout);
routes.get("/login", authController.loginPage);




module.exports = routes;


