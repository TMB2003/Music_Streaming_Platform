import jwt, {} from "jsonwebtoken";
import { User } from "./model.js";
export const isAuth = async (req, res, next) => {
    try {
        const token = Array.isArray(req.headers['token'])
            ? req.headers['token'][0]
            : req.headers['token'];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const jwtSecret = process.env['JWT_SECRET'];
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not configured");
        }
        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.id; // Changed from _id to id to match the JWT payload
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Unauthorized: Token expired" });
        }
        console.error('Authentication error:', error);
        return res.status(500).json({ message: "Internal server error during authentication" });
    }
};
