import React from 'react';
import { Link } from 'react-router-dom';

// import images
import logodarkImg from '../../assets/images/logo-dark.png';
import logosmImg from '../../assets/images/logo-sm.png';
import logosmLightImg from '../../assets/images/logo-sm-light.png';
import logolightImg from '../../assets/images/logo-light.png';

// Import other Dropdown
import NotificationDropdown from '../../components/NotificationDropdown';
import ProfileMenu from '../../components/ProfileMenu';

const TopBar = ({ openLeftMenuCallBack, toggleRightSidebar }) => {
  /**
   * Toggle sidebar
   */
  const toggleMenu = () => {
    // this.props.toggleMenuCallback();
    openLeftMenuCallBack();
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
              <Link to='/' className='logo logo-dark'>
                <span className='logo-sm'>
                  <img src={logosmImg} alt='' height='50' />
                </span>
                <span className='logo-lg'>
                  <img src={logodarkImg} alt='' height='40' />
                </span>
              </Link>

              <Link to='/' className='logo logo-light'>
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
              className='btn btn-sm mr-2 font-size-24 d-lg-none header-item waves-effect waves-light'
              onClick={toggleMenu}
            >
              <i className='mdi mdi-menu'></i>
            </button>
          </div>

          <div className='d-flex'>
            <div className='dropdown d-none d-lg-inline-block'>
              <button
                type='button'
                className='btn header-item noti-icon waves-effect'
                onClick={toggleFullscreen}
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

            <div className='dropdown d-inline-block'>
              <button
                type='button'
                onClick={toggleRightbar}
                className='btn header-item noti-icon right-bar-toggle waves-effect'
              >
                <i className='bx bx-cog bx-spin'></i>
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default TopBar;
