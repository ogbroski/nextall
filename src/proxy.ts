import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
   const route = request.nextUrl.pathname;
   const isPrivate = route.startsWith('/job-seeker') || route.startsWith('/recruiter');
   const token = request.cookies.get('token')?.value;

   if(isPrivate && !token) {
       return NextResponse.redirect(new URL('/login', request.url))
   }

   if (!isPrivate && token) {
       const role = request.cookies.get('role')?.value;
       const path = `/${role}/dashboard`
       return NextResponse.redirect(new URL(path, request.url))
   }
   return NextResponse.next();
}

export const config = {
   matcher: [
       '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
       '/(api|trpc)(.*)',
   ],
}