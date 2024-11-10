const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('../utils/jwt')
const User = require('../models/User')
const Token = require('../models/Token')


const Register = async(req,res) =>{
    const {username,email,password,role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        role: role,
    });
    try {
        const newUser = await user.save();
        const accessToken = jwt.generateAccessToken(newUser);
        const refreshToken = jwt.generateRefreshToken(newUser);
        res.status(201).json({
            message: "User registered succesfully",
            user: newUser, accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: email }, { username: email }]
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email/username or password' });
        }

        const accessToken = jwt.generateAccessToken(user);
        const refreshToken = await jwt.generateRefreshToken(user);

        res.status(200).json({ user, accessToken, refreshToken });
    } catch (error) {
        res.json({ message: error.message });
    }
};

const refreshToken = async(req,res) =>{
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

    try {
        const existingToken = await Token.findOne({ token: refreshToken, status: 'active' });
        if (!existingToken) return res.status(403).json({ message: 'Invalid or expired refresh token' });

        const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!decoded) return res.status(403).json({ message: 'Invalid refresh token' });

        const accessToken = generateAccessToken(decoded);
        const newRefreshToken = await rotateRefreshToken(refreshToken, decoded.id);

        res.status(200).json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error refreshing token', error });
    }
}

const Logout = async(req,res) =>{
    const { refreshToken } = req.body;
    try {
        await jwt.expireToken(refreshToken)
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err){
        res.status(500).json({ message: 'Error logging out', err });
    }
}

const getAllUsers = async(req,res) =>{
    try{
        const users = await User.find().select('-password');
        res.status(200).json(users)
    } catch (err){
        res.status(500).json({message: "Error fetching users"})
    }
}

const updateUser = async(req,res) =>{
    const { id } = req.params;
    const updates = req.body;
    try {
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}

const deleteUser = async(req,res) =>{
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}

module.exports = {
    Register,
    Login,
    refreshToken,
    Logout,
    getAllUsers,
    updateUser,
    deleteUser
}