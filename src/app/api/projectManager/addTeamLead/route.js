import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import bcryptjs from 'bcryptjs'
import leadLoginModel from "../../models/TeamLead/leadLoginModel";
connect();
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { firstName, lastName, email, designation, password } = reqBody
        const leader = await leadLoginModel.findOne({ email })
        if (leader) {
            return NextResponse.json({ error: "Leader Already exists!", success: false }, { status: 409 })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)
        const newLeader = new leadLoginModel({
            firstName,
            lastName,
            email,
            designation,
            password: hashPassword
        })
        const savedLeader = await newLeader.save()
        return NextResponse.json(
            { message: "Team Lead created successfully" },
            { savedLeader },
            { success: true },
            { status: 200 }
        )
    } catch (error) {
        console.log(error.message, '---------error in add new Team lead')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}