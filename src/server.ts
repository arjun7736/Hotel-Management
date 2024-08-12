import express from 'express';
import dotenv from 'dotenv';
import connectDB  from "./infrastructure/database/db"
import morgan from "morgan"
dotenv.config();
import productRoute from "./interfaces/routes/productRoutes"
import authRoute from "./interfaces/routes/authRoutes"
import categoryRoute from "./interfaces/routes/categoryRoute"
import cors from "cors"
import errorMiddleware from './middleware/errorMiddleware';
import cookieParser from "cookie-parser"

const app = express();
const port:string|number = process.env.PORT || 3000
connectDB();
const corsOptions = {
    origin: ['http://localhost:3000','https://hotler.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
  };
  
  app.use(cookieParser());
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan("dev"));

app.use("/api/products",productRoute)
app.use("/api/auth",authRoute)
app.use("/api/category",categoryRoute)
app.use(errorMiddleware)




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
