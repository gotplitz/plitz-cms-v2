import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Alert } from 'reactstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';

// // action
import { postActivity, registerUser } from '../../store/actions';

// Redux
import { Link, useHistory } from 'react-router-dom';

// Parts
import Loader from '../../components/Loader';
import Dropzone from 'react-dropzone';
import AuthFooter from '../../components/AuthFooter';
import AuthHeader from '../../components/AuthHeader';

const Register = ({ location }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [formData, setFormData] = useState({
		fullname: '',
		email: '',
		password: '',
		photo: 'uploads/user-place-holder.jpg',
	});
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [filesError, setFilesError] = useState('');
	const [showError, setShowError] = useState(false);
	const [whatType, setWhatType] = useState('password');
	const [currenIcon, setCurrentIcon] = useState('mdi-eye');
	const [fullReq, setFullReq] = useState(false);
	const [emailReq, setEmailReq] = useState(false);
	const [passReq, setPassReq] = useState(false);

	const { fullname, email, password } = formData;

	const Login = useSelector((state) => state.Login);
	const { isAuthenticated, error, loading } = Login;

	const redirect = location.search
		? location.search.split('=')[1]
		: '/dashboard';

	const handleAcceptedFiles = (file) => {
		if (file.length > 1) {
			setFilesError('Only one file is allowed');
			setShowError(true);
		} else {
			file.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
					formattedSize: formatBytes(file.size),
				})
			);
			setShowError(false);
			setSelectedFiles(file);
		}
	};

	const formatBytes = (bytes, decimals = 2) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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

	useEffect(() => {
		if (showError) {
			setTimeout(() => {
				setShowError(false);
			}, 12000);
		}
	}, [showError]);

	const onChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (isAuthenticated) {
			history.push(redirect);
		}

		// eslint-disable-next-line
	}, [isAuthenticated, redirect]);

	useEffect(() => {
		if (selectedFiles.length > 0) {
			const fd = new FormData();
			fd.append('newimg', selectedFiles[0]);

			try {
				axios
					.post('api/uploads', fd, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then((res) => {
						setFormData({
							...formData,
							photo: res.data.filePath,
						});
					})
					.catch((error) => {
						setFilesError('Error after uploading file');
						setShowError(true);
					});
			} catch (err) {
				if (err.response.status === 500) {
					setFilesError('There was a problem with the server');
					setShowError(true);
				} else {
					setFilesError(err.response.data.msg);
				}
			}
		}

		// eslint-disable-next-line
	}, [selectedFiles]);

	useEffect(() => {
		if (error) {
			dispatch(
				postActivity({
					logtype: 'negative',
					logcontent: `An error occurred registering the user: <strong>${error}</strong>`,
					email: '',
				})
			);
		}

		// eslint-disable-next-line
	}, [error]);

	const onSubmit = (e) => {
		e.preventDefault();
		setShowError(false);
		if (fullname === '') {
			setFullReq(true);
		} else if (email === '') {
			setEmailReq(true);
		} else if (password === '') {
			setPassReq(true);
		} else {
			setFullReq(false);
			setEmailReq(false);
			setPassReq(false);
			dispatch(registerUser(formData));
			dispatch(
				postActivity({
					logtype: 'positive',
					logcontent: `A new user has been registered susccesfully`,
					email: formData.email,
				})
			);
		}
	};

	return (
		<React.Fragment>
			<div className='account-pages register-page pt-5'>
				<div className='container'>
					<Row className='justify-content-center'>
						<Col md={8} lg={6} xl={5}>
							<div className='position-relative'>
								{loading ? <Loader /> : null}

								<Card className='overflow-hidden'>
									<AuthHeader
										title='Request CMS access'
										intro='If you need access to the CMS for Front-End updates, register now and we will authorize your account.'
									/>
									<CardBody className='p-4'>
										<div className='p-3'>
											<form
												className='form-horizontal mt-5'
												onSubmit={(e) => onSubmit(e)}
											>
												{isAuthenticated ? (
													<Alert color='success'>
														Register User Successfully
													</Alert>
												) : null}
												{error && showError ? (
													<Alert color='danger'>{error}</Alert>
												) : null}
												{showError && filesError !== '' && !error && (
													<Alert color='danger'>{filesError}</Alert>
												)}
												<div className='form-group'>
													<TextField
														error={fullReq}
														helperText={
															fullReq ? 'This field is required' : null
														}
														fullWidth
														variant='outlined'
														name='fullname'
														label='Full Name *'
														type='text'
														value={fullname}
														onChange={(e) => onChange(e)}
														placeholder='Enter your Full Name'
													/>
												</div>
												<div className='form-group'>
													<TextField
														error={emailReq}
														helperText={
															emailReq ? 'This field is required' : null
														}
														fullWidth
														variant='outlined'
														name='email'
														label='Email *'
														type='email'
														value={email}
														onChange={(e) => onChange(e)}
														placeholder='Enter email'
													/>
												</div>
												<div
													className='form-group'
													style={{
														position: 'relative',
													}}
												>
													<TextField
														error={passReq}
														helperText={
															passReq ? 'This field is required' : null
														}
														fullWidth
														variant='outlined'
														name='password'
														label='Password *'
														type={whatType}
														value={password}
														onChange={(e) => onChange(e)}
														placeholder='Enter Password'
													/>
													<button
														className='button-reveal-password'
														onClick={changeType}
													>
														<i className={`mdi ${currenIcon}`}></i>
													</button>
												</div>
												<Row className='form-group'>
													<div className='col-12'>
														<Dropzone
															onDrop={(acceptedFiles) =>
																handleAcceptedFiles(acceptedFiles)
															}
														>
															{({ getRootProps, getInputProps }) => (
																<div className='dropzone'>
																	<div
																		className='dz-message needsclick'
																		{...getRootProps()}
																	>
																		<input
																			{...getInputProps()}
																			accept='image/png, image/gif, image/jpeg, image/jpg'
																		/>
																		<h3>
																			Drop file here or
																			<br />
																			click to upload.
																		</h3>
																	</div>
																</div>
															)}
														</Dropzone>
														<div
															className='dropzone-previews mt-3'
															id='file-previews'
														>
															{selectedFiles.map((f, i) => {
																return (
																	<Card
																		className='mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete'
																		key={i + '-file'}
																	>
																		<div className='p-2'>
																			<Row className='align-items-center'>
																				<Col className='col-auto'>
																					<img
																						data-dz-thumbnail=''
																						height='80'
																						className='avatar-sm rounded bg-light'
																						alt={f.name}
																						src={f.preview}
																					/>
																				</Col>
																				<Col>
																					<Link
																						to='#'
																						className='text-muted font-weight-bold'
																					>
																						{f.name}
																					</Link>
																					<p className='mb-0'>
																						<strong>{f.formattedSize}</strong>
																					</p>
																				</Col>
																			</Row>
																		</div>
																	</Card>
																);
															})}
														</div>
													</div>
												</Row>
												<Row className='form-group'>
													<div className='col-12 text-right'>
														<button
															className='btn btn-primary w-md waves-effect waves-light'
															type='submit'
														>
															Register
														</button>
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
					text={`Already have an account? `}
					button={`pages-login`}
					buttonlabel={`Login`}
				/>
			</div>
		</React.Fragment>
	);
};

export default Register;
