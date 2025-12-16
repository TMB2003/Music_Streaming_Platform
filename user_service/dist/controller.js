import { User } from "./model.js";
import TryCatch from "./TryCatch.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = TryCatch(async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPassword });
    const jwtSecret = process.env['JWT_SECRET'];
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "7d" });
    return res.status(201).json({ user, token });
});
export const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const jwtSecret = process.env['JWT_SECRET'];
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "7d" });
    return res.status(200).json({ user, token });
});
