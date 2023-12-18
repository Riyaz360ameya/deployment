import { NextRequest, NextResponse } from "next/server";
import projectInfoModel from "../../models/User/projectInfoModel";

export const upDateOnClient = async ({ projectId }) => {
    try {
        const _id = projectId.toString();
        console.log(_id, '-------------Id 5454');

        const clientData = await projectInfoModel.findById(_id);
        console.log(clientData, '-------------clientData');
        if (!clientData) {
            console.log('Task not found for projectId:', projectId);
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        console.log(clientData, '---------------clientData')
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}