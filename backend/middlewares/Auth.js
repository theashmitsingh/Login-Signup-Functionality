const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized, JWT token is required"
        });
    }
    try {
        const decoded = jwt.verify(auth, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized, JWT token is wrong or expired"
        });
    }
}

module.exports = ensureAuthenticated;