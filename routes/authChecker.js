const jwt = require("jsonwebtoken");

module.exports = (req, res, callback) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        callback();
    } catch (error) {
        return res.status(401).json({
            message: "Authentication failed",
            error: error
        });
    }
};
