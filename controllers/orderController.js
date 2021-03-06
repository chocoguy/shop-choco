import Order from '../model/orderModel.js';


// /api/orders
const addOrderItems = (async (req, res, next) => {
    try{
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

        if(orderItems && orderItems.length === 0) {
            res.status(400).json({"error" : "no order"})
            return
        }else{
            const order = new Order({  user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice })
            const createdOrder = await order.save()
            res.status(201).json(createdOrder)
        }
    }catch(error){
        console.log("Error occured at productRoutes.js" + error);
        res.status(500).json({"error" : "try again LATER"})
    }
});

// api/orders/:id
const getOrderById = (async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id).populate('user', 'name email')

        if(order){
            res.json(order)
        }else{
            res.status(404).json({"error" : "order not found"})
            return
        }
         
    }catch(error){
        console.log("Error occured at productRoutes.js" + error);
        res.status(500).json({"error" : "try again LATER"})
    }
});

// api/orders/:id/pay
const updateOrderToPaid = (async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id)

        if(order){
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            } //comes from paypal


        const updatedOrder = await order.save();

        res.json(updatedOrder);

        }else{
            res.status(404).json({"error" : "order not found"})
            return
        }
         
    }catch(error){
        console.log("Error occured at productRoutes.js" + error);
        res.status(500).json({"error" : "try again LATER"})
    }
});


// api/orders/myorders
const getMyOrders = (async (req, res, next) => {
    try{
        const orders = await Order.find({user: req.user._id});
        res.json(orders);

    }catch(error){
        console.log("Error occured at ordercontroller.js" + error);
        res.status(500).json({"error" : "try again LATER"})
    }
});




export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }