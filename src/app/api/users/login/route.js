import { connect } from "../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import Jwt from "jsonwebtoken";
import userModel from "../../models/User/userModel";
connect()

export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        console.log(reqBody, "backend login route")

        //check if user exist 
        const user = await userModel.findOne({ email })
        console.log('-----here')
        if (!user) {
            return NextResponse.json({
                error: "user doesn't exist"
            }, { status: 403 })
        }
        // Check if the user's email is verified
        else if (!user.isVerified) {
            return NextResponse.json({
                error: "User email is not verified",
            }, { status: 401 });
        }
        else {

            //check password
            const validPassword = await bcryptjs.compare(password, user.password)
            if (!validPassword) {
                return NextResponse.json({ error: "Login failed Check your credentials." }, { status: 403 })
            } else {
                const { password, __v, ...others } = user._doc
                //create token data
                const tokenData = {
                    id: others._id,
                    firstName: others.firstName,
                    lastName: others.lastName,
                    email: others.email,
                    organisation: others.organisation
                }

                //create token
                const token = Jwt.sign(tokenData, process.env.SECRET_TOKEN, { expiresIn: '1d' })

                const response = NextResponse.json({
                    message: "Login Successful",
                    User: others,
                    success: true
                })
                response.cookies.set("token", token, {
                    httpOnly: true
                })
                return response;
            }
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}