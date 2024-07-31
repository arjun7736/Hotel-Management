import express from 'express';
import dotenv from 'dotenv';
import connectDB  from "./infrastructure/database/db"
import morgan from "morgan"
dotenv.config();
import productRoute from "./interfaces/routes/productRoutes"
import authRoute from "./interfaces/routes/authRoutes"
import cors from "cors"
import errorMiddleware from './middleware/errorMiddleware';

const app = express();
const port:string|undefined = process.env.PORT
connectDB();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
  };
  

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan("dev"));

app.use("/api/products",productRoute)
app.use("/api/auth",authRoute)
app.use(errorMiddleware)




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
