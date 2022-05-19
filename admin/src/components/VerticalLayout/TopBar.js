import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
	DropdownItem,
	DropdownMenu,
	Dropdown,
	DropdownToggle,
} from 'reactstrap';

// import images
import logodarkImg from '../../assets/images/logo-dark.png';
import logosmImg from '../../assets/images/logo-sm.png';
import logosmLightImg from '../../assets/images/logo-sm-light.png';
import logolightImg from '../../assets/images/logo-light.png';

// Import other Dropdown
import NotificationDropdown from '../../components/NotificationDropdown';
import ProfileMenu from '../../components/ProfileMenu';

const TopBar = ({ toggleMenuCallback, toggleRightSidebar }) => {
	const [createMenu, setCreateMenu] = useState(false);

	/**
	 * Toggle sidebar
	 */
	const openActions = () => {
		if (createMenu) {
			setCreateMenu(false);
		} else {
			setCreateMenu(true);
		}
	};

	/**
	 * Toggle sidebar
	 */
	const toggleMenu = () => {
		toggleMenuCallback();
	};

	/**
	 * Toggles the sidebar
	 */
	const toggleRightbar = () => {
		toggleRightSidebar();
	};

	/**
	 * Toggle full screen
	 */
	const toggleFullscreen = () => {
		if (
			!document.fullscreenElement &&
			/* alternative standard method */ !document.mozFullScreenElement &&
			!document.webkitFullscreenElement
		) {
			// current working methods
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(
					Element.ALLOW_KEYBOARD_INPUT
				);
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	};

	return (
		<React.Fragment>
			<header id='page-topbar'>
				<div className='navbar-header'>
					<div className='d-flex'>
						<div className='navbar-brand-box'>
							<Link to='/dashboard' className='logo logo-dark'>
								<span className='logo-sm'>
									<img src={logosmImg} alt='' height='50' />
								</span>
								<span className='logo-lg'>
									<img src={logodarkImg} alt='' height='40' />
								</span>
							</Link>

							<Link to='/dashboard' className='logo logo-light'>
								<span className='logo-sm'>
									<img src={logosmLightImg} alt='' height='50' />
								</span>
								<span className='logo-lg'>
									<img src={logolightImg} alt='' height='40' />
								</span>
							</Link>
						</div>
						<button
							type='button'
							onClick={toggleMenu}
							className='btn btn-sm px-3 font-size-24 header-item waves-effect'
							id='vertical-menu-btn'
						>
							<i className='mdi mdi-menu'></i>
						</button>

						<div className='d-none d-sm-block'>
							<Dropdown
								isOpen={createMenu}
								toggle={openActions}
								className='pt-3 d-inline-block'
							>
								<DropdownToggle className='btn btn-secondary' tag='button'>
									Create <i className='mdi mdi-chevron-down'></i>
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem tag='a' href='/add-page'>
										New Page
									</DropdownItem>
									<DropdownItem tag='a' href='/add-blogpost'>
										Blog Post
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					</div>

					<div className='d-flex'>
						<div className='dropdown d-none d-lg-inline-block'>
							<button
								type='button'
								className='btn header-item noti-icon waves-effect'
								onClick={toggleFullscreen}
								data-toggle='fullscreen'
							>
								<i className='mdi mdi-fullscreen'></i>
							</button>
						</div>

						<NotificationDropdown />

						<ProfileMenu />

						<div className='dropdown d-inline-block'>
							<button
								type='button'
								onClick={toggleRightbar}
								className='btn header-item noti-icon right-bar-toggle waves-effect'
							>
								<i className='mdi mdi-settings-outline'></i>
							</button>
						</div>
					</div>
				</div>
			</header>
		</React.Fragment>
	);
};

export default TopBar;
