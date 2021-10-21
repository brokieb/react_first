import { Card, Button, ProgressBar } from 'react-bootstrap';
export default function Home(props) {
	return (
		<Card>
			<Card.Header>{props.title}</Card.Header>
			<Card.Body>
				<Card.Title>Special title treatment</Card.Title>
				<Card.Text>
					<p>
						Login <strong>{props.login}</strong>
					</p>
					<p>
						hasło <strong>{props.password}</strong>
					</p>
				</Card.Text>
				<small>
					pozostało dni: <strong>{props.title}</strong>
				</small>
				<ProgressBar animated now={props.days_left} />
				<div className="py-2">
					<Button variant="success" className="m-2">
						Przedłuż
					</Button>
					<Button variant="danger" className="m-2">
						Mam problem
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
}
