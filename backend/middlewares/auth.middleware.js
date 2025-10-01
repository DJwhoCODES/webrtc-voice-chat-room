const tokenService = require('../services/token.service');

function parseCookies(cookieHeader) {
    const cookies = {};
    if (!cookieHeader) return cookies;

    cookieHeader.split(";").forEach(cookie => {
        const [name, ...rest] = cookie.trim().split("=");
        cookies[name] = rest.join("=");
    });

    return cookies;
}

module.exports = async function (req, res, next) {
    try {
        const cookies = parseCookies(req.headers.cookie);
        const { refreshToken, accessToken } = cookies;
        if (!accessToken) {
            throw new Error();
        }
        const userData = await tokenService.verifyAccessToken(accessToken);
        if (!userData) {
            throw new Error();
        }
        req.user = userData;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};