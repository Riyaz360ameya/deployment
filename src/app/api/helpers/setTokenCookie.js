import Jwt from "jsonwebtoken";

const secret = process.env.SECRET_TOKEN
export const setTokenCookie = async ({ tokenData, response }) => {
    const token = Jwt.sign(tokenData, secret, { expiresIn: '1d' })
    response.cookies.set("token", token, { httpOnly: true })
    return { token, response }
}