import { useSession, signIn } from 'next-auth/react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
export default function Home() {
	const { data: session } = useSession();

	return (
		<div>
			<main>
				<h1>Authentication in Next.js app using Next-Auth</h1>
				<div>
					{session && (
						<>
							{' '}
							<p style={{ marginBottom: '10px' }}> Welcome, {session.user.name ?? session.user.email}</p> <br />
							<img src={session.user.image} alt="" />
						</>
					)}
					{!session && (
						<>
							<p>Please Sign in</p>
							<img src="https://cdn.dribbble.com/users/759083/screenshots/6915953/2.gif" alt="" />
							<p>
								GIF by <a href="https://dribbble.com/shots/6915953-Another-man-down/attachments/6915953-Another-man-down?mode=media">Another man</a>{' '}
							</p>
						</>
					)}
				</div>
			</main>
		</div>
	);
}
