import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import  Jwt  from "jsonwebtoken";
connect()

export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        console.log(reqBody, "backend login route")

        //check if user exist 
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({
                error: "user doesn't exist"
            }, { status: 400 })
        }

        //check password
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }


        //create token data
        const tokenData = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            organisation: user.organisation
        }

        //create token
        const token =  Jwt.sign(tokenData, process.env.SECRET_TOKEN,{expiresIn:'1d'})

        const response = NextResponse.json({
            message: "Login successfull",
            User:user,
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}