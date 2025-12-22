import type { Request, Response, NextFunction } from 'express';
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    playlist: string[];
}

interface AuthRequest extends Request {
    user?: IUser | null;
}

export const isAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers['token'] as string;
        
        if(!token){
            res.status(403).json({message: "Please Log In"});
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
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(403).json({message: "Please Log In"});
    }
}