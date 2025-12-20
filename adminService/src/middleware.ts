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

        const data = await axios.get(process.env["USER_SERVICE_URL"] + "/api/v1/auth/verify", {
            headers: {
                token: token
            }
        });

        req.user = data.data;
        next();
    } catch (error) {
        res.status(403).json({message: "Please Log In"});

    }
}

//multer setup

import multer from "multer";

const storage = multer.memoryStorage();

const uploadFile = multer({ storage }).single("file");

export default uploadFile;
