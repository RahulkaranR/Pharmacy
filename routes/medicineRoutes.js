const express = require("express");
const medicineControllers = require("../controllers/medicineControllers");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();



router.get("/medicineList",protectRoute, medicineControllers.medicineListPage);
router.post("/createMedicine", protectRoute, medicineControllers.createMedicine);
router.post("/updateM/:Mid", protectRoute, medicineControllers.updateMedicine);
router.get("/deleteM/:Mid", protectRoute, medicineControllers.deleteMedicine);
router.get("/createMedicinePage", protectRoute, medicineControllers.createMedicinePage);
router.get("/updateMedicinePage/:Mid", protectRoute, medicineControllers.updateMedicinePage);


router.post("/medicineSearch",protectRoute, medicineControllers.medicineSearch)



module.exports = router



