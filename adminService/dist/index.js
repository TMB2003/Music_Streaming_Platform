import express from "express";
import dotenv from "dotenv";
import adminroute from "./route.js";
import cloudinary from "cloudinary";
import { initDB } from "./config/initDB.js";
dotenv.config();
cloudinary.v2.config({
    cloud_name: process.env["Cloud_Name"],
    api_key: process.env["Cloud_Api_Key"],
    api_secret: process.env["Cloud_Api_Secret"]
});
const app = express();
const PORT = process.env["PORT"];
app.use(express.json());
app.use('/api/v1/', adminroute);
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Admin Service is running on port ${PORT}`);
    });
});
