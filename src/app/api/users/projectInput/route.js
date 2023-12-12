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













