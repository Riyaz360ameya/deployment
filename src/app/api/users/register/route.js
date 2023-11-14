import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/app/helpers/mailer";


connect()

export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { firstName, lastName, email, organisation, password } = reqBody

        //check if user already exist
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User Already exists!" })
        }
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            organisation,
            password: hashPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser, "savedUser")


      
      //send email to verify
      await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

        console.log(reqBody, "backend data")

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}