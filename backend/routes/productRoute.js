import express from 'express'

import { addProduct,removeProduct,listProducts,singleProduct } from '../controllers/productController.js'
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/adminAuth.js';

const productRouter = express.Router();
 productRouter.post("/add",adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
 //productRouter.post("/remove",removeProduct);
 //chatgpt error corrects route
 productRouter.delete("/remove/:id", adminAuth,removeProduct);

 //productRouter.post("/single",singleProduct);
  //chatgpt error corrects route
 productRouter.get("/single/:id", singleProduct);
 productRouter.get("/list",listProducts);


export default productRouter