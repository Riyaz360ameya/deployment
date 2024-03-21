import { NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
import devTaskModel from "../../models/Developer/developerTask";

connect()
export async function GET() {
    try {
        const { developerId } = await getDataFromToken()
        if (!developerId) {
            console.log('.....NO Dev Id present');
            return removeTokenCookie();
        }
        console.log(developerId, '------------developerId new tasks')
        const devTasks = await devTaskModel.findOne({ developerId })
        if (!devTasks) {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }
        console.log(devTasks.newTasks, '-----------------------devTasks')
        return NextResponse.json({ newTasks: devTasks.newTasks }, { status: 200 });
    } catch (error) {
        console.log(error.message, '------------newTasks error');
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}