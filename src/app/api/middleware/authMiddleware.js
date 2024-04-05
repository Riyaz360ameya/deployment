
"use server"
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.SECRET_TOKEN;

const authMiddleware = async (req = NextRequest,) => {
    try {

        const authHeader = req.headers.get('authorization');
        console.log('-------',authHeader, '--------------authHeader')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return null
        }
        const decoded = jwt.verify(token, secret);
        const userId = decoded?.userId;
        const role = decoded?.role;
        if (!userId || !role) {
            return null
        }
        req.userId = userId
        req.role = role
        return req
    } catch (error) {
        console.error(error.message, '------error-----middleware');
        return NextResponse.json({ message: 'Unauthorized entry token' }, { status: 401 });
    }
};

export default authMiddleware;
