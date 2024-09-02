import jwt from "jsonwebtoken";
import User from "../models/user.js"; 

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password"); // Corrected `.password`

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user; // This should be outside of the if-block

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message); // Improved logging message
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default protectRoute;
