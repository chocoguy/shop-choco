import express from 'express';
import Product from '../model/productModel.js';

const router = express.Router()

// /api/products
router.get('/',  async (req, res, next) => {
    try{
        const products = await Product.find({});
        res.json(products);
    }catch(error){
        console.log("Error occured at productRoutes.js" + error);
    }
});

// /api/products/783
router.get('/:id', async (req, res) => {
    try{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        console.log("Error occured at prodRoutes.js");
        res.status(404);
        throw new Error('Product not found!')
    }
    }catch(error){
        console.log("Error occured at productRoutes.js!" + error);
    }
});

export default router