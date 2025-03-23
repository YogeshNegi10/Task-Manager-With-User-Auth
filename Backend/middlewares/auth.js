import jwt from "jsonwebtoken";
import { User } from "../modals/userModal.js";
import ErrorHandler from "../utils/error.js";
import { actualPassword } from "../controllers/userController.js";

// Function For User Authentication...

export const auth = async (req, res, next) => {

  try {
    const { token } = req.cookies;

    if (!token)

      return next(new ErrorHandler('Login First..',404))

    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.token);
    req.user.password = actualPassword
    next();

  } catch (error) {
    next(error)
  
  }
};
