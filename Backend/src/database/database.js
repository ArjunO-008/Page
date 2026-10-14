import mongoose from "mongoose";

export default async function connectDB() {
    try {
        const DB_URL = process.env.MONGODB_CONNECTION_URI;
        if (!DB_URL) throw new Error("Invalid DataBase Connection String..!");

        await mongoose.connect(DB_URL);
        return true;
    } catch (err) {
        return false;
    }
}

