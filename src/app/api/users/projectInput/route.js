import { connect } from "../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import projectInfoModel from "../../models/projectInfoModel";
connect();

export async function POST(request = NextRequest) {
    try {
        const reqData = await request.json();
        const {
            userId,
            ventureName,
            projectPlace,
            email,
            ventureType,
            vision,
            projectUsp,
            contact,
            specification,
            amenities,
            pages,
            brochureLanguage,
            brochureBudget,
            leafLet,
            ventureDescription,
            estimatedDelivaryDate,
            siteAddress,
            previousVenture,
            officeAdress,
            location,
            projectOverview
        } = reqData
        console.log(reqData, "------------------client")
        const existUser = await projectInfoModel.findOne({ userId })
        if (existUser) {
            existUser.Details.push({
                ventureName,
                projectPlace,
                email,
                ventureType,
                vision,
                projectUsp,
                contact,
                specification,
                amenities,
                pages,
                brochureLanguage,
                brochureBudget,
                leafLet,
                ventureDescription,
                estimatedDelivaryDate,
                siteAddress,
                previousVenture,
                officeAdress,
                location,
                projectOverview,
                status:"New Task",
                date: new Date()
            })
            // Save the updated user details
            const savedData = await existUser.save();
            console.log(savedData, "------saved data---------o")
            return NextResponse.json({
                message: "Project details added successfully",
                success: true,
                savedData,
            }, { status: 200 });
        } else {
            //save to database
            const newProject = new projectInfoModel({
                userId,
                Details:
                    [
                        {
                            ventureName,
                            projectPlace,
                            email,
                            ventureType,
                            vision,
                            projectUsp,
                            contact,
                            specification,
                            amenities,
                            pages,
                            brochureLanguage,
                            brochureBudget,
                            leafLet,
                            ventureDescription,
                            estimatedDelivaryDate,
                            siteAddress,
                            previousVenture,
                            officeAdress,
                            location,
                            projectOverview,
                            status:"New Task",
                            date: new Date()
                        },
                    ],
            });
            console.log(newProject, '------------newProject')
            const savedData = await newProject.save();
            return NextResponse.json({
                message: "Project details added successfully",
                success: true,
                savedData,
            }, { status: 200 });
        }
    } catch (error) {
        console.error("Error adding project details-----:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}






















// import { connect } from "../../dbConfig/dbConfig";
// import { NextRequest, NextResponse } from "next/server";
// import projectInfoModel from "../../models/projectInfoModel";
// connect();

// export async function POST(request = NextRequest) {
//     try {
//         const reqData = await request.formData()
//         const userId = reqData.get('userId')
//         const projectTitle = reqData.get('projectTitle')
//         const description = reqData.get('description');
//         const startDate = reqData.get('startDate');
//         const endDate = reqData.get('endDate');
//         const files = reqData.get('cadFile');
//         const instruction = reqData.get('instruction');
//         const interiorViews = reqData.get('interiorViews');
//         const exteriorViews = reqData.get('exteriorViews');
//         const video = reqData.get('video');
//         console.log(userId, '------------userId')
//         // -----------------------------------interior view calculation-----------------------------------
//         // Multiply the predefined interiorViews by the user-entered interiorViews
//         // Predefined value for interiorViews
//         const predefinedInteriorCost = 35000;
//         const totalInteriorCost = predefinedInteriorCost * interiorViews;
//         // //  ----------------------------------exterior view calculation-------------------------------------------
//         const predefinedExteriorCost = 25000;
//         const totalExteriorCost = predefinedExteriorCost * exteriorViews;
//         // // --------------------------------------------video------------------------------------------

//         const videoDurationCost = 5000;
//         // Multiply the predefined video by the user-entered interiorViews
//         const totalVideoCost = videoDurationCost * video;
//         //total cost
//         const totalCost = totalInteriorCost + totalExteriorCost + totalVideoCost
//         console.log(totalCost)
//         // // ---------------------------------------------saved in datebase------------------------------
//         const existUser = await projectInfoModel.findOne({ userId })
//         if (existUser) {
//             existUser.Details.push({
//                 projectTitle,
//                 description,
//                 startDate,
//                 endDate,
//                 Files: [
//                     {
//                         name: files.name,
//                         file: {
//                             data: Buffer.from(await files.arrayBuffer()),
//                             contentType: files.type,
//                         },
//                         date: new Date(),
//                     },
//                 ],
//                 instruction,
//                 interiorViews,
//                 totalInteriorCost,
//                 exteriorViews,
//                 totalExteriorCost,
//                 video,
//                 totalVideoCost,
//                 date: new Date(),
//             });

//             // Save the updated user details
//             const savedData = await existUser.save();
//             console.log(savedData, "------saved data---------o")
//             return NextResponse.json({
//                 message: "Project details added successfully",
//                 success: true,
//                 savedData,
//                 totalCost
//             }, { status: 200 },);
//         } else {
// const newProject = new projectInfoModel({
//     userId,
//     Details:
//         [
//             {
//                 projectTitle,
//                 description,
//                 startDate,
//                 endDate,
//                 Files: [
//                     {
//                         name: files.name,
//                         file: {
//                             data: Buffer.from(await files.arrayBuffer()),
//                             contentType: files.type,
//                         },
//                         date: new Date(),
//                     },
//                 ],
//                 instruction,
//                 interiorViews,
//                 totalInteriorCost,
//                 exteriorViews,
//                 totalExteriorCost,
//                 video,
//                 totalVideoCost,
//                 totalCost,
//                 date: new Date(),
//             },
//         ],
// });
// console.log(newProject, '------------newProject')
// const savedData = await newProject.save();
// return NextResponse.json({
//     message: "Project details added successfully",
//     success: true,
//     savedData,
// }, { status: 200 },);
//         }
//     } catch (error) {
//         console.error("Error adding project details-----:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }
