import mongoose from "mongoose";
const organizationSchema = new mongoose.Schema({
    organization:{
        type:String,
    }
})
delete mongoose.connection.models['organizationList'];
const organizationModel = mongoose.models.organizationList || mongoose.model("organizationList",organizationSchema);
export default organizationModel;