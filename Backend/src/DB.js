import mongoose from "mongoose";

const DB_URL = process.env.MONGODB_CONNECTION_URI;

export default async function connectDB() {
    const res = await mongoose.connect(DB_URL);     
    if(res) console.log("DataBase Connected");
}

