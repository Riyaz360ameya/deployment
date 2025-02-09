import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import Jwt from "jsonwebtoken";
import { connect } from "../../dbConfig/dbConfig";
import managerLoginModel from "../../models/ProjectManager/managerLoginModel";
import { setTokenCookie } from "../../helpers/setTokenCookie";

connect()
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        const pass = password
        //check if pm exist
        const pm = await managerLoginModel.findOne({ email })
        console.log(pm, '------------------PM')
        if (!pm) {
            return NextResponse.json({ error: "Account doesn't exist" }, { status: 400 })
        } else {
            //validpassword
            const validPassword = await bcryptjs.compare(pass, pm.password)
            if (!validPassword) {
                return NextResponse.json({ error: "Invalid Credential" }, { status: 400 })
            }
            //create token data
            const tokenData = {
                userId: pm._id,
                role: pm.designation,
            }
            const secret = process.env.SECRET_TOKEN
            const { password, __v, haveAccess, isVerified, ...others } = pm._doc
            const token = Jwt.sign(tokenData, secret, { expiresIn: '1d' })
            const response = NextResponse.json(
                {
                    message: "Login Successful"
                    , user: others, token
                },
                { success: true },
                { status: 200 })
            await setTokenCookie({ token, response })
            return response;
        }
    } catch (error) {
        console.log(error.message, '------------------error in login')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}