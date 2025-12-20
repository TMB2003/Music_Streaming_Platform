import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            res.status(403).json({ message: "Please Log In" });
            return;
        }
        const response = await axios.get(process.env["USER_SERVICE_URL"] + "/api/v1/user/profile", {
            headers: {
                token: token
            }
        });
        if (!response.data || !response.data.user) {
            throw new Error("Invalid user data");
        }
        // Attach user data to the request object
        req.user = response.data.user;
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        res.status(403).json({ message: "Please Log In" });
    }
};
//multer setup
import multer from "multer";
const storage = multer.memoryStorage();
const uploadFile = multer({ storage }).single("file");
export default uploadFile;
