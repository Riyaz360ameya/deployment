import mongoose from "mongoose";


export async function connect(){
    try {
         mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection
        connection.on("connected",()=>{
            console.log("ameya360Database connected successfully")
        })
        connection.on("error",()=>{
            console.log(error,"something wrong with db connection")
        })
    } catch (error) {
        console.log("something went wrong with database connection!")
        console.log(error);
    }
}