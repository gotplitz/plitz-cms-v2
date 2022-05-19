import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';

// Redux
import { Link, useHistory } from 'react-router-dom';

// actions
import { postActivity, tryLogin } from '../../store/actions';

// Parts
import AuthFooter from '../../components/AuthFooter';
import Loader from '../../components/Loader';
import AuthHeader from '../../components/AuthHeader';

const Login = ({ location }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [vali, setVali] = useState(false);
	const [showError, setShowError] = useState(false);

	const { email, password } = formData;

	const userLogin = useSelector((state) => state.Login);
	const { loading, error, isAuthenticated } = userLogin;

	const redirect = location.search
		? location.search.split('=')[1]
		: '/dashboard';

	const onChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// handleValidSubmit
	const handleValidSubmit = (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			setVali(true);
		} else {
			setVali(false);
			dispatch(tryLogin(formData));
			dispatch(
				postActivity({
					logtype: 'positive',
					logcontent: `User logged-in successfully`,
					email: formData.email ? formData.email : '',
				})
			);
		}
	};

	useEffect(() => {
		if (error) {
			setShowError(true);
		}

		// eslint-disable-next-line
	}, [error]);

	useEffect(() => {
		if (showError) {
			setTimeout(() => {
				setShowError(false);
			}, 7000);
		}
		// eslint-disable-next-line
	}, [showError]);

	useEffect(() => {
		if (isAuthenticated) {
			history.push(redirect);
		}

		// eslint-disable-next-line
	}, [isAuthenticated, redirect]);

	return (
		<React.Fragment>
			<div className='account-pages pt-5'>
				<div className='container'>
					<Row className='justify-content-center'>
						<Col md={8} lg={6} xl={5}>
							<div className='position-relative'>
								{loading ? <Loader /> : null}

								<Card className='overflow-hidden'>
									<AuthHeader
										title='Welcome Back!'
										intro='Sign in to Ferocious CMS'
									/>

									<CardBody className='p-4'>
										<div className='p-3'>
											<form
												className='form-horizontal mt-5'
												onSubmit={(e) => handleValidSubmit(e)}
											>
												{error && showError ? (
													<Alert color='danger'>{error}</Alert>
												) : null}

												<div className='form-group'>
													<TextField
														error={vali}
														helperText={vali ? 'This field is required' : null}
														fullWidth
														variant='outlined'
														name='email'
														label='Email'
														value={email}
														placeholder='Enter email'
														type='email'
														autoComplete='email'
														onChange={(e) => onChange(e)}
													/>
												</div>
												<div className='form-group'>
													<TextField
														error={vali}
														helperText={vali ? 'This field is required' : null}
														fullWidth
														variant='outlined'
														name='password'
														label='Password'
														type='password'
														value={password}
														placeholder='Enter Password'
														autoComplete='current-password'
														onChange={(e) => onChange(e)}
													/>
												</div>

												<Row className='form-group'>
													<Col sm={12} className='text-right'>
														<button
															className='btn btn-primary w-md waves-effect waves-light'
															type='submit'
														>
															Log In
														</button>
													</Col>
												</Row>
												<Row className='form-group mt-2 mb-0'>
													<div className='col-12 mt-4'>
														<Link to='/forget-password'>
															<i className='mdi mdi-lock'></i> Forgot your
															password?
														</Link>
													</div>
												</Row>
											</form>
										</div>
									</CardBody>
								</Card>
							</div>
						</Col>
					</Row>
				</div>
				<AuthFooter
					text={`Don't have an account? `}
					button={`pages-register`}
					buttonlabel={`Request Access`}
				/>
			</div>
		</React.Fragment>
	);
};

export default Login;
