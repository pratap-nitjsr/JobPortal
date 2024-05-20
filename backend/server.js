import swaggerUi from 'swagger-ui-express';
import swaggerDoc from 'swagger-jsdoc';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSantize from 'express-mongo-sanitize';

import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobsRoutes.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(xss());
app.use(mongoSantize());
app.use(express.json());
app.use(cors());
app.use(morgan());

const PORT = process.env.PORT

connectDB()

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Portal WebApp",
            description : "MERN Job Portal"
        },
        servers: [
            {
                url: "http://localhost:76"
            }
        ]
    },
    apis : ["./routes/*.js"]
}

const spec = swaggerDoc(options);

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobRoutes);

app.use("/api-doc",swaggerUi.serve, swaggerUi.setup(spec))

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log("Server is running on port 76");
});