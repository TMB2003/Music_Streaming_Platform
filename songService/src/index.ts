import express from "express";
import dotenv from "dotenv";
dotenv.config();
import songRoutes from "./route.js";
import { redisDB } from "./config/redisDB.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", songRoutes);

redisDB.connect().then(() => console.log("Connected to Redis Successfully")).catch(console.error);

const port = process.env['PORT'];
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});