import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from 'reactstrap';

// Redux
import { gettingActivity } from '../store/actions';

// Parts
import SimpleBar from 'simplebar-react';
import Moment from 'react-moment';
import Loader from './Loader';

const NotificationDropdown = () => {
	const dispatch = useDispatch();

	const [menu, setMenu] = useState(false);

	const Activity = useSelector((state) => state.Activity);
	const { activity, error, loading } = Activity;

	useEffect(() => {
		dispatch(gettingActivity());
	}, [dispatch]);

	const toggle = () => {
		if (menu) {
			setMenu(false);
		} else {
			setMenu(true);
		}
	};

	return (
		<React.Fragment>
			<Dropdown
				isOpen={menu}
				toggle={toggle}
				className='dropdown d-inline-block'
				tag='li'
			>
				<DropdownToggle
					className='btn header-item noti-icon waves-effect'
					id='page-header-notifications-dropdown'
					tag='button'
				>
					<i className='mdi mdi-clipboard-pulse-outline'></i>
					{/* <span className='badge badge-danger badge-pill'>
						{activity && activity.length}
					</span> */}
				</DropdownToggle>

				<DropdownMenu className='dropdown-menu-lg p-0' right>
					<div className='p-3'>
						<Row className='align-items-center'>
							<Col>
								<h5 className='m-0 font-size-16'>Activity Log</h5>
							</Col>
						</Row>
					</div>
					{loading ? (
						<Loader />
					) : error ? (
						<h6>There was an error loading the latest activiy</h6>
					) : (
						<SimpleBar style={{ height: '230px' }}>
							{activity &&
								activity.length > 0 &&
								activity
									.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
									.slice(0, 10)
									.map((log) => (
										<div key={log._id} className='text-reset notification-item'>
											<div className='media'>
												<div
													className='avatar-sm mr-3'
													style={{ width: 40, height: 40 }}
												>
													<span
														className={`avatar-title ${
															log.logtype === 'positive'
																? `bg-success`
																: log.logtype === 'warning'
																? 'bg-warning'
																: 'bg-danger'
														} rounded-circle`}
													>
														<i
															className={`mdi ${
																log.logtype === 'positive'
																	? `mdi-thumb-up`
																	: log.logtype === 'warning'
																	? 'mdi-alert'
																	: 'mdi-thumb-down'
															}`}
														></i>
													</span>
												</div>
												<div className='media-body'>
													<h6
														className='mt-0 mb-1'
														dangerouslySetInnerHTML={{ __html: log.logcontent }}
													></h6>
													<div className='font-size-12 text-muted'>
														<p className='mb-1'>
															User: <strong>{log.fullname}</strong>
														</p>
														<p className='mb-1'>
															Date:{' '}
															<strong>
																<Moment format='MM/DD/YY hh:mm a'>
																	{log.createdAt}
																</Moment>
															</strong>
														</p>
													</div>
												</div>
											</div>
										</div>
									))}
						</SimpleBar>
					)}
					<div className='p-2 border-top'>
						<Link
							className='btn btn-sm btn-link font-size-14 btn-block text-center'
							to='/activity'
						>
							{' '}
							View all{' '}
						</Link>
					</div>
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	);
};
export default NotificationDropdown;
