import express from 'express'
import { createUser, getMyDetails, loginUser, logOut, sendOtp, verifiOtp,} from "../controllers/userController.js";
// import { auth } from "../middlewares/auth.js";

const userRouter = express.Router();


userRouter.post('/new', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/mydetails',  getMyDetails)
userRouter.get('/logout', logOut)
userRouter.post('/verify-email',  sendOtp)
userRouter.post('/verify-otp',  verifiOtp)




export default userRouter;