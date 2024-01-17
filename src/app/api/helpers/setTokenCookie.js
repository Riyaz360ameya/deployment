
const secret = process.env.SECRET_TOKEN
export const setTokenCookie = async ({ token, response }) => {
    response.cookies.set("token", token, { httpOnly: true })
    return { token, response }
}