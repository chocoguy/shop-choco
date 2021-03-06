import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './model/db.js';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


dotenv.config();
connectDB();

const app = express();

app.use(express.json())

//Middleware example
//app.use((req, res, next) => {
//    console.log("R")
//    console.log(req.originalUrl);
//    next()
//})
//runs everytime a request is made

app.use(cors())

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) //will make folder static so we can actually use it


app.get('/api/', (req, res) => {
    res.send("Welcome to proshop backend!");
});


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log("Server.js up and running!".blue.bold));


