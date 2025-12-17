import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const connectDb = async() => {
    try{
        await mongoose.connect(process.env['MONGO_URI'] || '');
        console.log('Connected to MongoDB');
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/v1", userRoutes)

const port = process.env['PORT'] || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    connectDb();
});
