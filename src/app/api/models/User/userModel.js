import mongoose, { Schema } from "mongoose";
import projectInfoModel from "../projectInfoModel";


const userSchema = new mongoose.Schema({
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
   organisation: {
      type: String,
      required: [true, "Please provide your organisation name"],
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
   cadFile: {
      data: Buffer, // Store file data as Buffer
      contentType: String, // MIME type of the file
      fileName: String, // Original file name
   },
   notifications: [
      {
         projectId: {
            type: mongoose.Types.ObjectId,
            ref: 'projectInfo', // Update to match the actual model name
            required: true,
         },
         message: {
            type: String,
            required: true
         },
         time: {
            type: Date,
            default: Date.now,
         },
      }
   ],
   forgotPassword: String,
   forgotPasswordToken: String,
   forgotPasswordTokenExpiry: Date,
   verifyToken: String,
   verifyTokenExpiry: Date,
})
delete mongoose.connection.models['users'];
const userModel = mongoose.models.users || mongoose.model("users", userSchema)

export default userModel;