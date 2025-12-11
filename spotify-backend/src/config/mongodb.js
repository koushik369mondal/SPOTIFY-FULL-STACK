import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully!');
    })

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB connection error:', err);
    })

    try {
        // MongoDB Atlas URI already includes the database name
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

export default connectDB;