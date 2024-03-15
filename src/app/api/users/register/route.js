import { connect } from "../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "../../helpers/mail";
import userModel from "../../models/User/userModel";
import organizationModel from "../../models/organization/organizationModel";

connect()
export async function POST(request = NextRequest) {
    try {
        const reqBody = await request.json()
        const { firstName, lastName, email, organization, password, newOrganization } = reqBody
        //check if user already exist
        const user = await userModel.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User Already exists!" })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)
        let savedUser
        if (organization === "Other") {
            const organizationData = await organizationModel.findOne({ organization: newOrganization });
            if (organizationData) {
                console.log(organizationData, '------------exist organizationData')
                return NextResponse.json({
                    message: "This organization already exists",
                    success: false,
                }, { status: 401 });
            } else {
                const organizationDetails = await new organizationModel({ organization: newOrganization }).save();
                let organizationName = organizationDetails.organization
                const newUser = new userModel({
                    firstName,
                    lastName,
                    email,
                    organization: organizationName,
                    password: hashPassword,
                    designation:"user"
                })
                savedUser = await newUser.save();
                return NextResponse.json({
                    message: "User created successfully",
                    success: true,
                    savedUser
                })
            }
        } else {
            //hash password
            const newUser = new userModel({
                firstName,
                lastName,
                email,
                organization,
                password: hashPassword,
                designation:"user"
            })
            savedUser = await newUser.save();
            console.log(savedUser, "---------------savedUser")
            //send email to verify
            await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

            return NextResponse.json({
                message: "User created successfully",
                success: true,
                savedUser
            })
        }

    } catch (error) {
        console.log(error.message, '.......error register')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


