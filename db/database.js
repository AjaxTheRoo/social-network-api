import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

export const connectDB = async () => {
    const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/socialNetworkDB';
    try {
        await mongoose.connect(dbUri)
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        throw error; // Exit the process with failure
    }
};