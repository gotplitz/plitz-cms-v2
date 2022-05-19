import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
	changeLayout,
	changeTopbarTheme,
	toggleRightSidebar,
	changeLayoutWidth,
} from '../../store/actions';

// Other Layout related Component
import RightSidebar from '../../components/RightSidebar';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, topbarTheme, layoutWidth, showRightSidebar }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [isMeneOpened, setIsMenuOpened] = useState(false);
	const [windowWidth, setWindowWidth] = useState(992);

	/**
	 * Open/close right sidebar
	 */
	const toggleRightSidebarClick = () => {
		dispatch(toggleRightSidebar());
	};

	useEffect(() => {
		// Scrollto 0,0
		window.scrollTo(0, 0);
		setWindowWidth(window.innerWidth);

		const title = location.pathname;
		let currentage = title.charAt(1).toUpperCase() + title.slice(2);

		document.title =
			currentage +
			' | Ferocious Media - Responsive Bootstrap 4 Admin Dashboard';

		changeLayout('horizontal');
		if (topbarTheme) {
			dispatch(changeTopbarTheme(topbarTheme));
		}
		if (layoutWidth) {
			dispatch(changeLayoutWidth(layoutWidth));
		}
		if (showRightSidebar) {
			toggleRightSidebarClick();
		}

		// eslint-disable-next-line
	}, [topbarTheme, layoutWidth, showRightSidebar, dispatch]);

	/**
	 * Opens the menu - mobile
	 */
	const openMenu = () => {
		if (isMeneOpened) {
			setIsMenuOpened(false);
		} else {
			setIsMenuOpened(true);
		}
	};

	return (
		<React.Fragment>
			<div id='layout-wrapper'>
				<TopBar
					isMenuOpened={isMeneOpened}
					toggleRightSidebar={toggleRightSidebarClick}
					openLeftMenuCallBack={openMenu}
					windowWidth={windowWidth}
				/>
				<Navbar menuOpen={isMeneOpened} setIsMenuOpened={setIsMenuOpened} />

				<div className='main-content'>
					<div className='page-content'>{children}</div>
				</div>
				<Footer />
				<RightSidebar />
			</div>
		</React.Fragment>
	);
};

export default Layout;
