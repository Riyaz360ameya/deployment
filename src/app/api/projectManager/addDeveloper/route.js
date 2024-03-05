import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import bcryptjs from 'bcryptjs'
import developerModel from "../../models/Developer/developerLoginModel";
connect();
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody, '-----------------reqBody')
        const {firstName, lastName, designation, email, password } = reqBody
        const developer = await developerModel.findOne({ email })
        if (developer) {
            return NextResponse.json({ error: "Developer Already exists!", success: false }, { status: 409 })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)
        let savedDeveloper
        if (designation === "File Verifier") {
            const newDeveloper = new developerModel({
                firstName,
                lastName,
                email,
                designation,
                password: hashPassword,
                roles: []
            })
            savedDeveloper = await newDeveloper.save()
            return NextResponse.json(
                { message: "File Verifier created successfully" },
                { savedDeveloper },
                { success: true },
                { status: 200 }
            )
        } else {
            const { roles } = reqBody
            const newDeveloper = new developerModel({
                firstName,
                lastName,
                email,
                designation,
                password: hashPassword,
                roles
            })
            savedDeveloper = await newDeveloper.save()
            return NextResponse.json(
                { message: "Developer created successfully" },
                { savedDeveloper },
                { success: true },
                { status: 200 }
            )
        }
    } catch (error) {
        console.log(error, '---------error in add new Team lead')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}









