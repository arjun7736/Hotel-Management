import express from 'express';
import dotenv from 'dotenv';
import connectDB  from "./infrastructure/database/db"
import morgan from "morgan"
dotenv.config();
import productRoute from "./interfaces/routes/productRoutes"

const app = express();
const port:string|undefined = process.env.PORT
connectDB();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products",productRoute)


app.use(morgan("dev"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
