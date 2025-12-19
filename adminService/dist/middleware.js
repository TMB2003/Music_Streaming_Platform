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
        const data = await axios.get(process.env["USER_SERVICE_URL"] + "/api/v1/auth/verify", {
            headers: {
                token: token
            }
        });
        req.user = data.data;
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Please Log In" });
    }
};
