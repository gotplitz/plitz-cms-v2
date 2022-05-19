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
import NoticiasEditor from '../../components/NoticiasComp/NoticiasEditor';
import Loader from '../../components/Loader';

// Actions
import {
	clearCurrent,
	getNoticias,
	postActivity,
	removeNoticia,
} from '../../store/actions';

const AllNoticias = () => {
	const dispatch = useDispatch();

	const noticiaLimit = 10;

	const [offset, setOffset] = useState(0);
	const [currentNoticia, setCurrentNoticia] = useState(1);
	const [currentData, setCurrentData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState('');

	const Noticias = useSelector((state) => state.Noticias);
	const { noticias, loading, error, msg } = Noticias;
	const Login = useSelector((state) => state.Login);
	const { user } = Login;

	useEffect(() => {
		setCurrentData(
			noticias &&
				noticias
					.sort((a, b) => (new Date(a.crDate) < new Date(b.crDate) ? 1 : -1))
					.slice(offset, offset + noticiaLimit)
		);
	}, [offset, noticias]);

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

	const deleteNoticia = (pg) => {
		dispatch(
			postActivity({
				logtype: 'warning',
				logcontent: `The noticia <strong>${pg.fmtitle}</strong> has been removed`,
				email: user ? user.email : '',
			})
		);
		dispatch(removeNoticia(pg._id));
	};

	useEffect(() => {
		dispatch(getNoticias());
	}, [dispatch]);

	const viewButton = (pg) => {
		return (
			<React.Fragment>
				<UncontrolledTooltip placement='top' target={`Visit-${pg.id}`}>
					View Item
				</UncontrolledTooltip>
				<a
					id={`Visit-${pg.id}`}
					href={`https://apollo.ferociousmediaweb.com/${pg.fmlink}`}
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
				<NoticiasEditor
					isOpen={isOpen}
					toggle={setToggle}
					fmlink={currentItem}
				/>
			)}
			<div className='container-fluid fm-cards'>
				<Row className='align-items-center'>
					<Col sm={6}>
						<div className='page-title-box'>
							<h1 className=''>News</h1>
							<ol className='breadcrumb mb-0'>
								<li className='breadcrumb-item'>
									<Link to='/dashboard'>Dashboard</Link>
								</li>
								<li className='breadcrumb-item'>All News Items</li>
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
						currentData
							.sort((a, b) =>
								new Date(a.crDate) < new Date(b.crDate) ? 1 : -1
							)
							.map((pg) => (
								<Col key={pg._id} md={12}>
									<Card>
										<Row>
											<Col sm={12} md={3}>
												<img
													className='card-img-top img-fluid'
													src={
														pg.featuredimg
															? pg.featuredimg
															: 'uploads/big-placeholder.jpg'
													}
													alt={pg.fmtitle}
												/>
											</Col>
											<Col sm={12} md={9}>
												<CardBody>
													<div className='card-container'>
														<div className='card-status-area'>
															{pg.isLive ? (
																<span className='badge badge-success'>
																	Published
																</span>
															) : (
																<span className='badge badge-dark'>Draft</span>
															)}
														</div>
														<div className='card-content-area'>
															<h3 className='mt-0'>
																{pg.fmtitle.replace(
																	/Distec/g,
																	'Apollo Display Techonologies'
																)}
															</h3>
															<div className='card-extra-info'>
																{pg.seotitle ? (
																	<h5 className='card-title  mt-0'>
																		SEO Title Tag:{' '}
																		{pg.seotitle.replace(
																			/Distec/g,
																			'Apollo Display Techonologies'
																		)}
																	</h5>
																) : null}
																<div className='author-section'>
																	<small>Distec Date</small>
																	<h6 className='mb-0'>
																		<Moment format='MMMM DD, YYYY'>
																			{pg.crDate}
																		</Moment>
																	</h6>
																</div>
																{pg.altTitle !== null && pg.altTitle !== '' && (
																	<div className='author-section'>
																		<small>Subtitle</small>
																		<h6 className='mb-0'>{pg.altTitle}</h6>
																	</div>
																)}
															</div>
														</div>
														<div className='card-actions-area'>
															<div className='buttons-only'>
																{viewButton(pg)}
																<UncontrolledTooltip
																	placement='top'
																	target={`EditTt-${pg._id}`}
																>
																	Edit
																</UncontrolledTooltip>
																<button
																	id={`EditTt-${pg._id}`}
																	type='button'
																	onClick={() => setToggle(pg.fmlink)}
																	className='btn waves-effect text-primary waves-light'
																	data-toggle='modal'
																	data-target='#myModal'
																	style={{ fontSize: 24 }}
																>
																	<i className='typcn typcn-edit'></i>
																</button>{' '}
																<UncontrolledTooltip
																	placement='top'
																	target={`RemoveFt-${pg._id}`}
																>
																	Remove
																</UncontrolledTooltip>
																<button
																	id={`RemoveFt-${pg._id}`}
																	type='button'
																	onClick={() => deleteNoticia(pg)}
																	className='btn waves-effect ml-2 text-danger waves-light'
																	style={{ fontSize: 24 }}
																>
																	<i className='typcn typcn-trash'></i>
																</button>{' '}
															</div>
															<span>
																Last Modification:{' '}
																<Moment format='MMMM DD, YYYY'>
																	{pg.updatedAt}
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
						<h4>There is no news items yet</h4>
					)}
				</Row>

				<Row>
					<Col sm={12}>
						{noticias && (
							<Paginator
								totalRecords={noticias.length}
								pageLimit={noticiaLimit}
								pageNeighbours={2}
								setOffset={setOffset}
								currentPage={currentNoticia}
								setCurrentPage={setCurrentNoticia}
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

export default AllNoticias;
