import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

//routes
app.get("/",(req,res) =>{
    res.send('SEREVER IS WORKING')
});

app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);





app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})