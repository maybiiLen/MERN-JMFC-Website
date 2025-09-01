import mongoose from "mongoose";

export default async function connectDB() {
    const URL = process.env.MONGO_URL;
    if(!URL) {
        throw new Error("MONGO_URL is not defined");
    }
    try {
        await mongoose.connect(URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
    
}