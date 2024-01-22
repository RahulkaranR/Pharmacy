const express = require("express");
const userController = require("../controllers/userControllers");
const protectRoute = require("../middleware/protectRoute");
const router = express.Router();


router.get("/createPage", userController.createUserPage);
router.get("/profilePage", protectRoute,  userController.userProfilePage);
router.get("/updatePage", protectRoute, userController.updateUserPage);

router.get("/usersList", userController.userList);
router.post("/", userController.createUser);
router.post("/:id",protectRoute,  userController.updateUser);
router.get("/:id", protectRoute, userController.deleteUser);






module.exports = router



