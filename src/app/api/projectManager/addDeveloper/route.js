import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import bcryptjs from 'bcryptjs'
import developerModel from "../../models/developerLoginModel";
connect();
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { firstName, lastName, email, designation, password } = reqBody
        console.log(reqBody, "..............manager api")
        const leader = await developerModel.findOne({ email })
        if (leader) {
            return NextResponse.json({ error: "Developer Already exists!", success: false }, { status: 409 })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)
        const newDeveloper = new developerModel({
            firstName,
            lastName,
            email,
            designation,
            password: hashPassword
        })
        const savedDeveloper = await newDeveloper.save()
        console.log(savedDeveloper, '----------Saved Developer')
        return NextResponse.json(
            { message: "Developer created successfully" },
            { savedDeveloper },
            { success: true },
            { status: 200 }
        )
    } catch (error) {
        console.log(error, '---------error in add new Team lead')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}









