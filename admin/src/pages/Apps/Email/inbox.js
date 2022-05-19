import React from 'react';
// import SettingMenu from '../../Shared/SettingMenu';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'reactstrap';

// Static Images

const EmailInbox = () => {
	return (
		<React.Fragment>
			<div className='container-fluid'>
				<Row className='align-items-center'>
					<Col sm={12}>
						<div className='page-title-box'>
							<h4 className='font-size-18'>Inbox</h4>
							<ol className='breadcrumb mb-0'>
								<li className='breadcrumb-item'>
									<Link to='/'>Ferocious Media</Link>
								</li>
								<li className='breadcrumb-item'>
									<Link to='/email-inbox'>Inquiries</Link>
								</li>
								<li className='breadcrumb-item active'>Inbox</li>
							</ol>
						</div>
					</Col>
				</Row>

				<Row>
					<div className='col-12'>
						<div className='email-leftbar card'>
							<div className='mail-list mt-4'>
								<Link to='#' className='active'>
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
								<ul className='message-list'>
									<li>
										<div className='col-mail col-mail-1'>
											<div className='checkbox-wrapper-mail'>
												<input type='checkbox' id='chk8' />
												<label htmlFor='chk8' className='toggle'></label>
											</div>
											<Link to='email-read' className='title'>
												John Doe
											</Link>
											<span className='star-toggle far fa-star'></span>
										</div>
										<div className='col-mail col-mail-2'>
											<Link to='email-read' className='subject'>
												<span className='badge-primary badge mr-2'>
													3 Items
												</span>
												johndoe@mail.com –
												<span className='teaser'>
													I am inquiring about this products for my factory, I
													need to automize the productions by the operators
												</span>
											</Link>
											<div className='date'>Feb 28</div>
										</div>
									</li>
								</ul>
							</Card>
							<Row className='mt-4'>
								<div className='col-7'>Showing 1 - 20 of 524</div>
								<div className='col-5'>
									<div className='btn-group float-right'>
										<button
											type='button'
											className='btn btn-sm btn-success waves-effect'
										>
											<i className='fa fa-chevron-left'></i>
										</button>
										<button
											type='button'
											className='btn btn-sm btn-success waves-effect'
										>
											<i className='fa fa-chevron-right'></i>
										</button>
									</div>
								</div>
							</Row>
						</div>
					</div>
				</Row>
			</div>
		</React.Fragment>
	);
};

export default EmailInbox;
