import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";

const secret = process.env.SECRET_TOKEN
export const getDataFromToken = async () => {
    try {
        console.log('2')
        const cookieStore = cookies()
        const token = cookieStore.get("token")?.value || "";
        // console.log(token, '--------token from the cookie store')
        // const token = request.cookies.get("token")?.value || "";
        if (!token) {
            console.log('NO token pls Login Again')
            return null
        }
        const decodedToken = Jwt.verify(token, secret)
        return decodedToken
    } catch (error) {
        console.log(error.message, '-----------error in getDataFromToken')
        throw new Error(error.message)
    }
}