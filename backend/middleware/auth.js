const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = "jhgfkhaewsifh";
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
            JWT_SECRET
        );

        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};


const authlogin = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email })
            .select("+password");

        if (!user) {
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
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );


        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: user.toPublic()
        });


    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


module.exports = {
    auth,
    authlogin
};