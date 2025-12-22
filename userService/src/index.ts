import express from "express";
import dotenv from "dotenv";
import userRoutes from "./route.js";
import { connectDB } from "./connectDB.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1", userRoutes)

const port = process.env['PORT'] || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    connectDB();
});
