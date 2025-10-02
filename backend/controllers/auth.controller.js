const UserDto = require("../dtos/user.dto");
const hashService = require("../services/hash.service");
const otpService = require("../services/otp.service");
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");

class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({
                message: "Phone field is required!"
            })
        }

        const otp = await otpService.generateOtp();

        const ttl = 1000 * 60 * 5;
        const expiresAt = Date.now() + ttl;
        const data = `${phone}.${otp}.${expiresAt}`;

        const hash = hashService.hashOtp(data);

        res.status(200).json({ otp, hash: `${hash}.${expiresAt}`, phone });
    }

    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;

        if (!otp || !hash || !phone) {
            res.status(400).json({ message: "All fields are required!" });
        }

        const [hashedOtp, expiresAt] = hash.split(".");
        if (Date.now() > +expiresAt) {
            res.status(400).json({ message: "OTP is expired!" });
        }

        const data = `${phone}.${otp}.${expiresAt}`;

        const hashedData = hashService.hashOtp(data);

        const isValid = hashedData == hashedOtp ? true : false;

        if (!isValid) {
            res.status(400).json({ message: "Invalid OTP!" })
        }

        let user;
        let accessToken;
        let refreshToken;

        try {
            user = await userService.findUser({ phone });

            if (!user) {
                user = await userService.createUser({ phone, activated: false });
            }
        } catch (error) {
            res.status(500).json({ message: "DB Error!" });
        }

        accessToken = await tokenService.generateAccessToken(user.toObject());
        refreshToken = await tokenService.generateRefreshToken(user.toObject());

        await tokenService.storeRefreshToken(refreshToken, user._id);

        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true
        });

        const userDto = new UserDto(user);

        res.json({ user: userDto, auth: true });
    }

    async refresh(req, res) {
        const { refreshToken: refreshTokenFromCookie } = req.cookies;
        let userData;
        try {
            userData = await tokenService.verifyRefreshToken(
                refreshTokenFromCookie
            );
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Refresh Token' });
        }
        try {
            const token = await tokenService.findRefreshToken(
                userData._id,
                refreshTokenFromCookie
            );
            if (!token) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }
        const user = await userService.findUser({ _id: userData._id });
        if (!user) {
            return res.status(404).json({ message: 'No user' });
        }
        const accessToken = await tokenService.generateAccessToken({
            _id: userData._id,
        });
        const refreshToken = await tokenService.generateRefreshToken({
            _id: userData._id,
        });

        try {
            await tokenService.updateRefreshToken(userData._id, refreshToken);
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
        });
        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true });
    }

    async logout(req, res) {
        const { refreshToken } = req.cookies;
        await tokenService.removeToken(refreshToken);
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({ user: null, auth: false });
    }
}

module.exports = new AuthController;