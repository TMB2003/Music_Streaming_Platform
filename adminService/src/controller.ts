import type { Request } from "express";
import TryCatch from "./TryCatch.js";
import { getBuffer } from "./config/dataUri.js";
import cloudinary from "cloudinary";
import { sql_db } from "./config/db.js";

interface authenticatedRequest extends Request {
    user?:{
        _id: string,
        role: string
    }
}

export const addAlbum = TryCatch(async (req: authenticatedRequest, res) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }

    const {title, description} = req.body;

    const file = req.file;
    if(!file){
        return res.status(400).json({message: "No Files Uploaded"});
    }

    const fileBuffer = getBuffer(file);
    if(!fileBuffer || !fileBuffer.content){
        return res.status(400).json({message: "Bad Request"});
    }

    try {
        const image = await cloudinary.v2.uploader.upload(fileBuffer.content, {
            folder: "albums"
        });

        const result = await sql_db`
            INSERT INTO Albums (title, description, thumbnail)
            VALUES (${title}, ${description}, ${image.secure_url})
            RETURNING *
        `;

        return res.status(201).json({
            success: true,
            message: "Album added successfully",
            album: result[0],
        });
    } catch (error) {
        console.error('Error in addAlbum:', error);
        return res.status(500).json({
            success: false,
            message: "Failed to add album. Please try again later."
        });
    }
});