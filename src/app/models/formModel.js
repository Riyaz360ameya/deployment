import mongoose, { Schema } from "mongoose";

const detailSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: [true, "Please provide Project details"],

    },
    description: {
        type: String,
        required: [true, "Please provide  description"],

    },
    startDate: {
        type: Date,
        required: [true, "Please provide startDate"],

    },
    endDate: {
        type: Date,
        required: [true, "Please provide your endDate"],
    },
    // budget: {
    //     type: Number,
    //     required: [true, "Please provide your project budget"],
    // },
    cadFile: {
        type:Buffer
        // data: Buffer, // Store file data as Buffer
        // contentType: String, // MIME type of the file
        // fileName: String, // Original file name
        // // required: [true, "Please provide your project budget"],
    },
    // cadFile: {
    //     type:Buffer
    // },
    instruction: {
        type: String,
        required: [true, "Please provide your project instruction"],
    },

})

const Details = mongoose.models.details || mongoose.model("details", detailSchema)

export default Details;