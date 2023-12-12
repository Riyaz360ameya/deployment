import mongoose, { Schema } from "mongoose";

const projectManagerSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: [true, "Please provide firstName"],
      // unique:true
   },
   lastName: {
      type: String,
      required: [true, "Please provide lastName"],
      // unique:true
   },
   email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true
   },
   password: {
      type: String,
      required: [true, "Please provide your password"],
   },
   isVerified: {
      type: Boolean,
      default: false
   },
   isAdmin: {
      type: Boolean,
      default: false
   },
  
   
})

const projectManagerModels = mongoose.models.projectManager || mongoose.model("projectManager", projectManagerSchema)

export default projectManagerModels;