import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'reactstrap';

// Parts
import AddProduct from '../../pages/Products/Products/AddProduct';
import Loader from '../Loader';

// Actions
import { getProduct } from '../../store/actions';

const ProductsEditor = ({ isOpen, toggle, fmlink }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (fmlink && fmlink !== undefined) {
			dispatch(getProduct(fmlink));
		}

		// eslint-disable-next-line
	}, [fmlink, dispatch]);

	const Products = useSelector((state) => state.Products);
	const { product, loading } = Products;

	return (
		<Modal
			className='modal-lg'
			style={{ minWidth: '90%' }}
			isOpen={isOpen}
			toggle={toggle}
		>
			<div className='modal-header'>
				<h5 className='modal-title mt-0' id='myModalLabel'>
					Ferocious Media CMS Editor
				</h5>
				<button
					type='button'
					onClick={toggle}
					className='close'
					data-dismiss='modal'
					aria-label='Close'
				>
					<span aria-hidden='true'>&times;</span>
				</button>
			</div>
			<div className='modal-body'>
				{loading ? (
					<Loader />
				) : (
					<AddProduct fmlink={fmlink} toggle={toggle} product={product} />
				)}
			</div>
		</Modal>
	);
};

export default ProductsEditor;
