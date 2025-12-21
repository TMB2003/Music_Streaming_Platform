import { sql_db } from "./config/db.js";
import TryCatch from "./TryCatch.js";
export const getAllAlbums = TryCatch(async (req, res) => {
    const albums = await sql_db `SELECT * FROM albums`;
    return res.status(200).json(albums);
});
export const getAllSongs = TryCatch(async (req, res) => {
    const songs = await sql_db `SELECT * FROM songs`;
    return res.status(200).json(songs);
});
export const getSongsOfAlbum = TryCatch(async (req, res) => {
    const id = req.params['id'];
    const albums = await sql_db `SELECT * FROM Albums WHERE id = ${id}`;
    if (albums.length === 0) {
        return res.status(404).json({ message: 'Album not found' });
    }
    const songs = await sql_db `SELECT * FROM songs WHERE album_id = ${id}`;
    return res.status(200).json(songs);
});
export const getSong = TryCatch(async (req, res) => {
    const song = await sql_db `SELECT * FROM songs WHERE id = ${req.params['id']}`;
    if (song.length === 0) {
        return res.status(404).json({ message: 'Song not found' });
    }
    return res.status(200).json(song);
});
