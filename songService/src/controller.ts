import { sql_db } from "./config/db.js";
import TryCatch from "./TryCatch.js";
import { redisConnect } from "./config/redisDB.js";


export const getAllAlbums = TryCatch(async (_req, res) => {
    let albums;
    if(redisConnect.isReady){
        albums = await redisConnect.get("albums");
    }
    if(albums){
        console.log("Cache Hit");
    }
    else{
        console.log("Cache Miss")
        albums = await sql_db`SELECT * FROM albums`;
        await redisConnect.set("albums", JSON.stringify(albums), { EX: 1800 });
        return res.status(200).json(albums);    
    }
    return res.status(200).json(JSON.parse(albums));
});

export const getAllSongs = TryCatch(async (_req, res) => {
    let songs;
    if(redisConnect.isReady){
        songs = await redisConnect.get("songs");
    }
    if(songs){
        console.log("Cache Hit");
    }else{
        console.log("Cache Miss")
        songs = await sql_db`SELECT * FROM songs`;
        await redisConnect.set("songs", JSON.stringify(songs), { EX: 1800 });
        return res.status(200).json(songs);    
    }
    return res.status(200).json(JSON.parse(songs));
});

export const getSongsOfAlbum = TryCatch(async(req, res) => {
    const id = req.params['id'];
    let album;
    if(redisConnect.isReady){
        album = await redisConnect.get(`album:${id}`);
    }

    if(album){
        console.log("Cache Hit");
    }
    else{
        console.log("Cache Miss")
        const albums = await sql_db`SELECT * FROM Albums WHERE id = ${id}`;
        if(albums.length === 0) {
            return res.status(404).json({ message: 'Album not found' });
        }
        const album = await sql_db`SELECT * FROM songs WHERE album_id = ${id}`;
        await redisConnect.set(`album:${id}`, JSON.stringify(album), { EX: 1800 });
    }
    return res.status(200).json(album);
});

export const getSong = TryCatch(async(req, res) => {
    const id = req.params['id'];
    const song = await sql_db`SELECT * FROM songs WHERE id = ${id}`;
    if(song.length === 0) {
        return res.status(404).json({ message: 'Song not found' });
    }
    return res.status(200).json(song);
});

