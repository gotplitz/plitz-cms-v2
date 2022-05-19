import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

// Redux
import { gettingActivity } from '../../store/actions';

// Parts
import Loader from '../../components/Loader';

const Activity = () => {
	const dispatch = useDispatch();

	const [data, setData] = useState({
		columns: [
			{
				id: 1,
				label: 'Type',
				field: 'logtype',
				sort: 'asc',
				width: 30,
			},
			{
				id: 2,
				label: 'Details',
				field: 'logcontent',
				sort: 'asc',
				width: 470,
			},
			{
				id: 3,
				label: 'User',
				field: 'fullname',
				sort: 'asc',
				width: 200,
			},
			{
				id: 4,
				label: 'Date',
				field: 'createdAt',
				sort: 'asc',
				width: 170,
			},
		],
		rows: [],
	});
	const [rows, setRows] = useState([]);

	const Activity = useSelector((state) => state.Activity);
	const { activity, error, loading } = Activity;

	useEffect(() => {
		dispatch(gettingActivity());
	}, [dispatch]);

	useEffect(() => {
		if (activity && activity.length > 0) {
			setRows([]);
			activity &&
				activity
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.forEach((log) => {
						const date = new Date(log.createdAt);

						const [month, day, year] = [
							date.getMonth(),
							date.getDate(),
							date.getFullYear(),
						];
						const [hour, minutes] = [date.getHours(), date.getMinutes()];
						const finaltime = `${
							month > 10 ? month + 1 : '0' + (month + 1)
						} / ${day > 10 ? day : '0' + day} / ${year} at ${
							((hour + 11) % 12) + 1
						}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;

						setRows((rows) => [
							...rows,
							{
								id: `${log._id}`,
								logtype:
									log.logtype && log.logtype === 'positive' ? (
										<i className='typcn typcn-tick text-success'></i>
									) : log.logtype === 'negative' ? (
										<i className='typcn typcn-times text-danger'></i>
									) : (
										<i className='typcn typcn-warning text-warning'></i>
									),
								logcontent: (
									<div
										dangerouslySetInnerHTML={{ __html: log.logcontent }}
									></div>
								),
								fullname: log.fullname,
								createdAt: finaltime,
							},
						]);
					});
		}
	}, [activity]);

	useEffect(() => {
		if (rows && activity && rows.length === activity.length) {
			setData({ ...data, rows });
		}

		// eslint-disable-next-line
	}, [rows, activity]);

	return (
		<div className='container-fluid'>
			{loading ? <Loader /> : null}
			<Row className='align-items-center'>
				<Col sm={6}>
					<div className='page-title-box'>
						<h1 className=''>Activity Log</h1>
						<ol className='breadcrumb mb-0'>
							<li className='breadcrumb-item'>
								<Link to='/dashboard'>Dashboard</Link>
							</li>
							<li className='breadcrumb-item active'>Activity</li>
						</ol>
					</div>
				</Col>
			</Row>

			<div className='row'>
				<div className='col-12'>
					<div className='card'>
						<div className='card-body'>
							<p className='card-title-desc'>
								Keep an eye of the system and what all the users are doing. This
								activity log can help you find anything you or other users did.
							</p>

							{error ? (
								<h4>{error}</h4>
							) : (
								<MDBDataTable responsive bordered data={data} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Activity;
