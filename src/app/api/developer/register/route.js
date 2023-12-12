import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import developerModel from "../../models/developerLoginModel";
import bcryptjs from 'bcryptjs'
connect();


export async function POST(request = NextRequest) {
   try {
      const reqBody = await request.json()
      const { firstName, lastName, email, password } = reqBody
      console.log(reqBody)
      //check if user exist
      const user = await developerModel.findOne({ email })
      if (user) {
         return NextResponse.json({
            message: "user is already exist",
            success: true
         })
      }
      //hashpassword
      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt)


      const newdevUsers = await developerModel({
         firstName,
         lastName,
         email,
         password: hashedPassword
      })
      const developerSavedUsers = await newdevUsers.save()
      return NextResponse.json({
         message: "Registered successfully",
         success: true,
         developerSavedUsers
      })
   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
   }
}