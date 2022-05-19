import React, { useEffect, useState } from 'react';
// import SettingMenu from '../Shared/SettingMenu';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';

// Charts
import Salesdonut from '../AllCharts/apex/salesdonut';
import {
	getBlogposts,
	getCategories,
	getFolders,
	getPages,
	getPreviews,
	getSeries,
	gettingActivity,
	requestUser,
} from '../../store/actions';

// Parts
import Loader from '../../components/Loader';

const Dashboard = () => {
	const dispatch = useDispatch();

	const [firstDay, setFirstDay] = useState(new Date());
	const [lastDay, setLastDay] = useState(new Date());
	const [monthFolders, setMonthFolders] = useState([]);
	const [monthSeries, setMonthSeries] = useState([]);
	const [monthCategories, setMonthCategories] = useState([]);
	const [monthProducts, setMonthProducts] = useState([]);
	const [monthPages, setMonthPages] = useState([]);
	const [monthBlogposts, setMonthBlogposts] = useState([]);
	const [theTotal, setTheTotal] = useState(0);
	const [monthFoldersPer, setMonthFoldersPer] = useState([]);
	const [monthSeriesPer, setMonthSeriesPer] = useState([]);
	const [monthCategoriesPer, setMonthCategoriesPer] = useState([]);
	const [monthProductsPer, setMonthProductsPer] = useState([]);
	const [monthPagesPer, setMonthPagesPer] = useState([]);
	const [monthBlogpostsPer, setMonthBlogpostsPer] = useState([]);

	const Login = useSelector((state) => state.Login);
	const { user, isAuthenticated } = Login;
	const Activity = useSelector((state) => state.Activity);
	const { activity, loading, error } = Activity;
	const Folders = useSelector((state) => state.Folders);
	const { folders } = Folders;
	const Series = useSelector((state) => state.Series);
	const { series } = Series;
	const Categories = useSelector((state) => state.Categories);
	const { categories } = Categories;
	const Products = useSelector((state) => state.Products);
	const { previews } = Products;
	const Pages = useSelector((state) => state.Pages);
	const { pages } = Pages;
	const Blogposts = useSelector((state) => state.Blogposts);
	const { blogposts } = Blogposts;

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(requestUser());
			dispatch(gettingActivity());
			dispatch(getFolders());
			dispatch(getSeries());
			dispatch(getCategories());
			dispatch(getPreviews());
			dispatch(getPages());
			dispatch(getBlogposts());
		}
	}, [dispatch, isAuthenticated]);

	useEffect(() => {
		const TodayDate = new Date();

		setFirstDay(new Date(TodayDate.getFullYear(), TodayDate.getMonth(), 1));
		setLastDay(new Date(TodayDate.getFullYear(), TodayDate.getMonth() + 1, 0));
	}, []);

	useEffect(() => {
		setMonthFolders([]);

		var filteredFolders = [];
		var filteredSeries = [];
		var filteredCategories = [];
		var filteredProducts = [];
		var filteredPages = [];
		var filteredBlogposts = [];

		folders.forEach((a) => {
			let dateEl = new Date(a.updatedAt);
			if (dateEl.getMonth() === firstDay.getMonth()) {
				filteredFolders.push(a);
			}
		});

		series.forEach((b) => {
			let dateEl = new Date(b.updatedAt);
			if (dateEl.getMonth() === firstDay.getMonth()) {
				filteredSeries.push(b);
			}
		});

		categories.forEach((c) => {
			let dateEl = new Date(c.updatedAt);
			if (dateEl.getMonth() === firstDay.getMonth()) {
				filteredCategories.push(c);
			}
		});

		previews.forEach((d) => {
			let dataEl = new Date(d.updatedAt);
			if (dataEl.getMonth() === firstDay.getMonth()) {
				filteredProducts.push(d);
			}
		});

		pages.forEach((e) => {
			let dataEl = new Date(e.updatedAt);
			if (dataEl.getMonth() === firstDay.getMonth()) {
				filteredPages.push(e);
			}
		});

		blogposts.forEach((f) => {
			let dataEl = new Date(f.updatedAt);
			if (dataEl.getMonth() === firstDay.getMonth()) {
				filteredBlogposts.push(f);
			}
		});

		setTheTotal(
			filteredFolders.length +
				filteredSeries.length +
				filteredCategories.length +
				filteredProducts.length +
				filteredPages.length +
				filteredBlogposts.length
		);

		setMonthFolders(filteredFolders);
		setMonthSeries(filteredSeries);
		setMonthCategories(filteredCategories);
		setMonthProducts(filteredProducts);
		setMonthPages(filteredPages);
		setMonthBlogposts(filteredBlogposts);
	}, [
		firstDay,
		lastDay,
		folders,
		series,
		categories,
		previews,
		pages,
		blogposts,
	]);

	useEffect(() => {
		const FinalResults = () => {
			setMonthFoldersPer((monthFolders.length * 100) / theTotal);
			setMonthSeriesPer((monthSeries.length * 100) / theTotal);
			setMonthCategoriesPer((monthCategories.length * 100) / theTotal);
			setMonthProductsPer((monthProducts.length * 100) / theTotal);
			setMonthPagesPer((monthPages.length * 100) / theTotal);
			setMonthBlogpostsPer((monthBlogposts.length * 100) / theTotal);
		};

		return FinalResults();
	}, [
		monthFolders,
		monthSeries,
		monthCategories,
		monthProducts,
		monthPages,
		monthBlogposts,
		theTotal,
	]);

	return (
		<React.Fragment>
			<div className='container-fluid'>
				<Row className='align-items-center'>
					<Col sm={6}>
						<div className='page-title-box'>
							<h4 className='font-size-18'>Dashboard</h4>
							<ol className='breadcrumb mb-0'>
								<li className='breadcrumb-item active'>
									Hi <strong>{user && user.fullname},</strong>
									<br />
									<span>Welcome to Ferocious Media Dashboard</span>
								</li>
							</ol>
						</div>
					</Col>
				</Row>

				<Row>
					<Col xl={3} md={6}>
						<Card className='mini-stat bg-primary text-white'>
							<CardBody>
								<div className='mb-4'>
									<div className='float-left mini-stat-img mr-4'>
										<i
											className='far fa-folder-open'
											style={{ fontSize: 30 }}
										></i>
									</div>
									<h5 className='font-size-16 text-uppercase mt-0 text-white-50'>
										Folders
									</h5>
									<h4 className='font-weight-medium font-size-24'>
										{folders && folders.length}
									</h4>
								</div>
								<div className='pt-2'>
									<Link
										to='all-folders'
										className='text-white-50 fm-flex-align'
									>
										<p className='text-white-50 mb-0 mt-1'>Go To Folders</p>
										<div className='float-right'>
											<i className='mdi mdi-arrow-right h5'></i>
										</div>
									</Link>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col xl={3} md={6}>
						<Card className='mini-stat bg-primary text-white'>
							<CardBody>
								<div className='mb-4'>
									<div className='float-left mini-stat-img mr-4'>
										<i className='fas fa-list-alt' style={{ fontSize: 30 }}></i>
									</div>
									<h5 className='font-size-16 text-uppercase mt-0 text-white-50'>
										Series
									</h5>
									<h4 className='font-weight-medium font-size-24'>
										{series && series.length}
									</h4>
								</div>
								<div className='pt-2'>
									<Link to='all-series' className='text-white-50 fm-flex-align'>
										<p className='text-white-50 mb-0 mt-1'>Go To Series</p>
										<div className='float-right'>
											<i className='mdi mdi-arrow-right h5'></i>
										</div>
									</Link>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col xl={3} md={6}>
						<Card className='mini-stat bg-primary text-white'>
							<CardBody>
								<div className='mb-4'>
									<div className='float-left mini-stat-img mr-4'>
										<i className='fas fa-list-ul' style={{ fontSize: 30 }}></i>
									</div>
									<h5 className='font-size-16 text-uppercase mt-0 text-white-50'>
										Categories
									</h5>
									<h4 className='font-weight-medium font-size-24'>
										{categories && categories.length}
									</h4>
								</div>
								<div className='pt-2'>
									<Link
										to='all-categories'
										className='text-white-50 fm-flex-align'
									>
										<p className='text-white-50 mb-0 mt-1'>Go To Categories</p>
										<div className='float-right'>
											<i className='mdi mdi-arrow-right h5'></i>
										</div>
									</Link>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col xl={3} md={6}>
						<Card className='mini-stat bg-primary text-white'>
							<CardBody>
								<div className='mb-4'>
									<div className='float-left mini-stat-img mr-4'>
										<i className='fas fa-file-alt' style={{ fontSize: 30 }}></i>
									</div>
									<h5 className='font-size-16 text-uppercase mt-0 text-white-50'>
										Products
									</h5>
									<h4 className='font-weight-medium font-size-24'>
										{previews && previews.length}
									</h4>
								</div>
								<div className='pt-2'>
									<Link
										to='all-products'
										className='text-white-50 fm-flex-align'
									>
										<p className='text-white-50 mb-0 mt-1'>Go To Products</p>
										<div className='float-right'>
											<i className='mdi mdi-arrow-right h5'></i>
										</div>
									</Link>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>

				<Row>
					<Col xl={3}>
						{Folders.loading || Series.loading || Categories.loading ? (
							<Loader />
						) : (
							<Card>
								<CardBody>
									<h4 className='card-title mb-4'>Content Work Report</h4>
									<div className='cleafix'>
										<p className='float-left'>
											<i className='mdi mdi-calendar mr-1 text-primary'></i>
											<Moment format='MMM DD'>{firstDay}</Moment> -{' '}
											<Moment format='MMM DD'>{lastDay}</Moment>
										</p>
										<h6 className='text-right'>Current Month</h6>
									</div>
									<div id='ct-donut' className='ct-chart wid pt-4'>
										<Salesdonut
											folders={monthFoldersPer}
											series={monthSeriesPer}
											categories={monthCategoriesPer}
											products={monthProductsPer}
											pages={monthPagesPer}
											blogposts={monthBlogpostsPer}
										/>
									</div>
									<div className='mt-4'>
										<table className='table mb-0'>
											<tbody>
												<tr>
													<td>
														<span className='badge badge-primary pl-2 pr-2 pt-1'>
															{monthPages.length}
														</span>
													</td>
													<td>Pages</td>
													<td className='text-right'>
														{parseFloat(monthPagesPer).toFixed(2)}%
													</td>
												</tr>
												<tr>
													<td>
														<span className='badge badge-primary pl-2 pr-2 pt-1'>
															{monthBlogposts.length}
														</span>
													</td>
													<td>Blog Posts</td>
													<td className='text-right'>
														{parseFloat(monthBlogpostsPer).toFixed(2)}%
													</td>
												</tr>
												<tr>
													<td>
														<span className='badge badge-primary pl-2 pr-2 pt-1'>
															{monthFolders.length}
														</span>
													</td>
													<td>Folders</td>
													<td className='text-right'>
														{parseFloat(monthFoldersPer).toFixed(2)}%
													</td>
												</tr>
												<tr>
													<td>
														<span className='badge badge-primary pl-2 pr-2 pt-1'>
															{monthSeries.length}
														</span>
													</td>
													<td>Series</td>
													<td className='text-right'>
														{parseFloat(monthSeriesPer).toFixed(2)}%
													</td>
												</tr>
												<tr>
													<td>
														<span className='badge badge-primary pl-2 pr-2 pt-1'>
															{monthCategories.length}
														</span>
													</td>
													<td>Categories</td>
													<td className='text-right'>
														{parseFloat(monthCategoriesPer).toFixed(2)}%
													</td>
												</tr>
												<tr>
													<td>
														<span className='badge badge-primary pl-2 pr-2 pt-1'>
															{monthProducts.length}
														</span>
													</td>
													<td>Products</td>
													<td className='text-right'>
														{parseFloat(monthProductsPer).toFixed(2)}%
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</CardBody>
							</Card>
						)}
					</Col>
					<Col xl={4}>
						<Card>
							{loading ? (
								<Loader />
							) : error ? (
								<h4>{error}</h4>
							) : (
								<CardBody>
									<h4 className='card-title mb-4'>Activity</h4>
									<ol className='activity-feed'>
										{activity &&
											activity
												.sort(
													(a, b) =>
														new Date(b.createdAt) - new Date(a.createdAt)
												)
												.slice(0, 5)
												.map((act) => (
													<li key={act._id} className='feed-item'>
														<div className='feed-item-list'>
															<span className='date'>
																<Moment format='MMMM DD, YY'>
																	{act.createdAt}
																</Moment>{' '}
																{act.logtype === 'positive' ? (
																	<i className='typcn typcn-tick text-success'></i>
																) : act.logtype === 'negative' ? (
																	<i className='typcn typcn-times text-danger'></i>
																) : (
																	<i className='typcn typcn-warning text-warning'></i>
																)}
															</span>
															<span
																className='activity-text'
																dangerouslySetInnerHTML={{
																	__html: act.logcontent,
																}}
															></span>
															<br />
															<small className='activity-text'>
																User: <strong>{act.fullname}</strong>
															</small>
														</div>
													</li>
												))}
									</ol>
									<div className='text-center'>
										<Link to='/activity' className='btn btn-primary'>
											All Activity
										</Link>
									</div>
								</CardBody>
							)}
						</Card>
					</Col>

					<Col xl={5}>
						<Row>
							<Col md={6}>
								{Login.loading ? (
									<Loader />
								) : (
									<Card className='text-center'>
										<CardBody>
											<div className='py-4'>
												<div className='rounded-circle mb-2'>
													<img
														src={user && user.photo}
														alt={user && user.fullname}
														className='rounded-circle avatar-xl'
													/>
												</div>
												<small className='mt-4'>You are logged-in as</small>
												<h5 className='text-primary'>
													{user && user.fullname}
												</h5>
												<p className='text-muted'>{user && user.email}</p>
											</div>
										</CardBody>
									</Card>
								)}
							</Col>
							<Col md={6}>
								<Card className='bg-primary'>
									<CardBody>
										<div className='text-center text-white py-4'>
											<h5 className='mt-0 mb-4 text-white-50 font-size-16'>
												System Overview
											</h5>
											<p className='font-size-14 pt-1'>
												NodeJS 16.13.0 and React 17
											</p>
											<p className='text-white-50'>
												CMS Version: <br /> 2.0.1
											</p>
											<p className='text-white-50'>
												Last Major Update
												<br />
												Feb 27, 2022
											</p>
										</div>
									</CardBody>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<Card>
									<CardBody>
										<h4 className='card-title mb-4'>
											For support visit our website
										</h4>
										<p className='text-muted mb-3 pb-4'>
											Ferocious Media is the dedicated digital arm of
											Connoisseur Media and is comprised of award-winning
											industry leaders whose track records speak for themselves.
											Our highly customized digital marketing solutions are
											built and executed using our experience and today's
											cutting edge tools, all while keeping your company's
											vision in mind.
										</p>
										<div className='mt-2'>
											<a
												href='https://ferociousmedia.com'
												target='_blank'
												rel='noopener noreferrer'
												className='text-primary fm-flex-align'
											>
												<h6 className='mb-0'>
													{' '}
													<img
														src='uploads/user-place-holder.jpg'
														alt='Ferocious Media Lion logo'
														className='avatar-sm rounded-circle mr-2'
													/>{' '}
													Ferocious Media
												</h6>
												<i className='mdi mdi-arrow-right'></i>
											</a>
										</div>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</React.Fragment>
	);
};

export default Dashboard;
