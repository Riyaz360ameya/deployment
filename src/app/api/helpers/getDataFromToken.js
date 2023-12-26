import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";


export const getDataFromToken = (request = NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        if (!token) {
            console.log('NO token token')
        }
        const decodedToken = Jwt.verify(token, process.env.SECRET_TOKEN)
        return decodedToken.id;
    } catch (error) {
        console.log(error.message, '-----------error.message')
        throw new Error(error.message)
    }
}