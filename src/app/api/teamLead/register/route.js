import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import leadLoginModel from "../../models/leadLoginModel";
import { connect } from "../../dbConfig/dbConfig";
connect();

export async function POST(request = NextRequest) {
  try {
    const reqBody = await request.json()
    const { firstName, lastName, email, password } = reqBody
    console.log(reqBody)

    //check if user is exist 
    const user = await leadLoginModel.findOne({ email })
    if (user) {
      return NextResponse.json({
        error: "user is already exist",

      })
    }
    //hashpassword
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    const newUsers = await leadLoginModel({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })
    const savedLeadUsers = await newUsers.save()
    return NextResponse.json({
      message: "user created successfully",
      success: true,
      savedLeadUsers
    })
  } catch (error) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 })
  }
}