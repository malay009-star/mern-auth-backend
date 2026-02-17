import { verifyAccessToken } from "../utils/token.utils.js";
import { User } from "../models/auth.model.js";

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = verifyAccessToken(token);

        const user = await User.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};


export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    message: "Not authenticated"
                });
            }
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    message: "Access denied. Insufficient permissions."
                });
            }
            next();

        } catch (error) {
            return res.status(500).json({
                message: "Server error"
            });
        }
    };
};

