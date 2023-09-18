import { auth, login } from '@/lib/get-requests';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname == '/logout') {
    const response = NextResponse.redirect('http://localhost:3000/');
    response.cookies.delete('access-token');
    response.cookies.delete('refresh-token');
    request.cookies.delete('user-id');
    return response;
  }

  if (request.nextUrl.pathname == '/login') {
    try {
      const data = await login();
      return NextResponse.redirect(data.url);
    } catch { return NextResponse.redirect('http://localhost:3000/'); }
  }

  if (request.nextUrl.searchParams.has('code')) {
    try {
      let data = {
        accessToken: '',
        refreshToken: (request.cookies.has('refresh-token') ?
          request.cookies.get('refresh-token')?.value : 
          request.nextUrl.searchParams.get('code')) || '',
        userID: '',
      };
      
      data = await auth(data.refreshToken);
        
      const response = NextResponse.redirect('http://localhost:3000/');
      response.cookies.set('access-token', data.accessToken);
      response.cookies.set('refresh-token', data.refreshToken);
      response.cookies.set('user-id', data.userID);
      return response;
    } catch { return NextResponse.redirect('http://localhost:3000/'); }
  }

  if (request.nextUrl.pathname == '/profile') {
    const userID = request.cookies.get('user-id')?.value;
    return NextResponse.rewrite(`http://localhost:3000/user/${userID}/`);
  }
}
