import express from "express";
import dotenv from "dotenv";
import { sql_db } from "./config/db.js";
import adminroute from "./router.js";
import cloudinary from "cloudinary";

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env["Cloud_Name"] as string,
    api_key: process.env["Cloud_Api_Key"] as string,
    api_secret: process.env["Cloud_Api_Secret"] as string
});

const app = express();
const PORT = process.env["PORT"];

async function initDB() {
    try {
        await sql_db`
            CREATE TABLE IF NOT EXISTS Albums(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                thumbnail VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;


        await sql_db`
            CREATE TABLE IF NOT EXISTS Songs(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                thumbnail VARCHAR(255),
                audio VARCHAR(255) NOT NULL,
                album_id INTEGER REFERENCES Albums(id) ON DELETE SET NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        console.log("Database initialized successfully");
    } catch (error) {
        console.log("Database initialization failed", error);
    }
}

app.use(express.json());
app.use('/api/v1/', adminroute);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Admin Service is running on port ${PORT}`);
    });
});