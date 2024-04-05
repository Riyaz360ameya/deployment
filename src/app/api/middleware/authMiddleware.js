import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { removeTokenCookie } from '../helpers/removeTokenCookie';

const secret = process.env.SECRET_TOKEN;

const authMiddleware = async (req = NextRequest, res = NextResponse) => {
    try {
        
        const headersList = headers(req);
        const authHeader = headersList.get('authorization')
        console.log(authHeader, '---------authHeader')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({ message: 'No token provided or token format invalid' }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.json({ message: 'No token Unauthorized' }, { status: 401 });
        }
        const decoded = jwt.verify(token, secret);
        const userId = decoded?.userId;
        const role = decoded?.role;
        if (!userId || !role) {
            return res.json({ error: "Forbidden Entry" }, { status: 403 });
        }
        req.userId = userId
        req.role = role
    } catch (error) {
        console.error(error.message, '------error-----middleware');
        return res.json({ message: 'Unauthorized entry' }, { status: 401 });
    }
};

export default authMiddleware;
