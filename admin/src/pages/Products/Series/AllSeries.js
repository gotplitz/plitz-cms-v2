import React, { useEffect, useState, useRef } from 'react';
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
import SeriesEditor from '../../../components/ProductsComp/SeriesEditor';
import Loader from '../../../components/Loader';

// Actions
import {
	clearCurrent,
	getFolders,
	getSeries,
	postActivity,
	removeSerie,
	clearFilter,
	filterItems,
} from '../../../store/actions';

const AllSeries = () => {
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

	const Series = useSelector((state) => state.Series);
	const { series, loading, error, msg, filtered } = Series;
	const Login = useSelector((state) => state.Login);
	const { user } = Login;
	const Folders = useSelector((state) => state.Folders);
	const { folders } = Folders;

	useEffect(() => {
		setCurrentData(
			series &&
				series
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.slice(offset, offset + pageLimit)
		);
	}, [offset, series]);

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

	const deleteSerie = (srs) => {
		dispatch(
			postActivity({
				logtype: 'warning',
				logcontent: `The post <strong>${srs.fmtitle}</strong> has been removed`,
				email: user ? user.email : '',
			})
		);
		dispatch(removeSerie(srs._id));
	};

	useEffect(() => {
		dispatch(getSeries());
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

	const viewButton = (srs) => {
		const getfolder =
			folders && srs && folders.filter((el) => el.id === srs.folderId && el);

		return srs.fmlink && getfolder[0] ? (
			<React.Fragment>
				<UncontrolledTooltip placement='top' target={`Visit-${srs.id}`}>
					View Item
				</UncontrolledTooltip>
				<a
					id={`Visit-${srs.id}`}
					href={`https://apollo.ferociousmediaweb.com/products/${getfolder[0].fmlink}/${srs.fmlink}`}
					className='btn waves-effect text-primary waves-light'
					style={{ fontSize: 30 }}
					target='_blank'
					rel='noopener noreferrer'
				>
					<i className='typcn typcn-eye-outline'></i>
				</a>
			</React.Fragment>
		) : null;
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
	}, [series]);

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
				<SeriesEditor isOpen={isOpen} toggle={setToggle} fmlink={currentItem} />
			)}
			<div className='container-fluid fm-cards'>
				<Row className='align-items-center'>
					<Col sm={6}>
						<div className='page-title-box'>
							<h1 className=''>Series</h1>
							<ol className='breadcrumb mb-0'>
								<li className='breadcrumb-item'>
									<Link to='/dashboard'>Dashboard</Link>
								</li>
								<li className='breadcrumb-item'>All Series</li>
							</ol>
						</div>
					</Col>
					<Col sm={6}>
						<div className='page-title-box'>
							<InputLabel htmlFor='outlined-adornment-search'>
								Find Series
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
							.map((srs) => (
								<Col key={srs._id} md={12}>
									<Card>
										<Row>
											<Col sm={12} md={3}>
												<img
													className='card-img-top img-fluid'
													src={
														srs.featuredimg
															? srs.featuredimg
															: 'uploads/big-placeholder.jpg'
													}
													alt={srs.fmtitle}
												/>
											</Col>
											<Col sm={12} md={9}>
												<CardBody>
													<div className='card-container'>
														<div className='card-status-area'>
															{srs.isLive ? (
																<span className='badge badge-success'>
																	Published
																</span>
															) : (
																<span className='badge badge-dark'>Draft</span>
															)}
														</div>
														<div className='card-content-area'>
															<h3 className='mt-0'>
																{srs.fmtitle ? srs.fmtitle : srs.title}
															</h3>
															{srs.fmsubtitle ? (
																<h5 className='card-title  mt-0'>
																	Subtitle: {srs.fmsubtitle}
																</h5>
															) : null}
															<p className='card-text'>
																Distec Title: {srs.title}
															</p>
														</div>
														<div className='card-actions-area'>
															<div className='buttons-only'>
																{viewButton(srs)}
																<UncontrolledTooltip
																	placement='top'
																	target={`EditTt-${srs.id}`}
																>
																	Edit
																</UncontrolledTooltip>
																<button
																	id={`EditTt-${srs.id}`}
																	type='button'
																	onClick={() => setToggle(srs.fmlink)}
																	className='btn waves-effect text-primary waves-light'
																	data-toggle='modal'
																	data-target='#myModal'
																	style={{ fontSize: 24 }}
																>
																	<i className='typcn typcn-edit'></i>
																</button>{' '}
																<UncontrolledTooltip
																	placement='top'
																	target={`RemoveFt-${srs.id}`}
																>
																	Remove
																</UncontrolledTooltip>
																<button
																	id={`RemoveFt-${srs.id}`}
																	type='button'
																	onClick={() => deleteSerie(srs)}
																	className='btn waves-effect ml-2 text-danger waves-light'
																	style={{ fontSize: 24 }}
																>
																	<i className='typcn typcn-trash'></i>
																</button>{' '}
															</div>
															<span>
																Last Modification:{' '}
																<Moment format='MMMM DD, YYYY'>
																	{srs.updatedAt}
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
								currentData.map((srs) => (
									<Col key={srs._id} md={12}>
										<Card>
											<Row>
												<Col sm={12} md={3}>
													<img
														className='card-img-top img-fluid'
														src={
															srs.featuredimg
																? srs.featuredimg
																: 'uploads/big-placeholder.jpg'
														}
														alt={srs.fmtitle}
													/>
												</Col>
												<Col sm={12} md={9}>
													<CardBody>
														<div className='card-container'>
															<div className='card-status-area'>
																{srs.isLive ? (
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
																	{srs.fmtitle ? srs.fmtitle : srs.title}
																</h3>
																{srs.fmsubtitle ? (
																	<h5 className='card-title  mt-0'>
																		Subtitle: {srs.fmsubtitle}
																	</h5>
																) : null}
																<p className='card-text'>
																	Distec Title: {srs.title}
																</p>
															</div>
															<div className='card-actions-area'>
																<div className='buttons-only'>
																	{viewButton(srs)}
																	<UncontrolledTooltip
																		placement='top'
																		target={`EditTt-${srs.id}`}
																	>
																		Edit
																	</UncontrolledTooltip>
																	<button
																		id={`EditTt-${srs.id}`}
																		type='button'
																		onClick={() => setToggle(srs.fmlink)}
																		className='btn waves-effect text-primary waves-light'
																		data-toggle='modal'
																		data-target='#myModal'
																		style={{ fontSize: 24 }}
																	>
																		<i className='typcn typcn-edit'></i>
																	</button>{' '}
																	<UncontrolledTooltip
																		placement='top'
																		target={`RemoveFt-${srs.id}`}
																	>
																		Remove
																	</UncontrolledTooltip>
																	<button
																		id={`RemoveFt-${srs.id}`}
																		type='button'
																		onClick={() => deleteSerie(srs)}
																		className='btn waves-effect ml-2 text-danger waves-light'
																		style={{ fontSize: 24 }}
																	>
																		<i className='typcn typcn-trash'></i>
																	</button>{' '}
																</div>
																<span>
																	Last Modification:{' '}
																	<Moment format='MMMM DD, YYYY'>
																		{srs.updatedAt}
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
								<h4>There is no series yet</h4>
							)}
						</Row>

						<Row>
							<Col sm={12}>
								{series && (
									<Paginator
										totalRecords={series.length}
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

export default AllSeries;
