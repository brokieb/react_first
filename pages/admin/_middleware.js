import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
// import { getSession } from 'next-auth/react';

export async function middleware(NextRequest, NextFetchEvent) {
	// const session = await getSession({ NextRequest });
	// console.log(session, '+++++');
	// if (session && session.user.permission == 2) {
	// 	console.log('POZWALAMY');
	// 	NextResponse.next();
	// }
	// if (session) {
	// }
	// return NextResponse.redirect('/');
}
