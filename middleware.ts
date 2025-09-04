import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/products(.*)', '/about', '/api/(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = auth();
    const isAdminUser = userId === process.env.ADMIN_USER_ID;

    // Allow API routes and public routes
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    // Protect admin routes
    if (isAdminRoute(req)) {
        if (!isAdminUser) {
            return NextResponse.redirect(new URL('/', req.url));
        }
        return NextResponse.next();
    }

    // For all other routes, require authentication
    if (!userId) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next).*)',
        '/(api|trpc)(.*)'
    ],
};