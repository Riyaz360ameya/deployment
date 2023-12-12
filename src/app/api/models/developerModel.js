import mongoose from "mongoose";

const developerTaskSchema = new mongoose.Schema({
    taskTitle:{
        type:String,
        required:true,
      },
      taskDescription:{
        type:String,
        required:true,
      },
      taskStartDate:{
        type:String,
        required:true,
      },
      taskEndDate:{
        type:String,
        required:true,
      },
      notifications:[
        {
            assignedBy:{
                type:String,
                required:true
            },
            projectId:{
                type:String,
                required:true
            },
        }
      ]
})

const developerModelTask = mongoose.models.developerTask || mongoose.models("developerTask",developerTaskSchema)

export default developerModelTask;