import mongoose, { Schema } from "mongoose";

const projectManagerSchema = new mongoose.Schema({
  team:{
    type:String,
    required:true,
  },
  importance:{
    type:String,
    required:true,
  },
  projectTitle:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  instruction:{
    type:String,
    required:true,
  },
  startDate:{
    type:String,
    required:true,
  },
  endDate:{
    type:String,
    required:true,
  },
  // notifications:[
  //   {
  //       assignedBy:{
  //           type:String,
  //           required:true
  //       },
  //       projectId:{
  //           type:String,
  //           required:true
  //       },
  //   }
  // ]
})

const managerModel = mongoose.models.projectManager || mongoose.model("projectManager", projectManagerSchema)

export default managerModel;