import mongoose from "mongoose";

// Making todoSchema Here to Store All the necessary Details

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  iscompleted:{
      type:Boolean,
      default:false
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  createdBy: {
    type: Date,
    default:Date.now()
  },
});


export const Todo = mongoose.model('Todo',todoSchema)