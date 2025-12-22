import express from "express";
import { getAllAlbums, getAllSongs, getSong, getSongsOfAlbum } from "./controller.js";
import { isAuth } from "./middleware.js";
const router = express.Router();
router.get("/albums", isAuth, getAllAlbums);
router.get("/songs", isAuth, getAllSongs);
router.get("/album/:id", isAuth, getSongsOfAlbum);
router.get("/song/:id", isAuth, getSong);
export default router;
