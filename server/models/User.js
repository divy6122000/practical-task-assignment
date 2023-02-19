const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    photos: {
        type: String,
        // required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}, { timestamps: true })
// mongoose.model = {}
module.exports = mongoose.model("Users", userSchema);