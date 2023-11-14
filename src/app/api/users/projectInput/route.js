import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Details from "@/app/models/formModel";

connect();

export async function POST(request = NextRequest) {
    try {
        const reqData = await request.json();
        console.log(reqData, '---------reqData');

        const {
            projectTitle,
            description,
            startDate,
            endDate,
            cadFile,
            instruction
        } = reqData;

        const newData = new Details({
            projectTitle,
            description,
            startDate,
            endDate,
            cadFile,
            instruction
        });

        const savedData = await newData.save();
        console.log(savedData, "savedData");

        // Log information about the saved data or any other relevant information.
        console.log("Project details added successfully:", savedData);

        return NextResponse.json({
            message: "Project details added successfully",
            success: true,
            savedData
        }, { status: 200 });
    } catch (error) {
        console.error("Error adding project details:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
