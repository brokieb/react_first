import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Container, Navbar, Nav, Dropdown, Badge, Button } from 'react-bootstrap';
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
import { useSession, signOut } from 'next-auth/react';
import axiosInstance from 'app/lib/axiosInstance';
import { useCookies } from 'react-cookie';
import { set } from 'app/features/counter/counterSlice';

function MainNavigation() {
	const router = useRouter();

	function redirect(e) {
		e.preventDefault();
		router.push(e.target.getAttribute('href'));
	}
	function UserPanel() {
		const { data: session, status } = useSession();
		const [cookies, setCookie] = useCookies(['cart']);
		const count = useSelector((state) => state.counter.value);
		const dispatch = useDispatch();
		axiosInstance
			.get('/api/cart/getCartItems', {
				params: {
					cart: cookies.cartId,
				},
			})
			.then((res) => {
				if (res.status == '200') {
					if (res.data.main) {
						let data = res.data.main.cart.items;
						if (data) {
							dispatch(set(data.length));
						}
					}
				}
			});

		return (
			<>
				{session ? (
					<>
						{session.user.permission == 2 ? (
							<>
								<Dropdown>
									<Dropdown.Toggle align="end" variant="link" bsPrefix="p-0">
										<FontAwesomeIcon icon={faRocket} className="text-light" size="lg" />
									</Dropdown.Toggle>
									<Dropdown.Menu align="end">
										<Dropdown.Item
											href="/admin/all-orders"
											className="d-flex flex-row gap-2 align-items-center"
											onClick={redirect.bind(this)}
										>
											<FontAwesomeIcon style={{ width: '1.5em' }} icon={faCashRegister} />
											Zamówienia
										</Dropdown.Item>
										<Dropdown.Item
											href="/admin/credentials"
											className="d-flex flex-row gap-2 align-items-center"
											onClick={redirect.bind(this)}
										>
											<FontAwesomeIcon style={{ width: '1.5em' }} icon={faUsersCog} />
											Konta
										</Dropdown.Item>
										<Dropdown.Item
											href="/admin/products-list"
											className="d-flex flex-row gap-2 align-items-center"
											onClick={redirect.bind(this)}
										>
											<FontAwesomeIcon style={{ width: '1.5em' }} icon={faSitemap} />
											Produkty
										</Dropdown.Item>
										<Dropdown.Item
											href="/admin/stats"
											className="d-flex flex-row gap-2 align-items-center"
											onClick={redirect.bind(this)}
										>
											<FontAwesomeIcon style={{ width: '1.5em' }} icon={faChartLine} />
											Statystyki
										</Dropdown.Item>
										<Dropdown.Item
											href="/admin/logs"
											className="d-flex flex-row gap-2 align-items-center"
											onClick={redirect.bind(this)}
										>
											<FontAwesomeIcon style={{ width: '1.5em' }} icon={faFileAlt} />
											Logi
										</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Item
											href="/admin/settings"
											className="d-flex flex-row gap-2 align-items-center"
											onClick={redirect.bind(this)}
										>
											<FontAwesomeIcon style={{ width: '1.5em' }} icon={faCog} />
											Ustawienia sklepu
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</>
						) : (
							<></>
						)}
					</>
				) : (
					<></>
				)}

				<Link href="/store/cart">
					<Button variant="link" className="position-relative ps-0">
						<FontAwesomeIcon
							style={{ width: '1.5em' }}
							icon={faShoppingCart}
							className="text-light"
							size="lg"
						/>
						{count == 0 ? (
							<></>
						) : (
							<Badge
								bg="warning"
								text="dark"
								pill
								className="position-absolute"
								style={{ fontSize: '0.7em', right: '-0.7em' }}
							>
								{count}
							</Badge>
						)}
					</Button>
				</Link>
				{session ? (
					<>
						<Dropdown>
							<Dropdown.Toggle variant="link" bsPrefix="p-0">
								<img
									className="xa"
									style={{ width: '35px', borderRadius: '100%' }}
									src={session.user.image}
								/>
							</Dropdown.Toggle>
							<Dropdown.Menu align="end">
								<Dropdown.Item
									href="/user/profile"
									className="d-flex flex-row gap-2 align-items-center"
									onClick={redirect.bind(this)}
								>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faUserCircle} />
									Mój profil
								</Dropdown.Item>
								<Dropdown.Item
									href="/user/orders"
									className="d-flex flex-row gap-2 align-items-center"
									onClick={redirect.bind(this)}
								>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faCreditCard} />
									Zamówienia
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item
									className="d-flex flex-row gap-2 align-items-center"
									onClick={() => signOut()}
								>
									<FontAwesomeIcon style={{ width: '1.5em' }} icon={faSignOutAlt} />
									Wyloguj się
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</>
				) : (
					<>
						<Link href="/auth/login">
							<Nav.Link href="/auth/login">Login</Nav.Link>
						</Link>
					</>
				)}
			</>
		);
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
					</Nav>
					<div className="d-flex justify-content-between flex-row align-items-center gap-3">
						<UserPanel />
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default MainNavigation;
