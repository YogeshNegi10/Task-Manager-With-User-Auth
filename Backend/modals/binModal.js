import mongoose from "mongoose";


const binSchema = new mongoose.Schema({
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
   createdAt: {
      type: Date,
      default:Date.now()
   },
});

export const Bin = mongoose.model('Bin',binSchema);