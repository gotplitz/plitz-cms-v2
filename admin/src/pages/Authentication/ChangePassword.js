import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';

// Redux
import { Link, useHistory } from 'react-router-dom';

// actions
import { newPassword, postActivity } from '../../store/actions';

// Parts
import AuthFooter from '../../components/AuthFooter';
import Loader from '../../components/Loader';
import AuthHeader from '../../components/AuthHeader';

const ChangePassword = ({ location }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		token: null,
		password: '',
	});
	const [password2, setPassword2] = useState('');
	const [vali, setVali] = useState(false);
	const [warning, setWarning] = useState('');
	const [whatType, setWhatType] = useState('password');
	const [currenIcon, setCurrentIcon] = useState('mdi-eye');
	const [showError, setShowError] = useState(false);

	const { password } = formData;

	const userLogin = useSelector((state) => state.Login);
	const { loading, error, isAuthenticated, user } = userLogin;

	const onChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const changeType = (e) => {
		e.preventDefault();
		if (whatType === 'password') {
			setCurrentIcon('mdi-eye-off');
			setWhatType('text');
		} else {
			setCurrentIcon('mdi-eye');
			setWhatType('password');
		}
	};

	const secPassword = (e) => {
		e.preventDefault();
		setPassword2(e.target.value);
	};

	useEffect(() => {
		if (error) {
			setShowError(true);
			dispatch(
				postActivity({
					logtype: 'negative',
					logcontent: `The following error traying to change the password: <strong>${error}</strong>`,
					email: '',
				})
			);
			setTimeout(() => {
				setShowError(false);
			}, 6000);
		}

		// eslint-disable-next-line
	}, [error]);

	useEffect(() => {
		const extraction = location.search.split('=')[1];

		setFormData({ ...formData, token: extraction });

		// eslint-disable-next-line
	}, [location]);

	// handleValidSubmit
	const handleValidSubmit = (e) => {
		e.preventDefault();
		if (password === '' || password2 === '') {
			setVali(true);
		} else if (password !== password2) {
			setWarning(`Passwords don't match`);
		} else {
			setVali(false);
			dispatch(newPassword(formData));
			dispatch(
				postActivity({
					logtype: 'positive',
					logcontent: `The user changed the password successfully`,
					email: user ? user.email : '',
				})
			);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			history.push('/dashboard');
		}

		// eslint-disable-next-line
	}, [isAuthenticated]);

	return (
		<React.Fragment>
			<div className='account-pages change-password pt-5'>
				<div className='container'>
					<Row className='justify-content-center'>
						<Col md={8} lg={6} xl={5}>
							<div className='position-relative'>
								{loading ? <Loader /> : null}

								<Card className='overflow-hidden'>
									<AuthHeader
										title='Change Your Password'
										intro='Thank you for verifying your email. Please type a new password'
									/>

									<CardBody className='p-4'>
										<div className='p-3'>
											<form
												className='form-horizontal mt-5'
												onSubmit={(e) => handleValidSubmit(e)}
											>
												{showError ? (
													<Alert
														color='danger'
														style={{
															marginTop: '13px',
														}}
													>
														{error}
													</Alert>
												) : null}
												{warning !== '' ? (
													<Alert color='warning'>{warning}</Alert>
												) : null}

												<div
													className='form-group'
													style={{
														position: 'relative',
													}}
												>
													<TextField
														error={vali}
														helperText={vali ? 'This field is required' : null}
														fullWidth
														variant='outlined'
														name='password'
														label='Password'
														type={whatType}
														value={password}
														placeholder='Enter Password'
														autoComplete='new-password'
														onChange={(e) => onChange(e)}
														tabIndex='1'
													/>
													<button
														className='button-reveal-password'
														onClick={changeType}
														tabIndex='3'
													>
														<i className={`mdi ${currenIcon}`}></i>
													</button>
												</div>

												<div
													className='form-group'
													style={{
														position: 'relative',
													}}
												>
													<TextField
														error={vali}
														helperText={vali ? 'This field is required' : null}
														fullWidth
														variant='outlined'
														name='password2'
														label='Verify Password'
														type={whatType}
														value={password2}
														placeholder='Verify Password'
														autoComplete='new-password'
														onChange={(e) => secPassword(e)}
														tabIndex='2'
													/>
													<button
														className='button-reveal-password'
														onClick={changeType}
														tabIndex='4'
													>
														<i className={`mdi ${currenIcon}`}></i>
													</button>
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
					text={`Go back to `}
					button={`pages-login`}
					buttonlabel={`Login`}
				/>
			</div>
		</React.Fragment>
	);
};

export default ChangePassword;
