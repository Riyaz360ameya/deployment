import mongoose, { Schema } from "mongoose";

const cadfileSchema = new mongoose.Schema({
    
   
    cadFile: {
        type: Buffer,
        contentType: String,
        fileName: String,
    },
   
   

})

const cadfile = mongoose.models.cadfiles || mongoose.model("cadfiles", cadfileSchema)

export default cadfile;