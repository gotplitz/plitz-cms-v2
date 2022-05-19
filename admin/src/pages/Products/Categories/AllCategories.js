import React, { useEffect, useRef, useState } from 'react';
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
import {
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material';
import Moment from 'react-moment';
import Paginator from 'react-hooks-paginator';

// Parts
import CategoriesEditor from '../../../components/ProductsComp/CategoriesEditor';
import Loader from '../../../components/Loader';

// Actions
import {
	clearCurrent,
	getCategories,
	getFolders,
	postActivity,
	removeCategory,
	filterItems,
	clearFilter,
} from '../../../store/actions';

const AllCategories = () => {
	const dispatch = useDispatch();
	const searchtext = useRef('');

	const pageLimit = 10;

	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentData, setCurrentData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [thetext, setThetext] = useState('');

	const Categories = useSelector((state) => state.Categories);
	const { categories, loading, error, msg, filtered } = Categories;
	const Login = useSelector((state) => state.Login);
	const { user } = Login;
	const Folders = useSelector((state) => state.Folders);
	const { folders } = Folders;

	useEffect(() => {
		setCurrentData(
			categories &&
				categories
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.slice(offset, offset + pageLimit)
		);
	}, [offset, categories]);

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

	const deleteCategory = (ctg) => {
		dispatch(
			postActivity({
				logtype: 'warning',
				logcontent: `The post <strong>${ctg.fmtitle}</strong> has been removed`,
				email: user ? user.email : '',
			})
		);
		dispatch(removeCategory(ctg._id));
	};

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getFolders());
	}, [dispatch]);

	useEffect(() => {
		if (error || msg) {
			setShowAlert(true);
		}

		const timer = setTimeout(() => {
			setShowAlert(false);
		}, 7000);

		return () => clearTimeout(timer);
	}, [error, msg]);

	const viewButton = (ctg) => {
		const getfolder =
			folders && folders.filter((el) => el.id === ctg.folderId && el);

		return (
			<React.Fragment>
				<UncontrolledTooltip placement='top' target={`Visit-${ctg.id}`}>
					View Item
				</UncontrolledTooltip>
				<a
					id={`Visit-${ctg.id}`}
					href={`https://apollo.ferociousmediaweb.com/products/${
						getfolder && getfolder.length > 0
							? getfolder[0].fmlink
							: 'apollo-folder'
					}/${ctg.fmlink}`}
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

	const clearFilterButton = (e) => {
		e.preventDefault();
		dispatch(clearFilter());
	};

	useEffect(() => {
		if (filtered === null) {
			searchtext.current.children[0].value = '';
		}
	}, [filtered]);

	useEffect(() => {
		dispatch(filterItems(thetext));

		// eslint-disable-next-line
	}, [categories]);

	const onChange = (e) => {
		if (searchtext.current.children[0].value !== '') {
			setThetext(e.target.value);
			dispatch(filterItems(e.target.value));
		} else {
			dispatch(clearFilter());
		}
	};

	return (
		<React.Fragment>
			{isOpen && (
				<CategoriesEditor
					isOpen={isOpen}
					toggle={setToggle}
					fmlink={currentItem}
				/>
			)}
			<div className='container-fluid fm-cards'>
				<Row className='align-items-center'>
					<Col sm={6}>
						<div className='page-title-box'>
							<h1 className=''>Categories</h1>
							<ol className='breadcrumb mb-0'>
								<li className='breadcrumb-item'>
									<Link to='/dashboard'>Dashboard</Link>
								</li>
								<li className='breadcrumb-item'>All Categories</li>
							</ol>
						</div>
					</Col>
					<Col sm={6}>
						<div className='page-title-box'>
							<InputLabel htmlFor='outlined-adornment-search'>
								Find Categories
							</InputLabel>
							<OutlinedInput
								fullWidth
								ref={searchtext}
								onChange={onChange}
								id='outlined-adornment-search'
								type='text'
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											onClick={(e) => clearFilterButton(e)}
											aria-label='toggle password visibility'
											edge='end'
										>
											<i className='mdi mdi-magnify-close'></i>
										</IconButton>
									</InputAdornment>
								}
							/>
						</div>
					</Col>
				</Row>

				<Row>
					<Col sm={12}>
						{showAlert && error ? <Alert color='danger'>{error}</Alert> : null}
						{showAlert && msg ? <Alert color='warning'>{msg}</Alert> : null}
					</Col>
				</Row>

				{filtered && filtered !== null ? (
					<Row>
						{filtered
							.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
							.map((ctg, index) => (
								<Col key={ctg._id} md={12}>
									<Card>
										<Row>
											<Col sm={12} md={3}>
												<img
													className='card-img-top img-fluid'
													src={
														ctg.featuredimg
															? ctg.featuredimg
															: 'uploads/big-placeholder.jpg'
													}
													alt={ctg.fmtitle}
												/>
											</Col>
											<Col sm={12} md={9}>
												<CardBody>
													<div className='card-container'>
														<div className='card-status-area'>
															{ctg.isLive ? (
																<span className='badge badge-success'>
																	Published
																</span>
															) : (
																<span className='badge badge-dark'>Draft</span>
															)}
														</div>
														<div className='card-content-area'>
															<h3 className='mt-0'>
																{ctg.fmtitle ? ctg.fmtitle : ctg.title}
															</h3>
															{ctg.fmsubtitle ? (
																<h5 className='card-title  mt-0'>
																	Subtitle: {ctg.fmsubtitle}
																</h5>
															) : null}
															<p className='card-text'>
																Distec Title: {ctg.title}
															</p>
														</div>
														<div className='card-actions-area'>
															<div className='buttons-only'>
																{viewButton(ctg)}
																<UncontrolledTooltip
																	placement='top'
																	target={`EditTt-${ctg.fmlink}`}
																>
																	Edit
																</UncontrolledTooltip>
																<button
																	id={`EditTt-${ctg.fmlink}`}
																	type='button'
																	onClick={() => setToggle(ctg.fmlink)}
																	className='btn waves-effect text-primary waves-light'
																	data-toggle='modal'
																	data-target='#myModal'
																	style={{ fontSize: 24 }}
																>
																	<i className='typcn typcn-edit'></i>
																</button>{' '}
																<UncontrolledTooltip
																	placement='top'
																	target={`RemoveFt-${ctg.id}`}
																>
																	Remove
																</UncontrolledTooltip>
																<button
																	id={`RemoveFt-${ctg.id}`}
																	type='button'
																	onClick={() => deleteCategory(ctg)}
																	className='btn waves-effect ml-2 text-danger waves-light'
																	style={{ fontSize: 24 }}
																>
																	<i className='typcn typcn-trash'></i>
																</button>{' '}
															</div>
															<span>
																Last Modification:{' '}
																<Moment format='MMMM DD, YYYY'>
																	{ctg.updatedAt}
																</Moment>
															</span>
														</div>
													</div>
												</CardBody>
											</Col>
										</Row>
									</Card>
								</Col>
							))}
					</Row>
				) : (
					<React.Fragment>
						<Row>
							{loading ? (
								<Loader />
							) : currentData && currentData.length > 0 ? (
								currentData.map((ctg) => (
									<Col key={ctg._id} md={12}>
										<Card>
											<Row>
												<Col sm={12} md={3}>
													<img
														className='card-img-top img-fluid'
														src={
															ctg.featuredimg
																? ctg.featuredimg
																: 'uploads/big-placeholder.jpg'
														}
														alt={ctg.fmtitle}
													/>
												</Col>
												<Col sm={12} md={9}>
													<CardBody>
														<div className='card-container'>
															<div className='card-status-area'>
																{ctg.isLive ? (
																	<span className='badge badge-success'>
																		Published
																	</span>
																) : (
																	<span className='badge badge-dark'>
																		Draft
																	</span>
																)}
															</div>
															<div className='card-content-area'>
																<h3 className='mt-0'>
																	{ctg.fmtitle ? ctg.fmtitle : ctg.title}
																</h3>
																{ctg.fmsubtitle ? (
																	<h5 className='card-title  mt-0'>
																		Subtitle: {ctg.fmsubtitle}
																	</h5>
																) : null}
																<p className='card-text'>
																	Distec Title: {ctg.title}
																</p>
															</div>
															<div className='card-actions-area'>
																<div className='buttons-only'>
																	{viewButton(ctg)}
																	<UncontrolledTooltip
																		placement='top'
																		target={`EditTt-${ctg.id}`}
																	>
																		Edit
																	</UncontrolledTooltip>
																	<button
																		id={`EditTt-${ctg.id}`}
																		type='button'
																		onClick={() => setToggle(ctg.fmlink)}
																		className='btn waves-effect text-primary waves-light'
																		data-toggle='modal'
																		data-target='#myModal'
																		style={{ fontSize: 24 }}
																	>
																		<i className='typcn typcn-edit'></i>
																	</button>{' '}
																	<UncontrolledTooltip
																		placement='top'
																		target={`RemoveFt-${ctg.id}`}
																	>
																		Remove
																	</UncontrolledTooltip>
																	<button
																		id={`RemoveFt-${ctg.id}`}
																		type='button'
																		onClick={() => deleteCategory(ctg)}
																		className='btn waves-effect ml-2 text-danger waves-light'
																		style={{ fontSize: 24 }}
																	>
																		<i className='typcn typcn-trash'></i>
																	</button>{' '}
																</div>
																<span>
																	Last Modification:{' '}
																	<Moment format='MMMM DD, YYYY'>
																		{ctg.updatedAt}
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
								<h4>There is no categories yet</h4>
							)}
						</Row>

						<Row>
							<Col sm={12}>
								{categories && (
									<Paginator
										totalRecords={categories.length}
										pageLimit={pageLimit}
										pageNeighbours={2}
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
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	);
};

export default AllCategories;
