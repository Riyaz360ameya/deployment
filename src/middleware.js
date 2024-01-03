
import { NextResponse } from 'next/server';

export function middleware(req) {
    try {
        const path = req.nextUrl.pathname;
        const token = req.cookies.get('token')?.value || '';
        const user = path.startsWith('/user')
        const pm = path.startsWith('/projectManager')
        const lead = path.startsWith('/teamLead')
        const dev = path.startsWith('/developer')
        if (!token) {
            if (user) {
                return NextResponse.redirect(new URL('/user/login', req.nextUrl));
            }
            if (pm) {
                console.log('its pm login')
                return NextResponse.redirect(new URL('/projectManager/login', req.nextUrl));
            }
            if (lead) {
                return NextResponse.redirect(new URL('/teamLead/login', req.nextUrl));
            }
            if (dev) {
                return NextResponse.redirect(new URL('/developer/login', req.nextUrl));
            }
        }
        // Check if the path is a public route and user is already authenticated
        if (
            (path === '/user/login' || path === '/user/register' ||
                path === '/projectManager/login' || path === '/teamLead/login' || path === '/developer/login') &&
            token
        ) {
            // Redirect based on the user's role
            if (user) {
                return NextResponse.redirect(new URL('/user/', req.nextUrl));
            } else if (pm) {
                return NextResponse.redirect(new URL('/projectManager/home', req.nextUrl));
            } else if (lead) {
                // Redirect to team lead's home
                // Adjust the URL accordingly
                return NextResponse.redirect(new URL('/teamLead/home', req.nextUrl));
            } else if (dev) {
                // Redirect to developer's home
                // Adjust the URL accordingly
                return NextResponse.redirect(new URL('/developer/home', req.nextUrl));
            }
        }
    } catch (error) {
        console.error(error.message, '-------------error in middleware');
        return NextResponse.json({ message: 'Invalid token Unauthorized' }, { status: 401 });
    }
}

// the middleware is called whenever the matcher endpoint is requested
export const config = {
    matcher: [
        '/',
        '/register',
        '/login',
        '/profile',
        '/user',
        // '/projectManager/login',
        // '/teamLead/login',
        // '/developer/login',
        '/projectManager/home',
        '/teamLead/home',
        '/developer/home',
    ],
};
