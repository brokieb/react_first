import MainNavigation from './MainNavigation';
import Container from 'react-bootstrap/Container';

function Layout(props) {
	return (
		<div>
			<MainNavigation />
			<Container className="pt-2 d-flex justify-content-center">{props.children}</Container>
		</div>
	);
}

export default Layout;
