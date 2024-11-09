const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const { verifyToken } = require('../utils/jwt');


const authenticateJWT = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access token required' });

    const decoded = verifyToken(token, 'your-access-token-secret');
    if (!decoded) return res.status(403).json({ message: 'Invalid access token' });

    req.user = decoded;
    next();
};

const authorizeRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = {
    authenticateJWT,
    authorizeRole
};
