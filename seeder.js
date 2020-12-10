//seeder imports data
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './model/userModel.js';
import Product from './model/productModel.js';
import Order from './model/orderModel.js';
import connectDB from './model/db.js';

dotenv.config()

connectDB()

const importData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        let createdUsers = await User.insertMany(users)
        let adminUser = createdUsers[0]._id
        let sampleProducts = products.map(product => {
            return{
                ...product,
                user: adminUser
            }
        })

        await Product.insertMany(sampleProducts)
        console.log("Data imported!".green.inverse)
        process.exit()
    }catch(error){
        console.error(`Error occured ${error.red.inverse}`)
        process.exit(1)
    }
}


const destroyData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log("Data destoyed!".green.inverse)
        process.exit()
    }catch(error){
        console.error(`Error occured ${error.red.inverse}`)
        process.exit(1)
    }
}

if(process.argv[2] == '-d'){
    destroyData();
}else{
    importData();
}

//node backend/seeder -d