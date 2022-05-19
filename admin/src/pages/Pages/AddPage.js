import React, { useEffect, useState } from 'react';
import {
	Row,
	Col,
	Button,
	Label,
	Input,
	Card,
	CardBody,
	Alert,
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import Editable from 'react-bootstrap-editable';
import { Editor } from 'react-draft-wysiwyg';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Switch from 'react-switch';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import {
	addPage,
	clearCurrent,
	editPage,
	getPage,
	postActivity,
} from '../../store/actions';
import Loader from '../../components/Loader';

const AddPage = ({ fmlink, toggle }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [editorState, setEditorState] = useState();
	const [formData, setFormData] = useState({
		isLive: false,
		fmtitle: '',
		fmsubtitle: '',
		fmlabel: '',
		fmlink: '',
		fmcontent: '',
		fmposition: 0,
		seotitle: '',
		isMenu: false,
		featuredimg: 'uploads/big-placeholder.jpg',
		extraboxes: [],
		gallery: [],
	});
	const [extraBox, setExtraBox] = useState({
		etitle: '',
		eposition: 0,
		econtent: '',
		eimg: 'uploads/big-placeholder.jpg',
	});
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [selectedFilesGal, setSelectedFilesGal] = useState([]);
	const [selectedFeatured, setSelectedFeatured] = useState([]);
	const [filesError, setFilesError] = useState('');
	const [showError, setShowError] = useState(false);
	const [filesErrorGal, setFilesErrorGal] = useState('');
	const [showErrorGal, setShowErrorGal] = useState(false);
	const [filesErrorFi, setFilesErrorFi] = useState('');
	const [showErrorFi, setShowErrorFi] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [switchHtml, setSwitchHtml] = useState(false);
	const [slugVal, setSlugVal] = useState('');

	const {
		fmtitle,
		fmsubtitle,
		isLive,
		isMenu,
		fmlabel,
		fmposition,
		fmcontent,
		seotitle,
		featuredimg,
		gallery,
	} = formData;
	const { etitle, eposition, econtent, eimg } = extraBox;

	useEffect(() => {
		if (fmlink && fmlink !== undefined) {
			dispatch(getPage(fmlink));
		}

		// eslint-disable-next-line
	}, [fmlink, dispatch]);

	const Pages = useSelector((state) => state.Pages);
	const { page, loading, error } = Pages;
	const Login = useSelector((state) => state.Login);
	const { user } = Login;

	useEffect(() => {
		if (page && page !== null) {
			if (page.fmcontent) {
				const contentBlock = htmlToDraft(page.fmcontent);
				const contentState = ContentState.createFromBlockArray(
					contentBlock.contentBlocks
				);
				setEditorState(EditorState.createWithContent(contentState));
			}
			setFormData({
				_id: page._id ? page._id : null,
				isLive: page.isLive ? page.isLive : false,
				fmtitle: page.fmtitle ? page.fmtitle : '',
				fmsubtitle: page.fmsubtitle ? page.fmsubtitle : '',
				fmlabel: page.fmlabel ? page.fmlabel : page.fmtitle,
				fmlink: page.fmlink ? page.fmlink : '',
				fmcontent: page.fmcontent ? page.fmcontent : '',
				fmposition: page.fmposition ? page.fmposition : 0,
				title: page.title ? page.title : '',
				id: page.id ? page.id : 100,
				seotitle: page.seotitle ? page.seotitle : '',
				isMenu: page.isMenu ? page.isMenu : false,
				featuredimg: page.featuredimg
					? page.featuredimg
					: 'uploads/big-placeholder.jpg',
				extraboxes: page.extraboxes ? page.extraboxes : [],
				gallery: page.gallery ? page.gallery : [],
			});
		} else {
			setFormData({
				isLive: false,
				fmtitle: '',
				fmsubtitle: '',
				fmlabel: '',
				fmlink: '',
				fmcontent: '',
				fmposition: 0,
				seotitle: '',
				isMenu: false,
				featuredimg: 'uploads/big-placeholder.jpg',
				extraboxes: [],
				gallery: [],
			});
		}
	}, [page]);

	const switchButton = () => {
		if (isLive) {
			setFormData({
				...formData,
				isLive: false,
			});
		} else {
			setFormData({
				...formData,
				isLive: true,
			});
		}
	};

	const switchButton2 = () => {
		if (isMenu) {
			setFormData({
				...formData,
				isMenu: false,
			});
		} else {
			setFormData({
				...formData,
				fmlabel: fmlabel !== '' ? fmlabel : fmtitle,
				isMenu: true,
			});
		}
	};

	const switchHtmlButton = () => {
		if (switchHtml) {
			setSwitchHtml(false);
		} else {
			setSwitchHtml(true);
		}
	};

	const onChangeSlug = (value) => {
		setFormData({ ...formData, fmlink: value });
	};

	const onValidate = (value) => {
		if (!value || value === '') {
			return "This field can't be empty";
		}
	};

	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name === 'fmtitle') {
			setFormData({
				...formData,
				fmtitle: e.target.value,
				fmlink: e.target.value
					.replace(/[^a-zA-Z0-9]/g, '-')
					.replace(/--/g, '')
					.replace(/-$/, '')
					.toLowerCase(),
			});
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	const contentChange = (editorState) => {
		setEditorState(editorState);
		setFormData({
			...formData,
			fmcontent: draftToHtml(convertToRaw(editorState.getCurrentContent())),
		});
	};

	const onRawChange = (e) => {
		e.preventDefault();
		setFormData({
			...formData,
			fmcontent: e.target.value,
		});
	};

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

	const handleAcceptedFilesGal = (file) => {
		file.map((file) =>
			Object.assign(file, {
				preview: URL.createObjectURL(file),
				formattedSize: formatBytes(file.size),
			})
		);
		setShowErrorGal(false);
		setSelectedFilesGal(file);
	};

	const handleAcceptedFilesFi = (file) => {
		if (file.length > 1) {
			setFilesErrorFi('Only one file is allowed');
			setShowErrorFi(true);
		} else {
			file.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
					formattedSize: formatBytes(file.size),
				})
			);
			setShowErrorFi(false);
			setSelectedFeatured(file);
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

	const boxChange = (e) => {
		e.preventDefault();
		setExtraBox({ ...extraBox, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (fmcontent === '' && !switchHtml) {
			setEditorState(EditorState.createEmpty());
		} else {
			const contentBlock = htmlToDraft(fmcontent);
			const contentState = ContentState.createFromBlockArray(
				contentBlock.contentBlocks
			);
			setEditorState(EditorState.createWithContent(contentState));
		}

		// eslint-disable-next-line
	}, [switchHtml]);

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
						setExtraBox({
							...extraBox,
							eimg: res.data.filePath,
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
		if (selectedFeatured.length > 0) {
			const fd = new FormData();
			fd.append('newimg', selectedFeatured[0]);

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
							featuredimg: res.data.filePath,
						});
					})
					.catch((error) => {
						setFilesErrorFi('Error after uploading file');
						setShowErrorFi(true);
					});
			} catch (err) {
				if (err.response.status === 500) {
					setFilesErrorFi('There was a problem with the server');
					setShowErrorFi(true);
				} else {
					setFilesErrorFi(err.response.data.msg);
				}
			}
		}

		// eslint-disable-next-line
	}, [selectedFeatured]);

	useEffect(() => {
		if (selectedFilesGal.length > 0) {
			const fd = new FormData();

			selectedFilesGal.forEach((el) => {
				fd.append('gallery', el);
			});

			try {
				axios
					.post('api/uploads/multiple', fd, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then((res) => {
						setFormData({
							...formData,
							gallery: [...formData.gallery, ...res.data],
						});
					})
					.catch((error) => {
						setFilesErrorGal(error.response.data.msg);
						setShowErrorGal(true);
					});
			} catch (err) {
				if (err.response.status === 500) {
					setFilesErrorGal('There was a problem with the server');
					setShowErrorGal(true);
				} else {
					setFilesErrorGal(err.response.data.msg);
				}
			}
		}

		// eslint-disable-next-line
	}, [selectedFilesGal]);

	const saveBox = (e) => {
		e.preventDefault();
		let boxExist;
		boxExist =
			formData.extraboxes.length > 0 &&
			formData.extraboxes.filter(
				(exb) => exb.eposition === extraBox.eposition && exb
			);

		if (etitle === '' || econtent === '') {
			setShowError(true);
			setErrorMsg(`Fields can't be empty`);
		} else if (eposition === 0 || boxExist.length > 0) {
			setShowError(true);
			setErrorMsg(`You can't use this sort order number`);
		} else {
			setShowError(false);
			setErrorMsg('');
			setFormData({
				...formData,
				extraboxes: [...formData.extraboxes, extraBox],
			});
			setExtraBox({
				etitle: '',
				eposition: 0,
				econtent: '',
				eimg: 'uploads/big-placeholder.jpg',
			});
			setSelectedFiles([]);
		}
	};

	const editBox = (e, box) => {
		e.preventDefault();
		setExtraBox(box);
		const filtered = formData.extraboxes.filter(
			(el) => el.eposition !== box.eposition && el
		);
		setFormData({ ...formData, extraboxes: filtered });
	};

	const removeBox = (e, eposition) => {
		e.preventDefault();
		const filtered = formData.extraboxes.filter(
			(el) => el.eposition !== eposition && el
		);
		setFormData({ ...formData, extraboxes: filtered });
	};

	const resetBox = (e) => {
		e.preventDefault();
		setExtraBox({
			etitle: '',
			eposition: 0,
			econtent: '',
			eimg: 'uploads/big-placeholder.jpg',
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (etitle !== '' || econtent !== '' || eposition !== 0) {
			setShowError(true);
			setErrorMsg(`The extra box must be saved first before coninuing`);
		} else if (fmlink && fmlink !== '') {
			try {
				dispatch(editPage(formData));
				dispatch(
					postActivity({
						logtype: 'positive',
						logcontent: `The page item <strong>${formData.fmtitle}</strong> was edited successfully`,
						email: user ? user.email : '',
					})
				);
				setFormData({
					isLive: false,
					fmtitle: '',
					fmsubtitle: '',
					fmlabel: '',
					fmlink: '',
					fmcontent: '',
					fmposition: 0,
					seotitle: '',
					isMenu: false,
					featuredimg: 'uploads/big-placeholder.jpg',
					extraboxes: [],
					gallery: [],
				});
				toggle(false);
				dispatch(clearCurrent());
				setSlugVal('');
				setShowError(false);
				setShowErrorFi(false);
				setSelectedFiles([]);
				setSelectedFilesGal([]);
				setSelectedFeatured([]);
			} catch (error) {
				dispatch(
					postActivity({
						logtype: 'negative',
						logcontent: `An error occurred <em>editing</em> page: <strong>${error}</strong>`,
						email: user ? user.email : '',
					})
				);
				setErrorMsg(error);
			}
		} else if (fmtitle !== '' && fmcontent !== '' && formData.fmlink !== '') {
			try {
				dispatch(addPage(formData));
				dispatch(
					postActivity({
						logtype: 'positive',
						logcontent: `The page <strong>${formData.fmtitle}</strong> was created`,
						email: user ? user.email : '',
					})
				);
				setFormData({
					isLive: false,
					fmtitle: '',
					fmsubtitle: '',
					fmlabel: '',
					fmlink: '',
					fmcontent: '',
					fmposition: 0,
					seotitle: '',
					isMenu: false,
					featuredimg: 'uploads/big-placeholder.jpg',
					extraboxes: [],
					gallery: [],
				});
				setSlugVal('');
				setShowError(false);
				setShowErrorFi(false);
				setSelectedFiles([]);
				setSelectedFilesGal([]);
				setSelectedFeatured([]);
				history.push('/all-pages');
			} catch (error) {
				dispatch(
					postActivity({
						logtype: 'negative',
						logcontent: `An error occurred adding page: <strong>${error}</strong>`,
						email: user ? user.email : '',
					})
				);
			}
		} else {
			setShowError(true);
			setErrorMsg(`Title and Content are required`);
			setTimeout(() => {
				setShowError(false);
				setErrorMsg('');
			}, 9000);
		}
	};

	const uploadImageCallBack = async (file) => {
		const fd = new FormData();
		fd.append('newimg', file);

		const fileUploaded = await axios.post('api/uploads', fd, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return Promise.resolve({
			data: {
				link: `${fileUploaded.data.filePath}`,
			},
		});
	};

	const removeGalitem = (e, glritem) => {
		e.preventDefault();
		const filtered = gallery.filter((gl) => gl !== glritem && gl);
		setFormData({
			...formData,
			gallery: filtered,
		});
	};

	return loading ? (
		<Loader />
	) : (
		<React.Fragment>
			<div className='container-fluid fm-forms'>
				<Row className='align-items-center'>
					<Col sm={6}>
						<div className='page-title-box'>
							<h1 className=''>
								{fmlink && fmlink !== '' ? 'Edit Item' : 'New Item'}
							</h1>
							<ol className='breadcrumb mb-0'>
								<li className='breadcrumb-item'>
									<Link to='/dashboard'>Dashboard</Link>
								</li>
								<li className='breadcrumb-item'>
									<Link to='/all-pages'>All Pages</Link>
								</li>
								<li className='breadcrumb-item'>Add Page</li>
							</ol>
						</div>
					</Col>
				</Row>

				<Row>
					{showError ? (
						<div className='container-fluid'>
							<Row className='align-items-center'>
								<Col sm={12}>
									<Alert color='warning'>{errorMsg}</Alert>
								</Col>
							</Row>
						</div>
					) : null}
					{error ? (
						<div className='container-fluid'>
							<Row className='align-items-center'>
								<Col sm={12}>
									<h3 className='title-3'>{error}</h3>
								</Col>
							</Row>
						</div>
					) : null}
				</Row>

				<Row>
					<Col sm={12} md={9}>
						<Editable
							alwaysEditing={false}
							disabled={false}
							initialValue={
								fmlink && fmlink !== ''
									? fmlink
									: fmtitle
											.replace(/[^a-zA-Z0-9]/g, '-')
											.replace(/--/g, '')
											.replace(/-$/, '')
											.toLowerCase()
							}
							name='fmlink'
							value={slugVal}
							id='fmlink'
							isValueClickable={true}
							label={'Front-end Link (Click to edit)'}
							mode='inline'
							validate={(value) => onValidate(value)}
							onSubmit={(value) => onChangeSlug(value)}
							onValidated={(value) => {
								return value;
							}}
							placement='top'
							showText
							type='textfield'
						/>
					</Col>
				</Row>

				<form onSubmit={(e) => onSubmit(e)}>
					<Row>
						<Col sm={12} md={9}>
							<Row className='form-group'>
								<Col sm={12}>
									<input
										className='form-control'
										type='text'
										placeholder='Title'
										id='fmtitle'
										name='fmtitle'
										value={fmtitle}
										onChange={(e) => onChange(e)}
									/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Col sm={12}></Col>
							</Row>
							<Row className='form-group'>
								<Col sm={12}>
									<label htmlFor='fsubtitle' className='col-form-label'>
										Recommended for h2 tags
									</label>
									<input
										className='form-control'
										type='text'
										placeholder='Subtitle'
										id='fmsubtitle'
										name='fmsubtitle'
										value={fmsubtitle}
										onChange={(e) => onChange(e)}
									/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Col sm='12' className='mt-3 mb-3'>
									<span className='mt-1 mr-2'>HTML Mode</span>
									<Switch
										uncheckedIcon={<Offsymbol />}
										checkedIcon={<OnSymbol />}
										onColor='#6a479c'
										onChange={switchHtmlButton}
										checked={switchHtml}
									/>{' '}
								</Col>
								<Col sm='12'>
									{switchHtml ? (
										<Input
											placeholder='HTML Mode has been enabled'
											type='textarea'
											id='fmcontent'
											name='fmcontent'
											value={fmcontent}
											className='editor-html'
											onChange={(e) => onRawChange(e)}
											style={{ height: '100%' }}
										/>
									) : (
										<Editor
											toolbar={{
												options: [
													'inline',
													'blockType',
													'fontSize',
													'fontFamily',
													'list',
													'textAlign',
													'link',
													'embedded',
													'emoji',
													'image',
													'remove',
													'history',
												],
												image: {
													urlEnabled: true,
													uploadEnabled: true,
													alignmentEnabled: true,
													uploadCallback: uploadImageCallBack,
													previewImage: true,
													inputAccept:
														'image/gif,image/jpeg,image/jpg,image/png,image/svg',
													alt: { present: true, mandatory: true },
													defaultSize: {
														width: '100%',
														height: 'auto',
													},
												},

												history: {
													inDropdown: false,
													options: ['undo', 'redo'],
												},
											}}
											editorState={editorState}
											toolbarClassName='toolbarClassName'
											wrapperClassName='wrapperClassName'
											editorClassName='editorClassName'
											onEditorStateChange={contentChange}
										/>
									)}
								</Col>
							</Row>

							<Row className='form-group mt-5'>
								<Col sm='12'>
									<div className='extraboxes-secion'>
										<h4>SEO Title Meta Tag</h4>
										<small>Default is Post Title</small>
										<br />
										<Input
											placeholder='HTML Title Tag'
											type='text'
											id='seotitle'
											name='seotitle'
											value={seotitle === '' ? fmtitle : seotitle}
											onChange={(e) => onChange(e)}
										/>
									</div>
								</Col>
							</Row>
							{/* Gallery Section */}
							<Row className='form-group mt-5'>
								<Col sm='12'>
									<div className='extraboxes-secion'>
										<h4>Image Gallery for this page</h4>
									</div>
								</Col>
							</Row>
							<Row className='form-group'>
								<Col sm='12'>
									<Card>
										<CardBody>
											<Row>
												<Col xs='12' sm='12' md='6' className='form-group'>
													{filesErrorGal && showErrorGal !== '' ? (
														<Alert color='warning'>{filesErrorGal}</Alert>
													) : null}
													<Dropzone
														onDrop={(acceptedFilesGal) =>
															handleAcceptedFilesGal(acceptedFilesGal)
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
																	<h5>
																		Drop file here or
																		<br />
																		click to upload.
																	</h5>
																</div>
															</div>
														)}
													</Dropzone>
												</Col>

												<Col xs='12' sm='12' md='6' className='form-group'>
													<div
														className='dropzone-previews mt-3'
														id='file-previews'
													>
														<small>Uploading Box Results</small>
														{selectedFilesGal.map((glr, i) => {
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
																					alt={glr.name}
																					src={glr.preview}
																				/>
																			</Col>
																			<Col>
																				<Link
																					to='#'
																					className='text-muted font-weight-bold'
																				>
																					{glr.name}
																				</Link>
																				<p className='mb-0'>
																					<strong>{glr.formattedSize}</strong>
																				</p>
																			</Col>
																		</Row>
																	</div>
																</Card>
															);
														})}
														<div className='setting-bottom-divider'></div>
														<Row className='align-items-center'>
															<Col xs='12' sm='6' md='4'>
																<small>Uploaded Files</small>
															</Col>
														</Row>

														<Row className='align-items-center'>
															{gallery.length > 0 &&
																gallery.map((glritem, index) => (
																	<Col key={index} xs='6' sm='6' md='4'>
																		<button
																			id={`${glritem}`}
																			onClick={(e) => removeGalitem(e, glritem)}
																			className='btn waves-effect text-primary waves-light remove-gal'
																		>
																			<div className='remove-image'>
																				<i className='ti-trash'></i>
																			</div>
																			<div className='remove-overlay'>
																				Click To Remove
																			</div>
																			<img
																				width='100%'
																				height='auto'
																				className='bg-light'
																				alt={`preview gal`}
																				src={glritem}
																			/>
																		</button>
																	</Col>
																))}
														</Row>
													</div>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>
							</Row>

							{/* Extra Boxes */}

							<Row className='form-group mt-5'>
								<Col sm='12'>
									<div className='extraboxes-secion'>
										<h4>Add extra boxes to this page</h4>
									</div>
								</Col>
							</Row>
							<Row className='form-group'>
								<Col sm='12'>
									<Card>
										<CardBody>
											{showError ? (
												<Alert color='warning'>{errorMsg}</Alert>
											) : null}
											<Row data-repeater-item>
												<Col lg='3' className='form-group'>
													<Input
														placeholder='Box Title'
														type='text'
														id='etitle'
														name='etitle'
														value={etitle}
														onChange={(e) => boxChange(e)}
													/>
													<br />
													<small>Sort Order:</small>
													<Input
														placeholder='0'
														type='number'
														id='eposition'
														name='eposition'
														value={eposition}
														onChange={(e) => boxChange(e)}
													/>
												</Col>

												<Col lg='4' className='form-group'>
													<Input
														placeholder='Box Content'
														type='textarea'
														id='econtent'
														name='econtent'
														value={econtent}
														onChange={(e) => boxChange(e)}
														style={{ height: '100%' }}
													/>
												</Col>

												<Col lg='3' className='form-group'>
													{filesError !== '' ? (
														<Alert color='warning'>{errorMsg}</Alert>
													) : null}
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
																	<h5>
																		Drop file here or
																		<br />
																		click to upload.
																	</h5>
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
														{selectedFiles.length === 0 && eimg && (
															<Row className='align-items-center'>
																<Col className='col-auto'>
																	<img
																		height='80'
																		className='avatar-sm rounded bg-light'
																		alt={etitle ? etitle : 'Placeholder'}
																		src={eimg}
																	/>
																</Col>
															</Row>
														)}
													</div>
												</Col>

												<Col lg='2' className='form-group align-self-center'>
													<Button
														onClick={(e) => saveBox(e)}
														color='success'
														className='mt-3'
														style={{
															width: '100%',
														}}
													>
														{' '}
														Save Item{' '}
													</Button>
													<Button
														onClick={(e) => resetBox(e)}
														color='primary'
														className='mt-3'
														style={{
															width: '100%',
														}}
													>
														{' '}
														Reset{' '}
													</Button>
												</Col>
											</Row>
										</CardBody>
									</Card>
									{formData.extraboxes.length > 0 &&
										formData.extraboxes.map((box) => (
											<Card key={box.eposition}>
												<CardBody>
													<Row>
														<Col sm='12' md={6}>
															<h5>{box.etitle}</h5>
															<div
																dangerouslySetInnerHTML={{
																	__html: box.econtent,
																}}
															></div>
														</Col>
														<Col sm='12' md={3}>
															<img
																className='img-thumbnail'
																alt={box.etitle ? box.etitle : 'Extra Box'}
																width='100%'
																height='auto'
																src={box.eimg}
															/>
														</Col>
														<Col
															lg='2'
															className='form-group align-self-center'
														>
															<Button
																onClick={(e) => editBox(e, box)}
																color='success'
																className='mt-3'
																style={{
																	width: '100%',
																}}
															>
																{' '}
																Edit
															</Button>
															<Button
																onClick={(e) => removeBox(e, box.eposition)}
																color='primary'
																className='mt-3'
																style={{
																	width: '100%',
																}}
															>
																Remove This Box
															</Button>
														</Col>
													</Row>
												</CardBody>
											</Card>
										))}
								</Col>
							</Row>
						</Col>
						<Col sm={12} md={3} className='pl-5'>
							<Card>
								<CardBody>
									<h4 className='card-title mb-4'>Page Settings</h4>

									<div className='mb-4 pb-4 setting-bottom-divider'>
										<p className='card-title-desc'>Status</p>
										<Switch
											uncheckedIcon={<Offsymbol />}
											checkedIcon={<OnSymbol />}
											onColor='#6a479c'
											onChange={switchButton}
											checked={isLive}
										/>

										<span className='ml-3'>
											{isLive ? 'Plublished' : 'Draft'}
										</span>
									</div>
									<div className='mb-4 pb-4 setting-bottom-divider'>
										<p>Page Order</p>
										<small>
											If number is not set, pages will be ordganized by date.
										</small>
										<Input
											placeholder={0}
											type='number'
											id='fmposition'
											name='fmposition'
											value={fmposition}
											onChange={(e) => onChange(e)}
										/>
									</div>
									<div className='mb-4'>
										<p className='card-title-desc'>Menu Visibility</p>
										<Switch
											uncheckedIcon={<Offsymbol />}
											checkedIcon={<OnSymbol />}
											onColor='#6a479c'
											onChange={switchButton2}
											checked={isMenu}
										/>

										<span className='ml-3'>
											{isMenu ? 'Showing' : 'Hiding'}
										</span>
										{isMenu ? (
											<div className='mt-2'>
												<Label htmlFor='fmlabel'>Name in Menu</Label>
												<Input
													placeholder='Menu Label'
													type='text'
													id='fmlabel'
													name='fmlabel'
													value={fmlabel === '' ? fmtitle : fmlabel}
													required={isMenu ? true : false}
													onChange={(e) => onChange(e)}
													style={{ height: '100%' }}
												/>
											</div>
										) : null}
									</div>
								</CardBody>
							</Card>
							<Card>
								<CardBody>
									<h4 className='card-title mb-4'>Featured Image</h4>

									{showErrorFi ? (
										<Alert color='warning'>{filesErrorFi}</Alert>
									) : null}
									<Dropzone
										onDrop={(acceptedFiles) =>
											handleAcceptedFilesFi(acceptedFiles)
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
													<h5>
														Drop file here or
														<br />
														click to upload.
													</h5>
												</div>
											</div>
										)}
									</Dropzone>
									<div className='dropzone-previews mt-3' id='file-previews'>
										{selectedFeatured.map((f, i) => {
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
										{selectedFeatured.length === 0 && featuredimg && (
											<Row className='align-items-center'>
												<Col className='col-auto'>
													<img
														height='80'
														className='avatar-sm rounded bg-light'
														alt={fmtitle ? fmtitle : 'Placeholder'}
														src={featuredimg}
													/>
												</Col>
											</Row>
										)}
									</div>
								</CardBody>
							</Card>
							<Card>
								<CardBody>
									<button
										type='submit'
										className='btn btn-primary waves-effect waves-light'
									>
										Save
									</button>
									<button
										type='button'
										onClick={(e) => {
											e.preventDefault();
											setEditorState(EditorState.createEmpty());
											setFormData({
												isLive: false,
												fmtitle: '',
												fmsubtitle: '',
												fmlabel: '',
												fmlink: '',
												fmcontent: '',
												fmposition: 0,
												seotitle: '',
												isMenu: false,
												featuredimg: 'uploads/big-placeholder.jpg',
												extraboxes: [],
											});
										}}
										className='btn btn-danger ml-2 waves-effect waves-light'
									>
										Reset
									</button>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</form>
			</div>
		</React.Fragment>
	);
};

const Offsymbol = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				fontSize: 12,
				color: '#fff',
				paddingRight: 2,
				paddingTop: 3,
			}}
		>
			{' '}
			<small>OFF</small>
		</div>
	);
};

const OnSymbol = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				fontSize: 12,
				color: '#fff',
				paddingRight: 2,
				paddingTop: 3,
			}}
		>
			{' '}
			<small>ON</small>
		</div>
	);
};

export default AddPage;
