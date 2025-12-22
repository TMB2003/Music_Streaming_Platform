import type { Request } from "express";
import { sql_db } from "./config/db.js";
import TryCatch from "./TryCatch.js";

interface authenticatedRequest extends Request {
    user?:{
        _id: string,
        role: string
    }
}

export const getAllAlbums = TryCatch(async (req: authenticatedRequest, res) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
    const albums = await sql_db`SELECT * FROM albums`;
    return res.status(200).json(albums);
});

export const getAllSongs = TryCatch(async (req: authenticatedRequest, res) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
    const songs = await sql_db`SELECT * FROM songs`;
    return res.status(200).json(songs);
});

export const getSongsOfAlbum = TryCatch(async(req: authenticatedRequest, res) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
    const id = req.params['id'];

    const albums = await sql_db`SELECT * FROM Albums WHERE id = ${id}`;
    
    if(albums.length === 0) {
        return res.status(404).json({ message: 'Album not found' });
    }

    const songs = await sql_db`SELECT * FROM songs WHERE album_id = ${id}`;
    return res.status(200).json(songs);
});

export const getSong = TryCatch(async(req: authenticatedRequest, res) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(401).json({message: "Unauthorized"});
    }
    const song = await sql_db`SELECT * FROM songs WHERE id = ${req.params['id']}`;
    if(song.length === 0) {
        return res.status(404).json({ message: 'Song not found' });
    }
    return res.status(200).json(song);
});

