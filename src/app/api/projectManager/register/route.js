import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import bcryptjs from 'bcryptjs'
import managerLoginModel from "../../models/managerLoginModel";
connect();
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { firstName, lastName, email, password, designation } = reqBody
        //check if user already exist
        const user = await managerLoginModel.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User Already exists!" })
        }
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)
        const newPM = new managerLoginModel({
            firstName,
            lastName,
            email,
            password: hashPassword,
            designation,
        })
        const savedPM = await newPM.save();
        console.log(savedPM, '--------------newPM')
        //send email to verify
        return NextResponse.json({
            message: "PM created successfully",
            success: true,
            savedPM
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}