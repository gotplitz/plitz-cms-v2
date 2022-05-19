import React from 'react';

const Footer = () => {
	return (
		<React.Fragment>
			<footer className='footer'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-12'>
							© {new Date().getFullYear()} Ferocious Media.
							<span className='d-none d-sm-inline-block'>
								{' '}
								<i className='mdi mdi-paw'></i>
							</span>
						</div>
					</div>
				</div>
			</footer>
		</React.Fragment>
	);
};

export default Footer;
