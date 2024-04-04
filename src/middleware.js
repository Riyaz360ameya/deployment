import { NextResponse } from 'next/server';

export function middleware(req) {
    try {
        const path = req.nextUrl.pathname;
        const token = req.cookies.get('token')?.value || '';
        // console.log(token, '---------token')
        const user = path.startsWith('/user')
        const pm = path.startsWith('/projectManager')
        const lead = path.startsWith('/teamLead')
        const dev = path.startsWith('/developer')
        if (!token) {
            if (user && path !== '/user/login') {
                console.log('its user')
                return NextResponse.redirect(new URL('/user/login', req.nextUrl));
                // return NextResponse.rewrite(new URL('/login', req.nextUrl));
            }
            else if (pm && path !== '/projectManager/login') {
                console.log('its pm login')
                return NextResponse.redirect(new URL('/projectManager/login', req.nextUrl));
            }
            else if (lead && path !== '/teamLead/login') {
                console.log('its lead')
                return NextResponse.redirect(new URL('/teamLead/login', req.nextUrl));
            }
            else if (dev && path !== '/developer/login') {
                console.log('its dev')
                return NextResponse.redirect(new URL('/developer/login', req.nextUrl));
            }
        } else {
            // console.log(token,'------------token exist')

            // Check if the path is a public route and user is already authenticated
            if (
                (path === '/user/login' || path === '/user/register' ||
                    path === '/projectManager/login' || path === '/teamLead/login' || path === '/developer/login') &&
                token
            ) {
                // Redirect based on the user's role
                if (user) {
                    return NextResponse.redirect(new URL('/user/dashboard', req.nextUrl));
                } else if (pm) {
                    return NextResponse.redirect(new URL('/projectManager/dashboard', req.nextUrl));
                } else if (lead) {
                    // Redirect to team lead's home
                    // Adjust the URL accordingly
                    return NextResponse.redirect(new URL('/teamLead/dashboard', req.nextUrl));
                } else if (dev) {
                    // Redirect to developer's home
                    // Adjust the URL accordingly
                    return NextResponse.redirect(new URL('/developer/dashboard', req.nextUrl));
                }
            }
        }
    } catch (error) {
        console.error(error.message, '-------------error in middleware --Invalid token');
        return NextResponse.redirect(new URL('/error', req.nextUrl));
        // return NextResponse.json({ message: 'Invalid token Unauthorized' }, { status: 401 });
    }
}
// the middleware is called whenever the matcher endpoint is requested
export const config = {
    matcher: [
        '/user/login',
        '/user/newProject',
        '/user/package',
        '/user/projects',
        '/user/status',
        '/user/view',

        '/projectManager/login',
        '/projectManager/dashboard',
        '/projectManager/dashboard/newProjects',

        '/teamLead/login',
        '/teamLead/dashboard',

        '/developer/login',
        '/developer/dashboard',
    ],
};


// import { NextResponse } from 'next/server';

// export function middleware(req) {
//     try {
//         const path = req.nextUrl.pathname;
//         const token = req.cookies.get('token')?.value || '';
//         console.log(path, '-----------------path')
//         if (!token && path !== '/error') { // Add path !== '/error' condition
//             console.log('no token')
//             console.log(path, '-----------------path')
//             return NextResponse.redirect(new URL('/error', req.nextUrl));
//         } else {
//             console.log(token, '---------token')
//         }
//     } catch (error) {
//         console.error(error.message, '-------------error in middleware --Invalid token');
//         return NextResponse.redirect(new URL('/error', req.nextUrl));
//         // return NextResponse.json({ message: 'Invalid token Unauthorized' }, { status: 401 });
//     }
// }


// export const config = {
//     api: {
//         bodyParser: false,
//     },
//     middleware: 'all', // Apply middleware to all routes
// };


// export function middleware(req) {
//     try {
//         const token = req.cookies.get('token')?.value || '';

//         const decodedToken = decodeToken(token);

//         const routePermissions = {
//             '/user/dashboard': ['user'],
//             '/projectManager/dashboard': ['projectManager'],
//             '/teamLead/dashboard': ['teamLead'],
//             '/developer/dashboard': ['developer']
//             // Add more routes and corresponding roles as needed
//         };

//         // Extract the requested route
//         const requestedRoute = req.nextUrl.pathname;

//         if (!routePermissions[requestedRoute] || !routePermissions[requestedRoute].includes(decodedToken.role)) {
//             // If the user role doesn't permit access to the requested route, redirect to a suitable route
//             return NextResponse.redirect(new URL(`/${decodedToken.role}/dashboard`, req.nextUrl));
//         }

//         return NextResponse.next();
//     } catch (error) {
//         console.error(error.message, '-------------error in middleware --Invalid token');
//         return NextResponse.redirect(new URL('/error', req.nextUrl));
//     }
// }

// export const config = {
//     api: {
//         bodyParser: false,
//     },
//     middleware: 'all',
// };