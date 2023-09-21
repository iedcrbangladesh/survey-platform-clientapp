//"use client";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
  
// Limit the middleware to paths starting with `/api/`
/*
export const config = {
  matcher: '/api/:function*',
};
*/ 
export function middleware(request: NextRequest) {
    // Call our authentication function to check the request
    const { pathname } = request.nextUrl
    console.log(pathname)
    
    if (pathname.slice(-9)=='callstart') {
      //console.log('here')
        //return NextResponse.rewrite(new URL('catincd/1introduction_permission', request.url))
        return NextResponse.redirect(new URL('catincd/1introduction_permission', request.url));
    }
    

    //console.log(pathname)
    
}