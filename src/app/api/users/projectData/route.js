import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConfig";
import userProjectsModel from "../../models/User/userProjectModel";
// import { getDataFromToken } from "../../helpers/getDataFromToken";
import { removeTokenCookie } from "../../helpers/removeTokenCookie";
import Jwt from "jsonwebtoken";
connect();
const secret = process.env.SECRET_TOKEN
export async function GET({ req = NextRequest, res = NextResponse }) {
    try {

        console.log('...............its here')

        // if ('authorization' in req.headers) {
            // const authHeader = req.headers.authorization;
            console.log(req,'----------authHeader')
            // Extract the token from the Authorization header
            // const token = authHeader.split(' ')[1];
            // console.log(token, '-----------------token')
            // // Now you can verify the token as per your authentication mechanism

            // // For example, if using JWT:
            // try {
            //     const decodedToken = Jwt.verify(token, secret);
            //     console.log('token is valid')
            //     // Token is valid
            //     // Proceed with your logic
            //     res.status(200).json({ message: 'Token is valid' });
            // } catch (error) {
            //     console.log('------------------- token is invalid')
            //     // Token is invalid or expired
            //     res.status(401).json({ message: 'Unauthorized' });
            // }
        // } else {
        //     // Authorization header missing
        //     res.status(401).json({ message: 'Unauthorized' });
        // }





        // const { userId, role } = await getDataFromToken()
        // if (!userId) {
        //     console.log('.....NO User Id present');
        //     return removeTokenCookie();
        // }
        // //  user exists
        // const userExists = await userProjectsModel.findOne({ userId })
        // console.log(userExists, '------------userExists')
        // if (!userExists) {
        //     return NextResponse.json({
        //         message: "User not found",
        //         success: false,
        //     }, { status: 404 });
        // }
        // // Fetch user's projects with project information populated
        // const projectsInformation = await userProjectsModel.findOne({ userId })
        //     .populate('NewProjects.ProjectId')
        //     .populate('onGoingProjects.ProjectId')
        //     .populate('completedProjects.ProjectId');
        // console.log(projectsInformation, ".................ppp");
        // return NextResponse.json({
        //     message: "fetched data successfully",
        //     success: true,
        //     projectsInformation,
        // });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
