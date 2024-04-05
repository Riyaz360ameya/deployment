import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.SECRET_TOKEN;

// export const authMiddleware = async (req = NextRequest) => {
//     try {
//         const headersList = headers(req);
//         const authHeader = headersList.get('authorization')
//         console.log(authHeader, '---------authHeader')
//         // const authHeader = req.headers.get('authorization');
//         // Execute this code only on the server side
//         // const authHeader = req.headers.get('authorization');
//         console.log('-------', authHeader, '--------------authHeader');
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return null;
//         }
//         const token = authHeader.split(" ")[1];
//         if (!token) {
//             return null;
//         }
//         const decoded = jwt.verify(token, secret);
//         const userId = decoded?.userId;
//         const role = decoded?.role;
//         if (!userId || !role) {
//             return null;
//         }
//         req.userId = userId;
//         req.role = role;
//         return req;

//     } catch (error) {
//         console.error(error.message, '------error-----middleware');
//         return NextResponse.json({ message: 'Unauthorized entry token' }, { status: 401 });
//     }
// };



async function getHeaderData(req) {
    const headerData = headers(req);
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(headerData)
        }, 1000)
    )
}

export default async function authMiddleware(req = NextRequest) {

    try {
        const headerData = await getHeaderData(req)
        const authHeader = headerData.get('authorization')
        console.log('-------', authHeader, '------54--------authHeader');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return null;
        }
        const decoded = jwt.verify(token, secret);
        const userId = decoded?.userId;
        const role = decoded?.role;
        if (!userId || !role) {
            return null;
        }
        req.userId = userId;
        req.role = role;
        return req;

    } catch (error) {
        console.error(error.message, '------error-----middleware');
        return NextResponse.json({ message: 'Unauthorized entry token' }, { status: 401 });
    }

}