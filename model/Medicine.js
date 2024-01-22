const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "userModel"
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
})


module.exports = mongoose.model("Medicine", medicineSchema);
