import { v2 as cloudinary } from 'cloudinary'
import Product from '../models/Product.js';

//add product
export const  addProduct = async (req,res) =>{

    try {
        const {  name,description,price,category,subCategory,sizes,bestseller } = req.body;

        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=>item !== undefined);
        
        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

       const productData = {
        name,
        description,
        category,
        price:Number(price),
        subCategory,
        bestseller: bestseller === 'true' ? true : false,
        sizes: JSON.parse(sizes),
        image: imagesUrl,
        date: Date.now()
       }
       console.log(productData);

       const product = Product(productData);
       await product.save();

       res.json({success:true, message:'Product added'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }



}

//list product

export const  listProducts = async (req,res) =>{
    try {
        const products = await Product.find({});
        res.json({success:true,products});

    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})    
    }


}

//remove product
//export const  removeProduct = async (req,res) =>{
   // try {
       // await Product.findByIdAndDelete(req.body.id);
       // res.json({success:true,message:"Product removed"})

    //} catch (error) {
      //   console.log(error)
       // res.json({success:false,message:error.message}) 

        
    //}

//}

//remove product route for chat gpt corrected
export const removeProduct = async (req, res) => {
    try {

        const { id } = req.params;

        await Product.findByIdAndDelete(id);

        res.json({ success: true, message: "Product removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//singleproduct
//export const  singleProduct = async (req,res) =>{
    //try {
    //    const { productId } = req.body;
      //  const product = await Product.findById(productId)
     //   res.json({success:true,product});

   // } catch (error) {
     //   console.log(error);
      //  res.json({ success: false, message: error.message });
        
    //}

//}


//singleproduct route for chat gpt corrected
export const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

