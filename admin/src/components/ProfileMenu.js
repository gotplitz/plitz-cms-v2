import React, { useEffect, useState } from 'react';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';

// actions
import { logOut, postActivity, requestUser } from '../store/actions';

// users
import ferociousLogo from '../assets/images/user-place-holder.jpg';
import { useDispatch, useSelector } from 'react-redux';

const ProfileMenu = () => {
	const dispatch = useDispatch();
	const [menu, setMenu] = useState(false);

	const Login = useSelector((state) => state.Login);
	const { user, isAuthenticated } = Login;

	const toggle = () => {
		if (menu) {
			setMenu(false);
		} else {
			setMenu(true);
		}
	};

	const LogOut = (e) => {
		e.preventDefault();
		dispatch(
			postActivity({
				logtype: 'warning',
				logcontent: `User ${user && user.fullname} left the CMS`,
				email: user ? user.email : '',
			})
		);
		dispatch(logOut());
	};

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(requestUser());
		}
	}, [dispatch, isAuthenticated]);

	return (
		<React.Fragment>
			<Dropdown isOpen={menu} toggle={toggle} className='d-inline-block'>
				<DropdownToggle
					className='btn header-item waves-effect'
					id='page-header-user-dropdown'
					tag='button'
				>
					<div className='rounded-circle header-profile-user'>
						<img
							className='actual-image'
							src={user && user.photo !== '' ? `${user.photo}` : ferociousLogo}
							alt='Header Avatar'
						/>
					</div>
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem
						tag='a'
						href='https://apollo.ferociousmediaweb.com/'
						target='_blank'
					>
						<i className='mdi mdi-home-export-outline font-size-17 align-middle mr-1'></i>
						Website
					</DropdownItem>
					{/* <DropdownItem tag='a' href='#'>
					<span className='badge badge-success float-right'>11</span>
						<i className='mdi mdi-account-circle font-size-17 align-middle mr-1'></i>
						Profile
					</DropdownItem> */}
					<DropdownItem tag='a' href='#'>
						<i className='mdi mdi-settings-outline font-size-17 align-middle mr-1'></i>
						User Settings
					</DropdownItem>
					<div className='dropdown-divider'></div>
					<button onClick={(e) => LogOut(e)} className='dropdown-item'>
						<i className='mdi mdi-logout font-size-17 align-middle mr-1'></i>
						<span>Logout</span>
					</button>
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	);
};

export default withRouter(ProfileMenu);
