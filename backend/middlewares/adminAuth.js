
//import jwt from 'jsonwebtoken'

//const adminAuth = async (req,res,next) =>{
    //try {
        
       // const token = req.headers;
       // if(!token){
        //    return res.json({success:false, message:"Not Authorized logina gain"})
        //}
       // const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        //if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        // return res.json({success:false, message:"Not Authorized logina gain"})

       // }
       // next();


    //} catch (error) {
     //   console.log(error);
      //  res.json({success:false,message:error.message})
        
        
   // }

//};
//export default adminAuth

//corrected codde
import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) =>{
    try {

        
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.json({success:false, message:"Not Authorized, Login again"})
        }

        // Bearer TOKEN ni split chestham
        const token = authHeader.split(" ")[1];

        const token_decode = jwt.verify(token,process.env.JWT_SECRET);

        if(token_decode.email !== process.env.ADMIN_EMAIL){
            return res.json({success:false, message:"Not Authorized"})
        }

        next();

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
};

export default adminAuth