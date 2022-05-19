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
import BlogpostsEditor from '../../components/BlogpostsComp/BlogpostsEditor';
import Loader from '../../components/Loader';

// Actions
import {
	clearCurrent,
	getBlogposts,
	postActivity,
	removeBlogpost,
} from '../../store/actions';

const AllBlogposts = () => {
	const dispatch = useDispatch();

	const blogpostLimit = 10;

	const [offset, setOffset] = useState(0);
	const [currentBlogpost, setCurrentBlogpost] = useState(1);
	const [currentData, setCurrentData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState('');

	const Blogposts = useSelector((state) => state.Blogposts);
	const { blogposts, loading, error, msg } = Blogposts;
	const Login = useSelector((state) => state.Login);
	const { user } = Login;

	useEffect(() => {
		setCurrentData(
			blogposts &&
				blogposts
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.slice(offset, offset + blogpostLimit)
		);
	}, [offset, blogposts]);

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

	const deleteBlogpost = (pg) => {
		dispatch(
			postActivity({
				logtype: 'warning',
				logcontent: `The blogpost <strong>${pg.fmtitle}</strong> has been removed`,
				email: user ? user.email : '',
			})
		);
		dispatch(removeBlogpost(pg._id));
	};

	useEffect(() => {
		dispatch(getBlogposts());
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
				<BlogpostsEditor
					isOpen={isOpen}
					toggle={setToggle}
					fmlink={currentItem}
				/>
			)}
			<div className='container-fluid fm-cards'>
				<Row className='align-items-center'>
					<Col sm={6}>
						<div className='page-title-box'>
							<h1 className=''>Blog</h1>
							<ol className='breadcrumb mb-0'>
								<li className='breadcrumb-item'>
									<Link to='/dashboard'>Dashboard</Link>
								</li>
								<li className='breadcrumb-item'>All Blog Posts</li>
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
							.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
															<h3 className='mt-0'>{pg.fmtitle}</h3>
															<div className='card-extra-info'>
																{pg.seotitle ? (
																	<h5 className='card-title  mt-0'>
																		SEO Title Tag: {pg.seotitle}
																	</h5>
																) : null}
																<div className='author-section'>
																	<small>Created by</small>
																	<h6 className='mb-0'>
																		{' '}
																		<img
																			src={pg.photo}
																			alt={pg.fullname}
																			className='avatar-sm rounded-circle mr-2'
																		/>{' '}
																		{pg.fullname}
																	</h6>
																</div>
																<div className='categories'>
																	{pg.fmcategory.map((cat, index) => (
																		<span
																			key={index}
																			className='badge badge-pill badge-info'
																		>
																			{cat}
																		</span>
																	))}
																</div>
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
																	onClick={() => deleteBlogpost(pg)}
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
						<h4>There is no blog posts yet</h4>
					)}
				</Row>

				<Row>
					<Col sm={12}>
						{blogposts && (
							<Paginator
								totalRecords={blogposts.length}
								pageLimit={blogpostLimit}
								pageNeighbours={2}
								setOffset={setOffset}
								currentPage={currentBlogpost}
								setCurrentPage={setCurrentBlogpost}
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

export default AllBlogposts;
