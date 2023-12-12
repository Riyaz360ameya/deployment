import mongoose, { Schema } from "mongoose";

const teamLeadSchema = new mongoose.Schema({
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

const teamLeadsModel = mongoose.models.teamleads || mongoose.model("teamleads", teamLeadSchema)

export default teamLeadsModel;