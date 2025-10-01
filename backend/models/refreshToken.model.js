const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    refresh_token: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
}, { timestamps: true });

module.exports = mongoose.model("refresh_token", schema);