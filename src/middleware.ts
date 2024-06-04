import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, res: NextResponse) {
  let user = req.cookies.get('user_type');
  const originRes = NextResponse.next();

  const token = await getToken({
    req: req,
    secret: process?.env?.NEXTAUTH_SECRET,
    raw: true,
  });

  const { pathname } = req.nextUrl;

  if (!token) {
    if (pathname.startsWith('/cart') || pathname.startsWith('/order')) {
      //로그인, 구매자회원만 장바구니 진입 가능
      const url = new URL(`/signin`, req.url);
      return NextResponse.redirect(url);
    }
  } else {
    if (pathname.startsWith('/sign')) {
      //이미 로그인 상태일 때 로그인, 회원가입 진입 차단
      const url = new URL(`/`, req.url);
      return NextResponse.redirect(url);
    }
  }

  if (token && !user) {
    originRes.cookies.delete('next-auth.session-token');
    return originRes;
  }

  if (token && user?.value === 'BUYER') {
    if (pathname.startsWith('/seller')) {
      const url = new URL(`/`, req.url);
      return NextResponse.redirect(url);
    }
  }

  if (token && user?.value === 'SELLER') {
    if (pathname.startsWith('/cart') || pathname.startsWith('/order')) {
      const url = new URL(`/`, req.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/cart', '/order', '/seller/:path*', '/signin/:path*', '/signup/:path*'],
};
