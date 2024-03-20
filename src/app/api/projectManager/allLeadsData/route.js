import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
import leadLoginModel from "../../models/TeamLead/leadLoginModel";

connect();

export async function GET(req = NextRequest, res = NextResponse) {
    try {
        const { proManagerId } = await getDataFromToken()
        if (!proManagerId) {
            console.log('.....NO PM Id present');
            return removeTokenCookie();
        }
        const allLeadsData = await leadLoginModel.find({}).select('-password -haveAccess -isVerified -notifications -__v')
        console.log(allLeadsData, '--------------------allLeadsData')
        return NextResponse.json(
            { allLeadsData },
            { success: true },
            { status: 200 }
        )
    } catch (error) {
        console.log(error.message, '---------error in add new Team lead')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}