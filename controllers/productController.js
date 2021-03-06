import Product from '../model/productModel.js';


// /api/products
const getProducts = (async (req, res, next) => {
    try{
        const products = await Product.find({});
        res.json(products);
    }catch(error){
        console.log("Error occured at productRoutes.js" + error);
    }
});

const getProductById = (async (req, res) => {
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


const deleteProduct = (async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            await product.remove();
            res.json({"message" : "Product removed"})
        } else {
            console.log("Error occured at productcontroller.js");
            res.status(404).json({"error" : "Product not found"});
            throw new Error('Product not found!')
        }
    } catch (error) {
        console.log("Error occured at productRoutes.js!" + error);
    }
});



//TODO Create product is cucked.. fix it
const createProduct = (async (req, res) => {
    try {

        const { name, price, user, image, brand, category, countInStock, description } = req.body;

        const product = new Product({
            name: name,
            price: price,
            user: user,
            image: image,
            brand: brand,
            category: category,
            countInStock: countInStock,
            numReviews: 0,
            description: description
        })


        const createdProduct = await product.save();
        res.json(createdProduct)


    } catch (error) {
        console.log("Error occured at productRoutes.js!" + error);
    }
});



const updateProduct = (async (req, res) => {
    try {

        const { name, price, description, image, brand, category, countInStock } = req.body

        const product = await Product.findById(req.params.id)

        if(product){

            product.name = name
            product.price = price
            product.description = description
            product.image = image
            product.brand = brand
            product.category = category
            product.countInStock = countInStock

            const updatedProduct = await product.save();
            res.json(updatedProduct)
        }else{
            res.status(404).json({"error" : "no product found to update"})
        }

    } catch (error) {
        console.log("Error occured at productRoutes.js!" + error);
    }
});



export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }