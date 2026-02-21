
import Order from "../models/Order.js";
import User from "../models/User.js";
import Stripe from 'stripe'


//global variables

const currency = 'usd'
const deliveryCharge = 10


//gateway intialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing orders using cod method
export const placeOrder = async (req,res) =>{
    try {
        const {items,amount,address} = req.body;
        const userId = req.body.userId;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }

        const newOrder = await Order(orderData)
        await newOrder.save()

        await User.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success:true,message:'Order Placed'})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }

}



//placing orders using stripe method
export const placeOrderStripe = async (req,res) =>{
    try {
        const {items,amount,address} = req.body;
        const userId = req.body.userId;

        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'Stripe',
            payment:false,
            date:Date.now()
        }
         const newOrder = await Order(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data: {
                currency: currency,
                product_data:{
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
             price_data: {
                currency: currency,
                product_data:{
                    name: 'Delivey Charges'
                },
                unit_amount: deliveryCharge * 100 
            },
            quantity: 1

        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/Verify?success=true&orderId=${newOrder._id}`,
            cancel_url:  `${origin}/Verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })
        res.json({success:true, session_url:session.url})


        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
    
}
//verify Stripe
export const verifyStripe = async (req,res) =>{

     const { orderId,success} = req.body
        const {userId} = req.body.userId;
    try {

        if(success === 'true'){
            await Order.findByIdAndUpdate(orderId,{payment:true});
            await User.findByIdAndUpdate(userId,{cartData: {}})
            res.json({success:true});
        }else{
            await Order.findOneAndDelete(orderId)
            res.json({success:false})
        }
       

    } catch (error) {
         console.log(error)
        res.json({success:false, message:error.message})
        
        
    }
}




//all orders data for admin panel
export const allOrders = async (req,res) =>{
    try {
        const orders = await Order.find({})
        res.json({success:true,orders})
    } catch (error) {
         console.log(error)
        res.json({success:false, message:error.message})

        
    }

}


//user order data for frontend
export const userOrders = async (req,res) =>{
    try {
        const {userId} = req.body;
        const orders = await Order.find({ userId })
        res.json({success:true,orders})
    } catch (error) {
         console.log(error)
        res.json({success:false, message:error.message})
        
    }
    
}

//update order status from admin panel
export const updateStatus = async (req,res) =>{
    try {
        const { orderId, status } = req.body
        await Order.findByIdAndUpdate(orderId,{ status })
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
    
}