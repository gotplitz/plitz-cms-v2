import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Card, CardBody, Alert } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import Editable from 'react-bootstrap-editable';
import { Editor } from 'react-draft-wysiwyg';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Switch from 'react-switch';
import {
	EditorState,
	convertToRaw,
	ContentState,
	convertFromHTML,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

// Actions
import {
	addBlogpost,
	clearCurrent,
	editBlogpost,
	getBlogpost,
	postActivity,
} from '../../store/actions';
import Loader from '../../components/Loader';

const AddBlogpost = ({ fmlink, toggle }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [editorState, setEditorState] = useState();
	const [formData, setFormData] = useState({
		isLive: false,
		fmtitle: '',
		fmlink: '',
		fmcontent: '',
		seotitle: '',
		fmcategory: [],
		featuredimg: 'uploads/big-placeholder.jpg',
	});

	const [selectedFeatured, setSelectedFeatured] = useState([]);
	const [showError, setShowError] = useState(false);
	const [filesErrorFi, setFilesErrorFi] = useState('');
	const [showErrorFi, setShowErrorFi] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [switchHtml, setSwitchHtml] = useState(false);
	const [slugVal, setSlugVal] = useState('');
	const [selectedGroup, setSelectedGroup] = useState({
		label: 'Blog Post',
		value: 'Blog Post',
	});
	const optionGroup = [
		{
			label: 'Options',
			options: [
				{
					label: 'Blog Post',
					value: 'Blog Post',
				},
				{
					label: 'Press Release',
					value: 'Press Release',
				},
				{
					label: 'Announcement',
					value: 'Announcement',
				},
				{
					label: 'Old Site',
					value: 'Old Site',
				},
				{
					label: 'Other',
					value: 'Other',
				},
			],
		},
	];

	const { fmtitle, isLive, fmcontent, seotitle, featuredimg } = formData;

	useEffect(() => {
		if (fmlink && fmlink !== undefined) {
			dispatch(getBlogpost(fmlink));
		}

		// eslint-disable-next-line
	}, [fmlink, dispatch]);

	const Blogposts = useSelector((state) => state.Blogposts);
	const { blogpost, loading, error } = Blogposts;
	const Login = useSelector((state) => state.Login);
	const { user } = Login;

	useEffect(() => {
		if (blogpost && blogpost !== null) {
			if (blogpost.fmcontent) {
				const contentBlock = convertFromHTML(blogpost.fmcontent);
				const contentState = ContentState.createFromBlockArray(
					contentBlock.contentBlocks
				);
				setEditorState(EditorState.createWithContent(contentState));
			}
			setFormData({
				_id: blogpost._id ? blogpost._id : null,
				isLive: blogpost.isLive ? blogpost.isLive : false,
				fmtitle: blogpost.fmtitle ? blogpost.fmtitle : '',
				fmlink: blogpost.fmlink ? blogpost.fmlink : '',
				fmcontent: blogpost.fmcontent ? blogpost.fmcontent : '',
				seotitle: blogpost.seotitle ? blogpost.seotitle : '',
				fmcategory: blogpost.fmcategory ? blogpost.fmcategory : [],
				featuredimg: blogpost.featuredimg
					? blogpost.featuredimg
					: 'uploads/big-placeholder.jpg',
			});

			setSelectedGroup({
				label: blogpost.fmcategory[0],
				value: blogpost.fmcategory[0],
			});
		}
	}, [blogpost]);

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
				seotitle: seotitle === '' ? e.target.value : seotitle,
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
			fmcategory: formData.fmcategory.includes(e.value)
				? formData.fmcategory
				: [...formData.fmcategory, e.value],
		});
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
				dispatch(editBlogpost(formData));
				dispatch(
					postActivity({
						logtype: 'positive',
						logcontent: `The blogpost item <strong>${formData.fmtitle}</strong> was edited successfully`,
						email: user ? user.email : '',
					})
				);
				setFormData({
					isLive: false,
					fmtitle: '',
					fmlink: '',
					fmcontent: '',
					seotitle: '',
					fmcategory: [],
					featuredimg: 'uploads/big-placeholder.jpg',
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
						logcontent: `An error occurred <em>editing</em> blogpost: <strong>${error}</strong>`,
						email: user ? user.email : '',
					})
				);
				setErrorMsg(error);
			}
		} else if (fmtitle !== '' && fmcontent !== '' && formData.fmlink !== '') {
			try {
				dispatch(addBlogpost(formData));
				dispatch(
					postActivity({
						logtype: 'positive',
						logcontent: `The blogpost <strong>${formData.fmtitle}</strong> was created`,
						email: user ? user.email : '',
					})
				);
				setFormData({
					isLive: false,
					fmtitle: '',
					fmlink: '',
					fmcontent: '',
					seotitle: '',
					fmcategory: [],
					featuredimg: 'uploads/big-placeholder.jpg',
				});
				setSlugVal('');
				setShowError(false);
				setShowErrorFi(false);
				setSelectedFeatured([]);
				history.push('/all-blogposts');
			} catch (error) {
				dispatch(
					postActivity({
						logtype: 'negative',
						logcontent: `An error occurred adding blogpost: <strong>${error}</strong>`,
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
									<Link to='/all-blogposts'>All Blogposts</Link>
								</li>
								<li className='breadcrumb-item'>Add Blogpost</li>
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
						</Col>
						<Col sm={12} md={3} className='pl-5'>
							<Card style={{ position: 'relative', zIndex: 1 }}>
								<CardBody>
									<h4 className='card-title mb-4'>Blog Post Settings</h4>

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

									<div className='mb-4'>
										<small>Post Category</small>
										<div className='mt-2' style={{ zIndex: 999 }}>
											<Select
												value={selectedGroup}
												initialValue={selectedGroup}
												onChange={(e) => onSelect(e)}
												options={optionGroup}
												className='fm-selection'
												classNamePrefix='fm'
											/>
										</div>
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
												fmlink: '',
												fmcontent: '',
												seotitle: '',
												fmcategory: [],
												featuredimg: 'uploads/big-placeholder.jpg',
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

export default AddBlogpost;
