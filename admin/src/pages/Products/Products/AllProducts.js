import React, { useEffect, useState } from 'react';
import {
	Row,
	Col,
	Card,
	CardBody,
	UncontrolledTooltip,
	Alert,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import Paginator from 'react-hooks-paginator';

// Parts
import ProductsEditor from '../../../components/ProductsComp/ProductsEditor';
import Loader from '../../../components/Loader';

// Actions
import {
	clearCurrent,
	getFolders,
	postActivity,
	removeProduct,
	getSeries,
	getCategories,
	getPreviews,
} from '../../../store/actions';

import ImageProd from '../../../components/ProductsComp/ImageProd';

const AllProducts = () => {
	const dispatch = useDispatch();

	const pageLimit = 20;

	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentData, setCurrentData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState('');

	const Products = useSelector((state) => state.Products);
	const { previews, loading, error, msg } = Products;
	const Login = useSelector((state) => state.Login);
	const { user } = Login;
	const Folders = useSelector((state) => state.Folders);
	const { folders } = Folders;
	const Series = useSelector((state) => state.Series);
	const { series } = Series;
	const Categories = useSelector((state) => state.Categories);
	const { categories } = Categories;

	useEffect(() => {
		setCurrentData(
			previews &&
				previews
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.slice(offset, offset + pageLimit)
		);
	}, [offset, previews]);

	const setToggle = (fmlink) => {
		if (isOpen) {
			setIsOpen(false);
			setCurrentItem('');
			dispatch(clearCurrent());
		} else {
			setIsOpen(true);
			setCurrentItem(fmlink);
		}
	};

	const deleteProduct = (prd) => {
		dispatch(
			postActivity({
				logtype: 'warning',
				logcontent: `The product <strong>${prd.fmtitle}</strong> has been removed`,
				email: user ? user.email : '',
			})
		);
		dispatch(removeProduct(prd._id));
	};

	useEffect(() => {
		dispatch(getPreviews());
		dispatch(getFolders());
		dispatch(getSeries());
		dispatch(getCategories());
	}, [dispatch]);

	const viewButton = (prd) => {
		const getserie =
			series &&
			series.filter(
				(els) =>
					(prd.category.some((it) => it.id === els.id) ||
						prd.secondCategory.some((it) => it.id === els.id)) &&
					els
			);
		const getcategory =
			categories &&
			categories.filter(
				(elc) =>
					(prd.category.some((it) => it.id === elc.id) ||
						prd.secondCategory.some((it) => it.id === elc.id)) &&
					elc
			);

		const getfolder =
			folders &&
			folders.filter((el) =>
				getserie.length > 0 && el.id === getserie[0].folderId
					? el
					: getcategory.length > 0 && el.id === getcategory[0].folderId
					? el
					: null
			);

		return (
			<React.Fragment>
				<UncontrolledTooltip placement='top' target={`Visit-${prd.id}`}>
					View Item
				</UncontrolledTooltip>
				<a
					id={`Visit-${prd.id}`}
					href={`https://apollo.ferociousmediaweb.com/products/${
						getfolder.length > 0 ? getfolder[0].fmlink : 'folder'
					}/${
						getserie.length > 0
							? getserie[0].fmlink
							: getcategory.length > 0
							? getcategory[0].fmlink
							: 'category'
					}/${prd.fmlink}`}
					className='btn waves-effect text-primary waves-light'
					style={{ fontSize: 30 }}
					target='_blank'
					rel='noopener noreferrer'
				>
					<i className='typcn typcn-eye-outline'></i>
				</a>
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			{isOpen && (
				<ProductsEditor
					isOpen={isOpen}
					toggle={setToggle}
					fmlink={currentItem}
				/>
			)}
			<div className='container-fluid fm-cards'>
				<Row className='align-items-center'>
					<Col sm={6}>
						<div className='page-title-box'>
							<h1 className=''>Products</h1>
							<ol className='breadcrumb mb-0'>
								<li className='breadcrumb-item'>
									<Link to='/dashboard'>Dashboard</Link>
								</li>
								<li className='breadcrumb-item'>All Products</li>
							</ol>
						</div>
					</Col>
				</Row>

				<Row>
					<Col sm={12}>
						{error ? <Alert color='danger'>{error}</Alert> : null}
						{msg ? <Alert color='warning'>{msg}</Alert> : null}
					</Col>
				</Row>

				<Row>
					{loading ? (
						<Loader />
					) : currentData && currentData.length > 0 ? (
						currentData.map((prd) => (
							<Col key={prd._id} md={12}>
								<Card>
									<Row>
										<Col sm={12} md={3}>
											<ImageProd prodimg={prd.images} />
										</Col>
										<Col sm={12} md={9}>
											<CardBody>
												<div className='card-container'>
													<div className='card-status-area'>
														{prd.isLive ? (
															<span className='badge badge-success'>
																Published
															</span>
														) : (
															<span className='badge badge-dark'>Draft</span>
														)}
													</div>
													<div className='card-content-area'>
														<h3 className='mt-0'>
															{prd.fmtitle ? prd.fmtitle : prd.title}
														</h3>
														{prd.fmsubtitle ? (
															<h5 className='card-title  mt-0'>
																Subtitle: {prd.subtitle}
															</h5>
														) : null}
														{prd.url && prd.title ? (
															<p className='card-text'>
																Distec Title:{' '}
																<a
																	href={prd.url}
																	target='_blank'
																	rel='noopener noreferrer'
																>
																	{prd.title}
																</a>
															</p>
														) : null}
													</div>
													<div className='card-actions-area'>
														<div className='buttons-only'>
															{viewButton(prd)}
															<UncontrolledTooltip
																placement='top'
																target={`EditTt-${prd.id}`}
															>
																Edit
															</UncontrolledTooltip>
															<button
																id={`EditTt-${prd.id}`}
																type='button'
																onClick={() => setToggle(prd.fmlink)}
																className='btn waves-effect text-primary waves-light'
																data-toggle='modal'
																data-target='#myModal'
																style={{ fontSize: 24 }}
															>
																<i className='typcn typcn-edit'></i>
															</button>{' '}
															<UncontrolledTooltip
																placement='top'
																target={`RemoveFt-${prd.id}`}
															>
																Remove
															</UncontrolledTooltip>
															<button
																id={`RemoveFt-${prd.id}`}
																type='button'
																onClick={() => deleteProduct(prd)}
																className='btn waves-effect ml-2 text-danger waves-light'
																style={{ fontSize: 24 }}
															>
																<i className='typcn typcn-trash'></i>
															</button>{' '}
														</div>
														<span>
															Last Modification:{' '}
															<Moment format='MMMM DD, YYYY'>
																{prd.updatedAt}
															</Moment>
														</span>
													</div>
												</div>
											</CardBody>
										</Col>
									</Row>
								</Card>
							</Col>
						))
					) : (
						<h4>There is no products yet</h4>
					)}
				</Row>

				<Row>
					<Col sm={12}>
						{previews && (
							<Paginator
								totalRecords={previews.length}
								pageLimit={pageLimit}
								pageNeighbours={3}
								setOffset={setOffset}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								pageContainerClass='pagination'
								pageActiveClass='current-page'
								pageNextText={<i className='typcn typcn-chevron-right'></i>}
								pageNextClass='pagination-arrow'
								pagePrevText={<i className='typcn typcn-chevron-left'></i>}
								pagePrevClass='pagination-arrow'
							/>
						)}
					</Col>
				</Row>
			</div>
		</React.Fragment>
	);
};

export default AllProducts;
