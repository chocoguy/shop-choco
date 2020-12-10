import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './model/db.js';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';




dotenv.config();
connectDB();

const app = express();

//Middleware example
//app.use((req, res, next) => {
//    console.log("R")
//    console.log(req.originalUrl);
//    next()
//})
//runs everytime a request is made

app.use(cors())

app.use('/api/products', productRoutes);



app.get('/api/', (req, res) => {
    res.send("Welcome to proshop backend!");
});


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log("Server.js up and running!".blue.bold));


 //csrftoken=b5SfDDxmVwTAzEg41CkiBRwc4lUwu9XXSM2Vo2wXGEN2EzwG2LPJkS6o1XC8aB9P;sessionid=v1plrs0ghix3h1xa3divo1z4gn5el3o0