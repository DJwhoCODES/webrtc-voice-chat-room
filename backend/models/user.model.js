const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

const UserModel = mongoose.model("user", schema);

module.exports = UserModel;