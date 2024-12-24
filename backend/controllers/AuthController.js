const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }
        const hashPassword = await argon2.hash(password);
        const user = new User ({name, email, password: hashPassword});
        await user.save();
        return res.status(201).json({
            success: true,
            message: "Signup Successfully!"
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error at SignUp Controller"
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const errorMessage = "Email or password is incorrect!"

        if (!user) {
            return res.status(403).json({
                success: false,
                message: errorMessage
            });
        }

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(403).json({
                success: false,
                message: errorMessage
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            token,
            email,
            name: user.name
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error at Login Controller"
        });
    }
}