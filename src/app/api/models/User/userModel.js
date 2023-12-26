import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: [true, "Please provide firstName"],
   },
   lastName: {
      type: String,
      required: [true, "Please provide lastName"],
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
   forgotPassword: String,
   forgotPasswordToken: String,
   forgotPasswordTokenExpiry: Date,
   verifyToken: String,
   verifyTokenExpiry: Date,
})

const userModel = mongoose.models.users || mongoose.model("users", userSchema)
export default userModel;