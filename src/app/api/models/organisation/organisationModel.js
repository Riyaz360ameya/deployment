import mongoose from "mongoose";
const organisationSchema = new mongoose.Schema({
    organisation:{
        type:String,
    }
})

const organisationModel = mongoose.models.organisationList || mongoose.model("organisationList",organisationSchema);
export default organisationModel;