import jwt from "jsonwebtoken";


 const sendCookie = (user,res,message,statusCode) =>{


   const token = jwt.sign({ token: user._id }, process.env.JWT_SECRET);

   
   res.status(statusCode).cookie("token", token, {
      expires: new Date(Date.now() + 1500 * 1000),
      httpOnly: true,
      sameSite:"none",
      secure:true
   }).json({
      success:true,
      message:message
   })


}

export default sendCookie;