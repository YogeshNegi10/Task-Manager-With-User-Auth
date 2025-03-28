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
      type:String,
      default:"in Progress"
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },

  dueDate: {
    type: Date,
    default:""
  },
  createdAt: {
    type: Date,
    default:new Date(Date.now())
  },
});


export const Todo = mongoose.model('Todo',todoSchema)