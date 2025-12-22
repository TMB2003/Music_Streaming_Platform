import express from "express";
import { getAllAlbums, getAllSongs, getSong, getSongsOfAlbum } from "./controller.js";

const router = express.Router();

router.get("/albums", getAllAlbums);
router.get("/songs", getAllSongs);
router.get("/album/:id", getSongsOfAlbum);
router.get("/song/:id", getSong);

export default router;