const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../models/refreshToken.model");

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
    async generateAccessToken(paylaod) {
        const accessToken = jwt.sign(paylaod, accessTokenSecret, {
            expiresIn: '1h'
        });

        return accessToken;
    }

    async generateRefreshToken(paylaod) {
        const refreshToken = jwt.sign(paylaod, refreshTokenSecret, {
            expiresIn: '1y'
        });
        return refreshToken;
    }

    async storeRefreshToken(token, userId) {
        try {
            await refreshTokenModel.create({ refresh_token: token, userId });
        } catch (error) {
            console.log(error.message);
        }
    }

    async verifyAccessToken(token) {
        return jwt.verify(token, accessTokenSecret);
    }

    async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, refreshTokenSecret);
    }
}

module.exports = new TokenService();