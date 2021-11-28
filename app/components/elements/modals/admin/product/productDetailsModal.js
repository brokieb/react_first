import { useRef, useState, useEffect } from 'react';
import { Button, Modal, Form, ListGroup, Tab, Row, Col } from 'react-bootstrap';
import EditProductForm from 'app/components/elements/forms/admin/product/editProductForm';
import FriendlyID from 'app/components/modules/friendlyID';
import DeleteProductButton from 'app/components/elements/buttons/admin/product/deleteProductButton';
import ToggleActiveProduct from 'app/components/elements/buttons/admin/product/toggleActiveProduct';
import DiscountProductForm from 'app/components/elements/forms/admin/product/discountProductForm';
import axiosInstance from 'app/lib/axiosInstance';
import Loading from 'app/components/layout/loading';
import CredentialsTableContent from 'app/components/elements/tables/credentials/credentialsTableContent';
export default function ProductDetailsModal(props) {
	const [credsData, setCredsData] = useState([]);
	const [loadingCredsTable, setLoadingCredsTable] = useState(true);
	const product = props.product;
	useEffect(() => {
		axiosInstance
			.get('/api/creds/getCredentials', {
				params: {
					_id: product._id,
				},
			})
			.then((items) => {
				setCredsData(items.data);
				setLoadingCredsTable(false);
			})
			.catch((err) => {});
	}, []);
	return (
		<Modal show={props.show} onHide={props.handleClose} size="xl">
			<Modal.Header closeButton>
				<Modal.Title>
					Edytuj produkt <FriendlyID ID={product._id} />
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="pt-0">
				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row>
						<ListGroup variant="flush" className="d-flex flex-row p-0 border-bottom mb-3">
							<ListGroup.Item action href="#link1" className="d-flex justify-content-center">
								Ustawienia
							</ListGroup.Item>
							<ListGroup.Item action href="#link2" className="d-flex justify-content-center">
								Podpięte konta
							</ListGroup.Item>
						</ListGroup>
						<Tab.Content>
							<Tab.Pane eventKey="#link1">
								<Row>
									<Col>
										<EditProductForm productData={product} />
									</Col>
									<Col>
										<div className="d-flex justify-content-evenly">
											<ToggleActiveProduct prodId={product._id} />
											<DeleteProductButton prodId={product._id} onSuccess={props.handleClose} />
										</div>
										<hr className="mx-5" />
										<div className="mx-5">
											<DiscountProductForm productData={product} />
										</div>
										<hr className="mx-5" />
									</Col>
								</Row>
							</Tab.Pane>
							<Tab.Pane eventKey="#link2">
								{loadingCredsTable ? <Loading /> : <CredentialsTableContent items={credsData} />}
							</Tab.Pane>
						</Tab.Content>
					</Row>
				</Tab.Container>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.handleClose}>
					Zamknij
				</Button>
				<Button type="submit" variant="success" form="editProductForm">
					Zapisz
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
