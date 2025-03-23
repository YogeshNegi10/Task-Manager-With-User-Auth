import express from 'express'
import { createUser, getMyDetails, loginUser, logOut } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const userRouter = express.Router();


userRouter.post('/new', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/mydetails', auth, getMyDetails)
userRouter.get('/logout', logOut)



export default userRouter;