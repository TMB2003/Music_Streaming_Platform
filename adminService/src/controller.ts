import type { Request } from "express";
import TryCatch from "./TryCatch.js";
import { getBuffer } from "./config/dataUri.js";
import cloudinary from "cloudinary";
import { sql_db } from "./config/db.js";
import { redisConnect } from "./config/redisDB.js";
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
        return res.status(400).json({message: "Failed to generate a file buffer"});
    }

    const image = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "albums"
    });

    const result = await sql_db`
        INSERT INTO Albums (title, description, thumbnail)
        VALUES (${title}, ${description}, ${image.secure_url})
        RETURNING *
    `;

    if(redisConnect.isReady){
        await redisConnect.del(`albums`);
    }

    return res.status(201).json({
        success: true,
        message: "Album added successfully",
        album: result[0],
    });
});


export const deleteAlbum = TryCatch(async (req: authenticatedRequest, res) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }

    const id = req.params['id'];
    const album = await sql_db`SELECT * FROM Albums WHERE id = ${id}`;

    if(album.length === 0){
        return res.status(400).json({message: "Album not found"});
    }
    
    await sql_db`
        DELETE FROM Songs
        WHERE album_id = ${id}
    `;
    
    await sql_db`
        DELETE FROM Albums
        WHERE id = ${id}
    `;

    return res.status(200).json({message: "Album deleted successfully"});
});

export const addSong = TryCatch(async (req: authenticatedRequest, res) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }

    const {title, description, album_id} = req.body;

    const isAlbum = await sql_db`SELECT * FROM Albums WHERE id = ${album_id}`;
    if(isAlbum.length === 0){
        return res.status(400).json({message: "Album not found"});
    }

    const file = req.file;
    if(!file){
        return res.status(400).json({message: "No Files Uploaded"});
    }

    const fileBuffer = getBuffer(file);
    if(!fileBuffer || !fileBuffer.content){
        return res.status(400).json({message: "Failed to generate file buffer"});
    }

    const image = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "songs",
        resource_type: "video"
    });

    const result = await sql_db`
        INSERT INTO Songs (title, description, audio, album_id)
        VALUES (${title}, ${description}, ${image.secure_url}, ${album_id})
        RETURNING *
    `;

    if(redisConnect.isReady){
        await redisConnect.del(`songs`);
    }
    if(redisConnect.isReady){
        await redisConnect.del(`album:${album_id}`);
    }

    return res.status(201).json({
        success: true,
        message: "Song added successfully",
        song: result[0],
    });
});

export const thumbnailUpload = TryCatch(async (req: authenticatedRequest, res) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }

    const song = await sql_db`SELECT * FROM Songs WHERE id = ${req.params['id']}`;
    if(song.length === 0){
        return res.status(400).json({message: "Song not found"});
    }

    const file = req.file;
    if(!file){
        return res.status(400).json({message: "No Files Uploaded"});
    }

    const fileBuffer = getBuffer(file);
    if(!fileBuffer || !fileBuffer.content){
        return res.status(400).json({message: "Failed to generate file buffer"});
    }

    const image = await cloudinary.v2.uploader.upload(fileBuffer.content);

    const result = await sql_db`
        UPDATE Songs
        SET thumbnail = ${image.secure_url}
        WHERE id = ${req.params['id']}
        RETURNING *
    `;

    const album_id = await sql_db`SELECT album_id FROM Songs WHERE id = ${req.params['id']}`;

    if(redisConnect.isReady){
        await redisConnect.del(`songs`);
    }
    if(redisConnect.isReady){
        await redisConnect.del(`album:${album_id}`);
    }

    return res.status(201).json({
        success: true,
        message: "Song thumbnail updated successfully",
        song: result[0],
    });
});

export const deleteSong = TryCatch(async (req: authenticatedRequest, res) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }

    const id = req.params['id'];

    const song = await sql_db`SELECT * FROM Songs WHERE id = ${id}`;
    if(song.length === 0){
        return res.status(400).json({message: "Song not found"});
    }   

    await sql_db`DELETE FROM Songs WHERE id = ${id}`;

    return res.status(200).json({message: "Song deleted successfully"});
});