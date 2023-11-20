import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    Details: [
        {
            projectTitle: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true
            },
            startDate: {
                type: Date,
                required: [true, "Please provide startDate"],
            },
            endDate: {
                type: Date,
                required: [true, "Please provide your endDate"],
            },
            instruction: {
                type: String,
                required: [true, "Please provide your project instruction"],
            },
            interiorViews: {
                type: Number,
                required: [true, "Please provide your project interiorViews"],
            },
            totalInteriorCost: {
                type: Number,
            },
            exteriorViews: {
                type: Number,
                required: [true, "Please provide your project exteriorViews"],
            },
            totalExteriorCost: {
                type: Number,
            },
            video: {
                type: Number,
                required: [true, "Please provide your project video time duration"],
            },
            totalVideoCost: {
                type: Number,
            },
            totalCost:{
                type: Number,
            },
            Files: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    file: {
                        data: {
                            type: Buffer,
                            required: true,
                        },
                        contentType: {
                            type: String,
                            required: true,
                        },
                    },
                    date: Date,
                },
            ],

            date: Date,
        },
    ],
});

const projectInfoModel = mongoose.models.projectInformation || mongoose.model("projectInformation", projectSchema);

export default projectInfoModel;
