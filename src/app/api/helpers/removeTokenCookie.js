import { NextResponse } from "next/server";

export function removeTokenCookie() {
    const response = NextResponse.json({
        message: "Unauthorized Entry",
        success: true
    }, { status: 401 });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
}
