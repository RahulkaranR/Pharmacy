const Medicine = require("../model/Medicine");
const asyncHandler = require("express-async-handler");

const medicineListPage = asyncHandler( async (req, res) => {
    const medicines = await Medicine.find()
    const user = req.user;
    res.render("medicineList", {user, medicines})
})


const createMedicine = asyncHandler( async(req, res) => {
    const createdBy = req.user._id;
    const { name, price } = req.body;
    if(!name || !price){
        return res.render("newMedicine", { error: "All field are Require"});
    }

    const newMedicin = { createdBy, name, price};

    await Medicine.create(newMedicin);
    const medicines = await Medicine.find();
    console.log(medicines.length);
    const user = req.user
    res.render("medicineList", {user, medicines, message: "New Medicine Creates Successfully"})


})

const updateMedicine = asyncHandler( async(req, res) => {
    const { Mid } = req.params;
    const { name, price } = req.body;
    if(!name && !price){
        return res.status(200).json({message: "Please Update any Field"});
    }
    const medicine = await Medicine.findByIdAndUpdate(Mid) 
    if(!medicine){
        res.status(400).json({message: "Medicine not found"});
    }
    medicine.name = name || medicine.name;
    medicine.price = price || medicine.price;
    await medicine.save()

    const medicines = await Medicine.find()
    const user = req.user;
    res.render("medicineList", {user, medicines, message: "One Medicine Updated Successfylly"})

})

const deleteMedicine = asyncHandler( async(req, res) => {
    const { Mid } = req.params;

    const medicine = await Medicine.findByIdAndDelete(Mid);

    if(!medicine){
        return res.status(400).json({message: "No Medicine Found to Remove"});
    }

    const medicines = await Medicine.find()
    const user = req.user

    res.render("medicineList", {user, medicines, message: "One Medicine Deleted Successfylly"})
})

const createMedicinePage = asyncHandler(async (req, res) => {
    const user = req.user;
    res.render("newMedicine", {user})
})

const updateMedicinePage = asyncHandler(async (req, res) => {
    const { Mid } = req.params;
    console.log(Mid);
    const medicine = await Medicine.findById(Mid);
    const user = req.user
    res.render("updateMedicine", {user, medicine})
})


const medicineSearch = asyncHandler(async (req, res) => {
    const { search } = req.body;
    let result = new RegExp(`/^${search}.*/`)
    const medicines = await Medicine.find({ "name" : { $regex: "^" + search + ".*", $options: "i" }})
    console.log("this is result  " + medicines);
    let message;
    if( medicines == ""){
        message = `Nothing Find on the name ${search}`
    }
    const user = req.user
    res.render("medicineList", {user, medicines, message})

})



module.exports = { medicineSearch, updateMedicinePage, medicineListPage, createMedicine, updateMedicine, deleteMedicine, createMedicinePage };

