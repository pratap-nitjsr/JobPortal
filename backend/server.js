import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobsRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan());

const PORT = process.env.PORT

connectDB()

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log("Server is running on port 76");
});