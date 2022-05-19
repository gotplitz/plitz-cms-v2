import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Alert } from 'reactstrap';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { Link } from 'react-router-dom';

// Parts
import AuthFooter from '../../components/AuthFooter';
import AuthHeader from '../../components/AuthHeader';
import Loader from '../../components/Loader';

// Actions
import { passwordChange, postActivity } from '../../store/actions';

const ForgetPasswordPage = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [vali, setVali] = useState(false);
	const [showError, setShowError] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const Login = useSelector((state) => state.Login);
	const { loading, error, msg } = Login;

	const onChange = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
	};

	useEffect(() => {
		if (error) {
			setShowError(true);
			dispatch(
				postActivity({
					logtype: 'negative',
					logcontent: `The following error happened when a forgot-password action was submitted: <strong>${error}</strong>`,
					email: '',
				})
			);
			setTimeout(() => {
				setShowError(false);
			}, 6000);
		}

		if (msg) {
			setShowSuccess(true);
			setTimeout(() => {
				setShowSuccess(false);
			}, 8000);
		}

		// eslint-disable-next-line
	}, [error, msg]);

	// handleValidSubmit
	const handleValidSubmit = (e) => {
		e.preventDefault();
		if (email === '') {
			setVali(true);
		} else {
			setVali(false);
			dispatch(passwordChange(email));
			dispatch(
				postActivity({
					logtype: 'warning',
					logcontent: `The user requested a change of password`,
					email: email,
				})
			);
		}
	};

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
										title='Forgot Password'
										intro='Enter your email below and we would send a link to reset your password.'
									/>

									<CardBody className='p-4'>
										<div className='p-3'>
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
											{showSuccess ? (
												<Alert
													color='success'
													style={{
														marginTop: '13px',
													}}
												>
													{msg}
												</Alert>
											) : null}

											<form
												className='form-horizontal mt-5'
												onSubmit={(e) => handleValidSubmit(e)}
											>
												<div className='form-group'>
													<TextField
														error={vali}
														helperText={vali ? 'This field is required' : null}
														fullWidth
														variant='outlined'
														name='email'
														value={email}
														label='Email'
														type='email'
														onChange={(e) => onChange(e)}
													/>
												</div>
												<Row className='form-group'>
													<Col className='text-left'>
														Go back to <Link to='/login'>Login</Link>
													</Col>
													<Col className='text-right'>
														<button
															className='btn btn-primary w-md waves-effect waves-light'
															type='submit'
														>
															Reset
														</button>
													</Col>
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

export default ForgetPasswordPage;
