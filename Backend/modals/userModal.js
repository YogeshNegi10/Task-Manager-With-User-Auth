import mongoose from "mongoose";


// Making userSchema Here to Store All the necessary Details

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require:true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


export const User = mongoose.model('User',userSchema);