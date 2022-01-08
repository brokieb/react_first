import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // return early if url isn't supposed to be protected

  //   const session = await getToken({ req, secret: process.env.JWT_SECRET });
  //   // You could also check for any property on the session object,
  //   // like role === "admin" or name === "John Doe", etc.
  //
  // If user is authenticated, continue.
  return NextResponse.next();
}
