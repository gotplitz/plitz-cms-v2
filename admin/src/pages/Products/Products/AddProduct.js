import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Card, CardBody, Alert } from 'reactstrap';
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
import Select from 'react-select';

// Actions
import {
	addProduct,
	clearCurrent,
	editProduct,
	getSeries,
	postActivity,
} from '../../../store/actions';

// Parts
import Loader from '../../../components/Loader';

const AddProduct = ({ fmlink, toggle, product }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [editorState, setEditorState] = useState();
	const [formData, setFormData] = useState({
		isLive: false,
		fmtitle: '',
		subtitle: '',
		fmlink: '',
		description: '',
		specialText: '',
		seotitle: '',
		featuredimg: 'uploads/big-placeholder.jpg',
		category: [],
	});
	const [selectedFeatured, setSelectedFeatured] = useState([]);
	const [serieOptions, setSerieOptions] = useState([]);
	const [selectedGroup, setSelectedGroup] = useState([]);
	const [optionGroup, setOptionGroup] = useState([{ label: '', options: [] }]);
	const [showError, setShowError] = useState(false);
	const [filesErrorFi, setFilesErrorFi] = useState('');
	const [showErrorFi, setShowErrorFi] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [switchHtml, setSwitchHtml] = useState(false);
	const [slugVal, setSlugVal] = useState('');

	const {
		fmtitle,
		subtitle,
		isLive,
		description,
		specialText,
		seotitle,
		featuredimg,
	} = formData;

	useEffect(() => {
		dispatch(getSeries());

		// eslint-disable-next-line
	}, [dispatch]);

	const Login = useSelector((state) => state.Login);
	const { user } = Login;
	const Series = useSelector((state) => state.Series);
	const { series, loading, error } = Series;

	useEffect(() => {
		if (product && product !== null) {
			if (product.description) {
				const contentBlock = htmlToDraft(product.description);
				const contentState = ContentState.createFromBlockArray(
					contentBlock.contentBlocks
				);
				setEditorState(EditorState.createWithContent(contentState));
			}
			setFormData({
				_id: product._id ? product._id : null,
				isLive: product.isLive ? product.isLive : false,
				fmtitle: product.fmtitle ? product.fmtitle : '',
				subtitle: product.subtitle ? product.subtitle : '',
				fmlink: product.fmlink ? product.fmlink : '',
				description: product.description ? product.description : '',
				seotitle: product.seotitle ? product.seotitle : '',
				specialText: product.specialText ? product.specialText : '',
				featuredimg: product.featuredimg
					? product.featuredimg
					: 'uploads/big-placeholder.jpg',
				category:
					product.category && product.category.length > 0
						? product.category
						: [],
			});

			let setSelectValues = [];

			product.category &&
				product.category.length > 0 &&
				product.category.map((cat) =>
					setSelectValues.push({
						label: cat.title,
						value: cat.title,
					})
				);

			if (setSelectValues.length === product.category.length) {
				setSelectedGroup(setSelectValues);
			}
		} else {
			setFormData({
				isLive: false,
				fmtitle: '',
				subtitle: '',
				fmlink: '',
				description: '',
				specialText: '',
				seotitle: '',
				featuredimg: 'uploads/big-placeholder.jpg',
				category: [],
			});
		}
	}, [product, toggle]);

	useEffect(() => {
		if (series && series.length > 0) {
			series &&
				series.length > 0 &&
				series.forEach((el) => {
					setSerieOptions((serieOptions) => [
						...serieOptions,
						{ label: el.fmtitle, value: el.fmtitle },
					]);
				});
		}
	}, [series, fmlink, toggle]);

	useEffect(() => {
		if (series.length === serieOptions.length) {
			setOptionGroup([{ label: 'Series', options: serieOptions }]);
		}

		// eslint-disable-next-line
	}, [serieOptions, toggle]);

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

	const onSelect = (e) => {
		setSelectedGroup(e);
		setFormData({
			...formData,
			category: [],
		});
		let setArray = [];
		if (e && e.length > 0) {
			series.forEach((el) => {
				e.filter((els) => els.value === el.fmtitle && setArray.push(el));
			});
		} else {
			setFormData({ ...formData, category: [] });
		}

		setFormData({
			...formData,
			category: setArray,
		});
	};

	const contentChange = (editorState) => {
		setEditorState(editorState);
		setFormData({
			...formData,
			description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
		});
	};

	const onRawChange = (e) => {
		e.preventDefault();
		setFormData({
			...formData,
			description: e.target.value,
		});
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

	useEffect(() => {
		if (description === '' && !switchHtml) {
			setEditorState(EditorState.createEmpty());
		} else {
			const contentBlock = htmlToDraft(description);
			const contentState = ContentState.createFromBlockArray(
				contentBlock.contentBlocks
			);
			setEditorState(EditorState.createWithContent(contentState));
		}

		// eslint-disable-next-line
	}, [switchHtml]);

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

	const onSubmit = (e) => {
		e.preventDefault();
		if (fmlink && fmlink !== '') {
			try {
				dispatch(editProduct(formData));
				dispatch(
					postActivity({
						logtype: 'positive',
						logcontent: `The product item <strong>${formData.fmtitle}</strong> was edited successfully`,
						email: user ? user.email : '',
					})
				);
				setFormData({
					isLive: false,
					fmtitle: '',
					subtitle: '',
					fmlink: '',
					description: '',
					specialText: '',
					seotitle: '',
					featuredimg: 'uploads/big-placeholder.jpg',
					category: [],
				});
				toggle(false);
				dispatch(clearCurrent());
				setSlugVal('');
				setShowError(false);
				setShowErrorFi(false);
				setSelectedFeatured([]);
			} catch (error) {
				dispatch(
					postActivity({
						logtype: 'negative',
						logcontent: `An error occurred <em>editing</em> product: <strong>${error}</strong>`,
						email: user ? user.email : '',
					})
				);
				setErrorMsg(error);
			}
		} else if (formData.fmlink !== '' && description !== '' && fmtitle !== '') {
			try {
				dispatch(addProduct(formData));
				dispatch(
					postActivity({
						logtype: 'positive',
						logcontent: `The product item <strong>${formData.fmtitle}</strong> was created`,
						email: user ? user.email : '',
					})
				);
				setFormData({
					isLive: false,
					fmtitle: '',
					subtitle: '',
					fmlink: '',
					description: '',
					specialText: '',
					seotitle: '',
					featuredimg: 'uploads/big-placeholder.jpg',
					category: [],
				});
				setSlugVal('');
				setShowError(false);
				setShowErrorFi(false);
				setSelectedFeatured([]);
				history.push('/all-products');
			} catch (error) {
				dispatch(
					postActivity({
						logtype: 'negative',
						logcontent: `An error occurred adding product: <strong>${error}</strong>`,
						email: user ? user.email : '',
					})
				);
			}
		} else {
			setShowError(true);
			setErrorMsg(`Titles, Content and Category are required`);
			setTimeout(() => {
				setShowError(false);
				setErrorMsg('');
			}, 7000);
		}
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
									<Link to='/all-products'>All Products</Link>
								</li>
								<li className='breadcrumb-item'>Add Product</li>
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
										id='subtitle'
										name='subtitle'
										value={subtitle}
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
											id='description'
											name='description'
											value={description}
											className='editor-html'
											onChange={(e) => onRawChange(e)}
											style={{ height: '100%' }}
										/>
									) : (
										<Editor
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
										<h4>Sepcial Text</h4>
										<small>Extra Details or hightlights from Distec</small>
										<br />
										<Input
											placeholder='Highlight other details'
											type='text'
											id='specialText'
											name='specialText'
											value={specialText}
											onChange={(e) => onChange(e)}
										/>
									</div>
								</Col>
							</Row>
							<Row className='form-group mt-5'>
								<Col sm='12'>
									<div className='extraboxes-secion'>
										<h4>SEO Title Meta Tag</h4>
										<small>Default is Post Title</small>
										<br />
										<Input
											placeholder='Title Tag Content'
											type='text'
											id='seotitle'
											name='seotitle'
											value={seotitle === '' ? fmtitle : seotitle}
											onChange={(e) => onChange(e)}
										/>
									</div>
								</Col>
							</Row>
						</Col>
						<Col sm={12} md={3} className='pl-5'>
							<Card style={{ position: 'relative', zIndex: 1 }}>
								<CardBody>
									<h4 className='card-title mb-4'>Post Settings</h4>

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
										<small>Select Category</small>
										<div className='mt-2' style={{ zIndex: 999 }}>
											<Select
												closeMenuOnSelect={false}
												defaultValue={selectedGroup}
												onChange={(e) => onSelect(e)}
												isMulti
												options={optionGroup}
												className='fm-selection'
												classNamePrefix='fm'
											/>
										</div>
									</div>
								</CardBody>
							</Card>
							<Card style={{ position: 'relative', zIndex: 0 }}>
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
												description: '',
												fmposition: 0,
												seotitle: '',
												isMenu: false,
												featuredimg: 'uploads/big-placeholder.jpg',
												category: [],
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

export default AddProduct;
