import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log(`Connected to MONGODB database`);
    }
    catch (error) {
        console.log(error);
    }
}

export default connectDB;