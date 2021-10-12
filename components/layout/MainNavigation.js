import Link from 'next/link';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faRocket,
	faShoppingCart,
	faCashRegister,
	faUsersCog,
	faSitemap,
	faChartLine,
	faFileAlt,
	faCog,
	faUserCircle,
	faCreditCard,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function MainNavigation() {
	const router = useRouter();
	function redirect(e) {
		e.preventDefault();
		router.push(e.target.getAttribute('href'));
	}
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Link href="/">
					<Navbar.Brand href="/">Sklep</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Link href="/" replace>
							<Nav.Link href="/">Strona główna</Nav.Link>
						</Link>
						<Link href="/store/products-list">
							<Nav.Link href="/store/products-list">Wszystkie produkty</Nav.Link>
						</Link>

						<Link href="/new-meetup">
							<Nav.Link href="/new-meetup">?</Nav.Link>
						</Link>
						<Link href="/new-meetup">
							<Nav.Link href="/new-meetup">?</Nav.Link>
						</Link>
						<Link href="/new-meetup">
							<Nav.Link href="/new-meetup">?</Nav.Link>
						</Link>
					</Nav>
					<div className="d-flex justify-content-between flex-row align-items-center gap-3">
						<Dropdown>
							<Dropdown.Toggle align="end" variant="link" bsPrefix="p-0">
								<FontAwesomeIcon icon={faRocket} className="text-light" size="lg" />
							</Dropdown.Toggle>
							<Dropdown.Menu align="end">
								<Dropdown.Item href="/admin/all-orders" className="d-flex flex-row gap-2 align-items-center" onClick={redirect.bind(this)}>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faCashRegister} />
									Zamówienia
								</Dropdown.Item>
								<Dropdown.Item href="/admin/accounts" className="d-flex flex-row gap-2 align-items-center" onClick={redirect.bind(this)}>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faUsersCog} />
									Konta
								</Dropdown.Item>
								<Dropdown.Item href="/admin/products" className="d-flex flex-row gap-2 align-items-center" onClick={redirect.bind(this)}>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faSitemap} />
									Produkty
								</Dropdown.Item>
								<Dropdown.Item href="/admin/new-product" className="d-flex flex-row gap-2 align-items-center" onClick={redirect.bind(this)}>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faSitemap} />
									Dodaj produkt
								</Dropdown.Item>
								<Dropdown.Item href="/admin/stats" className="d-flex flex-row gap-2 align-items-center" onClick={redirect.bind(this)}>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faChartLine} />
									Statystyki
								</Dropdown.Item>
								<Dropdown.Item href="/admin/logs" className="d-flex flex-row gap-2 align-items-center" onClick={redirect.bind(this)}>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faFileAlt} />
									Logi
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item href="/admin/settings" className="d-flex flex-row gap-2 align-items-center" onClick={redirect.bind(this)}>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faCog} />
									Ustawienia sklepu
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Button variant="link" className="position-relative ps-0">
							<FontAwesomeIcon style={{ width: '1.5em' }} icon={faShoppingCart} className="text-light" size="lg" />
							<Badge bg="warning" text="dark" pill className="position-absolute" style={{ fontSize: '0.7em', right: '-0.7em' }}>
								99
							</Badge>
						</Button>
						<Dropdown>
							<Dropdown.Toggle variant="link" bsPrefix="p-0">
								<img
									className="xa"
									style={{ width: '35px', borderRadius: '100%' }}
									src="https://vetexpert.eu/sklep/391-large_default/urinovet-cat-dilution-preparat-na-uklad-moczowy-dla-kotow.jpg"
								/>
							</Dropdown.Toggle>

							<Dropdown.Menu align="end">
								<Dropdown.Item href="/user/profile" className="d-flex flex-row gap-2 align-items-center" onClick={redirect.bind(this)}>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faUserCircle} />
									Mój profil
								</Dropdown.Item>
								<Dropdown.Item href="/user/orders" className="d-flex flex-row gap-2 align-items-center" onClick={redirect.bind(this)}>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faCreditCard} />
									Zamówienia
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item href="/user/logout" className="d-flex flex-row gap-2 align-items-center" onClick={redirect.bind(this)}>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faSignOutAlt} />
									Wyloguj się
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default MainNavigation;
