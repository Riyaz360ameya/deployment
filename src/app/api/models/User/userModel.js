import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      // unique:true
   },
   lastName: {
      type: String,
      required: true,
      // unique:true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   organization: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   isVerified: {
      type: Boolean,
      default: false
   },
   isAdmin: {
      type: Boolean,
      default: false
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