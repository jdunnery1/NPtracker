import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to Mongo ${conn.connection.host}`)
    } catch (e) {
        process.exit(1)
    }
}