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
    },
    name: { type: String, required: false },
    avatar: {
        type: String,
        required: false,
        get: (avatar) => {
            if (avatar) {
                return `${process.env.BASE_URL}${avatar}`;
            }
            return avatar;
        },
    },
}, { timestamps: true });

const UserModel = mongoose.model("user", schema);

module.exports = UserModel;