const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    unique_id: {
        type: String,
        unique: true,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        index: {unique: true},
    },
    password: {
        type: String,
        required:true
    },
    auth_token: {
        type: String,
    }
})



const collection = mongoose.model("Employee_Details", userSchema);

module.exports = collection
