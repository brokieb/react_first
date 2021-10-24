import ProductCard from './ProductCard';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import NewProductFormModal from './product/NewProductFormModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ProductsList(props) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	function addProductHandler(data) {
		axios
			.post('/api/postNewProduct', {
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					title: data.title,
					description: data.description,
					price: data.price,
					imageUrl: data.imageUrl,
				},
			})
			.then((res) => {
				if (res.status == '201') {
					console.log('poprawnie dodano :)', res);
				} else {
					console.log('blad');
				}
			});
	}
	return (
		<div className="d-flex flex-wrap justify-content-around">
			{props.products.map((product) => (
				<ProductCard
					key={product._id}
					_id={product._id}
					imageUrl={product.imageUrl}
					title={product.title}
					description={product.description}
					price={product.price}
				/>
			))}
			<Card style={{ width: '18rem' }} className="m-2 d-flex justify-content-center align-items-center" onClick={handleShow}>
				<FontAwesomeIcon size="3x" icon={faPlusSquare} />
			</Card>
			<NewProductFormModal show={show} handleClose={handleClose} onAddProduct={addProductHandler}></NewProductFormModal>
		</div>
	);
}

export default ProductsList;
