const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const accessTokenSecret = 'your-access-token-secret';
const refreshTokenSecret = 'your-refresh-token-secret';

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role, createdBy: user.createdBy }, 
        accessTokenSecret, 
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = async (user) => {
    const refreshToken = jwt.sign(
        { id: user._id, createdBy: user.createdBy }, 
        refreshTokenSecret, 
        { expiresIn: '7d' }
    );
    const tokenDoc = new Token({
        userId: user._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    await tokenDoc.save();
    return refreshToken;
};


const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};

const rotateRefreshToken = async (oldToken, userId) => {
    const newToken = await generateRefreshToken({ _id: userId });
    await Token.updateOne({ token: oldToken }, { status: 'expired' });
    return newToken;
};

const expireToken = async (token) => {
    await Token.updateOne({ token }, { status: 'expired' });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    rotateRefreshToken,
    expireToken,
};
