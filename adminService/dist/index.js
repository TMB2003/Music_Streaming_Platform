import express from "express";
import dotenv from "dotenv";
import { sql_db } from "./config/db.js";
dotenv.config();
const app = express();
const PORT = process.env["PORT"];
async function initDB() {
    try {
        await sql_db `
            CREATE TABLE IF NOT EXISTS Albums(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                thumbnail VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await sql_db `
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
    }
    catch (error) {
        console.log("Database initialization failed", error);
    }
}
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Admin Service is running on port ${PORT}`);
    });
});
