import { NextRequest } from "next/server";
import  Jwt  from "jsonwebtoken";


export const getDataFromToken = (request=NextRequest)=>{
    try {
       const token = request.cookies.get("token")?.value || ""
       const decodedToken = Jwt.verify(token,process.env.SECRET_TOKEN)
       return decodedToken.id;
    } catch (error) {
        throw new Error(error.message)
    }
}