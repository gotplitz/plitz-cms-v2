import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody } from 'reactstrap';

// import images

import img3 from '../../../assets/images/small/img-3.jpg';
import img4 from '../../../assets/images/small/img-4.jpg';

class EmailRead extends Component {
	constructor(props) {
		super(props);
		this.state = {
			folder_menu: false,
			tag_menu: false,
			more_menu: false,
		};
		this.toggleFolder = this.toggleFolder.bind(this);
		this.toggleTag = this.toggleTag.bind(this);
		this.toggleMore = this.toggleMore.bind(this);
	}

	toggleFolder() {
		this.setState((prevState) => ({
			folder_menu: !prevState.folder_menu,
		}));
	}

	toggleTag() {
		this.setState((prevState) => ({
			tag_menu: !prevState.tag_menu,
		}));
	}

	toggleMore() {
		this.setState((prevState) => ({
			more_menu: !prevState.more_menu,
		}));
	}

	componentDidMount() {}

	render() {
		return (
			<React.Fragment>
				<div className='container-fluid'>
					<Row className='align-items-center'>
						<Col sm={12}>
							<div className='page-title-box'>
								<h4 className='font-size-18'>Email Read</h4>
								<ol className='breadcrumb mb-0'>
									<li className='breadcrumb-item'>
										<Link to='/#'>Ferocious Media</Link>
									</li>
									<li className='breadcrumb-item'>
										<Link to='/#'>Email</Link>
									</li>
									<li className='breadcrumb-item active'>Email Read</li>
								</ol>
							</div>
						</Col>
					</Row>

					<Row>
						<div className='col-12'>
							<div className='email-leftbar card'>
								<div className='mail-list mt-4'>
									<Link to='email-inbox' className='active'>
										Inbox <span className='ml-1'>(18)</span>
									</Link>
								</div>
							</div>

							<div className='email-rightbar mb-3'>
								<Card>
									<div className='btn-toolbar p-3' role='toolbar'>
										<div className='btn-group mo-mb-2'>
											<button
												type='button'
												className='btn btn-primary waves-light waves-effect'
											>
												<i className='far fa-trash-alt'></i>
											</button>
										</div>
									</div>
									<hr />
									<CardBody>
										<div className='media mb-4'>
											<div className='media-body'>
												<h4 className='font-size-15 m-0'>
													Humberto D. Champion
												</h4>
												<small className='text-muted'>johndoe@domain.com</small>{' '}
												| <small className='text-muted'>(123) 456-7890</small>
											</div>
										</div>

										<p>
											I am inquiring about this products for my factory, I need
											to automize the productions by the operators
										</p>

										<hr />

										<Row>
											<div className='col-xl-2 col-6'>
												<Card>
													<img
														className='card-img-top img-fluid'
														src={img3}
														alt='Card'
													/>
													<div className='py-2 text-center'>
														<Link to='' className='font-weight-medium'>
															Inquiry Product 1
														</Link>
													</div>
												</Card>
											</div>
											<div className='col-xl-2 col-6'>
												<Card>
													<img
														className='card-img-top img-fluid'
														src={img4}
														alt='Card'
													/>
													<div className='py-2 text-center'>
														<Link to='' className='font-weight-medium'>
															Inquiry Product 2
														</Link>
													</div>
												</Card>
											</div>
										</Row>
										<a
											href='mailto:johndoe@domain.com'
											className='btn btn-secondary waves-effect mt-4'
										>
											<i className='mdi mdi-reply'></i> Reply
										</a>
									</CardBody>
								</Card>
							</div>
						</div>
					</Row>
				</div>
			</React.Fragment>
		);
	}
}

export default EmailRead;
