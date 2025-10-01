require("dotenv").config();
const crypto = require("crypto");

class HashService {
    hashOtp(data) {
        return crypto.createHmac("sha256", process.env.HASHING_PRIVATE_KEY).update(data).digest("hex");
    }
}

module.exports = new HashService();