// authMiddleware.js
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.SECRET_TOKEN;

const authMiddleware = async ({ req = NextRequest, res = NextResponse }) => {
    try {
        const headersList = headers();
        const authHeader = headersList.get('authorization')
        console.log(authHeader, '----------head')
        const token = authHeader.split(" ")[1];
        console.log(token, '----------token')
        if (!token) {
            return res.status(401).json({ message: 'No token Unauthorized' });
        }
        const decoded = jwt.verify(token, secret);
        console.log(decoded, '---------------------decoded')
        req.userId = decoded?.userId;
        // next();
    } catch (error) {
        console.error(error.message, '------error-----middleware');
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authMiddleware;
