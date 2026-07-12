const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
        next();

    } catch (err) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};

const authlogin = async (req, res) => {
    try {
        const { email, password, role } = req.body
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        if (role && user.role !== role) {
            return res.status(403).json({
                message: "Access denied for this role"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            "mysecretkey",
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful",
            token,
            user: user.toPublic()
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = { auth, authlogin };