import React, { useEffect } from 'react';
import { Collapse } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import classname from 'classnames';

const Navbar = ({ menuOpen, setIsMenuOpened, windowWidth }) => {
	const location = useLocation();

	useEffect(() => {
		var matchingMenuItem = null;
		var ul = document.getElementById('navigation');
		var items = ul.getElementsByTagName('a');
		for (var i = 0; i < items.length; ++i) {
			if (location.pathname === items[i].pathname) {
				matchingMenuItem = items[i];
				break;
			}
		}
		if (matchingMenuItem) {
			activateParentDropdown(matchingMenuItem);
		}
	});

	const activateParentDropdown = (item) => {
		item.classList.add('active');
		const parent = item.parentElement;

		if (parent) {
			parent.classList.add('active'); // li
			const parent2 = parent.parentElement;
			parent2.classList.add('active'); // li
			const parent3 = parent2.parentElement;
			if (parent3) {
				parent3.classList.add('active'); // li
				const parent4 = parent3.parentElement;
				if (parent4) {
					parent4.classList.add('active'); // li
					const parent5 = parent4.parentElement;
					if (parent5) {
						parent5.classList.add('active'); // li
					}
				}
			}
		}
		return false;
	};

	return (
		<React.Fragment>
			<div className='topnav'>
				<div className='container-fluid'>
					<nav className='navbar navbar-light navbar-expand-lg topnav-menu'>
						<Collapse
							isOpen={menuOpen}
							onClick={(e) => {
								e.preventDefault();
								if (windowWidth < 992) {
									setIsMenuOpened(true);
								}
							}}
							className='navbar-collapse'
						>
							<div id='navigation'>
								<ul className='navbar-nav'>
									<li className='nav-item'>
										<Link className='nav-link' to='/dashboard'>
											<i className='ti-home mr-2'></i>Dashboard
										</Link>
									</li>

									<li className='nav-item dropdown'>
										<Link
											className='nav-link dropdown-toggle arrow-none'
											to='#!'
										>
											<i className='ti-layout-media-overlay-alt mr-2'></i>
											Products
										</Link>

										<div
											className={classname('dropdown-menu', {
												show: menuOpen,
											})}
										>
											<div className='dropdown'>
												<Link
													to='#!'
													className='dropdown-item dropdown-toggle arrow-none'
												>
													Folders <div className='arrow-down'></div>
												</Link>
												<div
													className={classname('dropdown-menu', {
														show: menuOpen,
													})}
													aria-labelledby='topnav-products'
												>
													<Link to='add-folder' className='dropdown-item'>
														Add New
													</Link>
													<Link to='all-folders' className='dropdown-item'>
														All Folders
													</Link>
												</div>
											</div>
											<div className='dropdown'>
												<Link
													to='#!'
													className='dropdown-item dropdown-toggle arrow-none'
												>
													Series <div className='arrow-down'></div>
												</Link>
												<div
													className={classname('dropdown-menu', {
														show: menuOpen,
													})}
													aria-labelledby='topnav-products'
												>
													<Link to='add-serie' className='dropdown-item'>
														Add New
													</Link>
													<Link to='all-series' className='dropdown-item'>
														All Series
													</Link>
												</div>
											</div>
											<div className='dropdown'>
												<Link
													to='#!'
													className='dropdown-item dropdown-toggle arrow-none'
												>
													Categories <div className='arrow-down'></div>
												</Link>
												<div
													className={classname('dropdown-menu', {
														show: menuOpen,
													})}
													aria-labelledby='topnav-products'
												>
													<Link to='add-category' className='dropdown-item'>
														Add New
													</Link>
													<Link to='all-categories' className='dropdown-item'>
														All Categories
													</Link>
												</div>
											</div>
											<div className='dropdown'>
												<Link
													to='#!'
													className='dropdown-item dropdown-toggle arrow-none'
												>
													Products <div className='arrow-down'></div>
												</Link>
												<div
													className={classname('dropdown-menu', {
														show: menuOpen,
													})}
													aria-labelledby='topnav-products'
												>
													<Link to='add-product' className='dropdown-item'>
														Add New
													</Link>
													<Link to='all-products' className='dropdown-item'>
														All Products
													</Link>
												</div>
											</div>
										</div>
									</li>

									<li className='nav-item dropdown'>
										<Link
											className='nav-link dropdown-toggle arrow-none'
											to='#!'
										>
											<i className='ti-panel mr-2'></i>Settings
										</Link>

										<div
											className={classname('dropdown-menu', { show: menuOpen })}
										>
											<div className='row'>
												<div className='col-lg-6'>
													<div>
														<Link to='activity' className='dropdown-item'>
															Activity
														</Link>
													</div>
												</div>
											</div>
										</div>
									</li>

									<li className='nav-item dropdown mega-dropdown'>
										<Link
											className='nav-link dropdown-toggle arrow-none'
											to='#!'
										>
											<i className='ti-package mr-2'></i>Content
										</Link>

										<div
											className={classname(
												'dropdown-menu mega-dropdown-menu dropdown-menu-left dropdown-mega-menu-xl',
												{ show: menuOpen }
											)}
										>
											<div className='row'>
												<div className='col-lg-4'>
													<div>
														<Link to='all-pages' className='dropdown-item'>
															Pages
														</Link>
														<Link to='add-page' className='dropdown-item'>
															Add Page
														</Link>
													</div>
												</div>
												<div className='col-lg-4'>
													<div>
														<Link to='all-blogposts' className='dropdown-item'>
															Blog
														</Link>
														<Link to='add-blogpost' className='dropdown-item'>
															Add Plog Post
														</Link>
													</div>
												</div>
												<div className='col-lg-4'>
													<div>
														<Link to='all-noticias' className='dropdown-item'>
															News
														</Link>
														<Link to='add-noticia' className='dropdown-item'>
															Add News Item
														</Link>
													</div>
												</div>
											</div>
										</div>
									</li>

									<li className='nav-item dropdown'>
										<Link
											className='nav-link dropdown-toggle arrow-none'
											to='#!'
										>
											<i className='ti-harddrives mr-2'></i>From Website
										</Link>

										<div
											className={classname('dropdown-menu', {
												show: menuOpen,
											})}
										>
											<div className='dropdown'>
												<Link
													to='#!'
													className='dropdown-item dropdown-toggle arrow-none'
												>
													Email <div className='arrow-down'></div>
												</Link>
												<div
													className={classname('dropdown-menu', {
														show: menuOpen,
													})}
													aria-labelledby='topnav-email'
												>
													<Link to='email-inbox' className='dropdown-item'>
														Inbox
													</Link>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</Collapse>
					</nav>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Navbar;
