import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req: req,
    secret: process?.env?.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token",
  });

  const pathname = req.nextUrl.pathname;

  if (!token) {
    if (pathname.startsWith("/cart")) {
      //로그인 회원만 장바구니 진입 가능
      const url = new URL(`/signin`, req.url);
      return NextResponse.redirect(url);
    }
  } else {
    if (pathname.startsWith("/sign")) {
      //이미 로그인 상태일 때 로그인, 회원가입 진입 차단
      const url = new URL(`/`, req.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
