import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CustomInput, FormGroup, Label } from 'reactstrap';

//SimpleBar
import SimpleBar from 'simplebar-react';

import {
  hideRightSidebar,
  changeLayout,
  changeLayoutWidth,
  changeTopbarTheme,
  changeSidebarType,
  changeSidebarTheme,
} from '../store/layout/actions';

const RightSidebar = () => {
  const dispatch = useDispatch();
  const [layoutTypeLs, setLayoutTypeLs] = useState(
    localStorage.getItem('layoutType') ? localStorage.getItem('layoutType') : ''
  );
  const [layoutWidthLs, setLayoutWidthLs] = useState(
    localStorage.getItem('layoutWidth')
      ? localStorage.getItem('layoutWidth')
      : ''
  );
  const [topbarThemeLs, setTopbarThemeLs] = useState(
    localStorage.getItem('topbarTheme')
      ? localStorage.getItem('topbarTheme')
      : ''
  );
  const [sidebarTypeLs, setSidebarTypeLs] = useState(
    localStorage.getItem('leftSideBarType')
      ? localStorage.getItem('leftSideBarType')
      : ''
  );
  const [sidebarThemeLs, setSidebarThemeLs] = useState(
    localStorage.getItem(' sidebarTheme')
      ? localStorage.getItem(' sidebarTheme')
      : ''
  );

  const Layout = useSelector((state) => state.Layout);
  const {
    layoutType,
    layoutWidth,
    topbarTheme,
    leftSideBarType,
    leftSideBarTheme,
  } = Layout;

  useEffect(() => {
    localStorage.setItem('layoutType', layoutType);
    localStorage.setItem('layoutWidth', layoutWidth);
    localStorage.setItem('topbarTheme', topbarTheme);
    localStorage.setItem('leftSideBarType', leftSideBarType);
    localStorage.setItem('leftSideBarTheme', leftSideBarTheme);
  }, [layoutType, layoutWidth, topbarTheme, leftSideBarType, leftSideBarTheme]);

  useEffect(() => {
    if (!localStorage.getItem('layoutType')) {
      setLayoutTypeLs(layoutType);
    }
    if (!localStorage.getItem('layoutWidth')) {
      setLayoutTypeLs(layoutWidth);
    }
    if (!localStorage.getItem('topbarTheme')) {
      setTopbarThemeLs(topbarTheme);
    }
    if (!localStorage.getItem('leftSideBarType')) {
      setSidebarTypeLs(leftSideBarType);
    }
    if (!localStorage.getItem('leftSideBarTheme')) {
      setSidebarThemeLs(leftSideBarTheme);
    }

    // eslint-disable-next-line
  }, []);

  /**
   * Hides the right sidebar
   */
  const hideRightbar = () => {
    dispatch(hideRightSidebar());
  };

  /**
   * Change the layout
   * @param {*} e
   */
  const changeLayoutClick = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      localStorage.setItem('layoutType', e.target.value);
      setLayoutTypeLs(e.target.value);
    }
  };

  /**
   * Changes layout width
   * @param {*} e
   */
  const changeLayoutWidthClick = (e) => {
    if (e.target.checked) {
      localStorage.setItem('layoutWidth', e.target.value);
      setLayoutWidthLs(e.target.value);
    }
  };

  // change topbar theme
  const changeTopbarThemeClick = (e) => {
    if (e.target.checked) {
      localStorage.setItem('topbarTheme', e.target.value);
      setTopbarThemeLs(e.target.value);
    }
  };

  // change left sidebar design
  const changeLeftSidebarTypeClick = (e) => {
    if (e.target.checked) {
      localStorage.setItem('leftSideBarType', e.target.value);
      setSidebarTypeLs(e.target.value);
    }
  };

  // change left sidebar theme
  const changeLeftSidebarThemeClick = (e) => {
    if (e.target.checked) {
      localStorage.setItem('leftSideBarTheme', e.target.value);
      setSidebarThemeLs(e.target.value);
    }
  };

  useEffect(() => {
    dispatch(changeLayout(localStorage.getItem('layoutType')));
    dispatch(changeLayoutWidth(localStorage.getItem('layoutWidth')));
    dispatch(changeTopbarTheme(localStorage.getItem('topbarTheme')));
    dispatch(changeSidebarType(localStorage.getItem('leftSideBarType')));
    dispatch(changeSidebarTheme(localStorage.getItem('leftSideBarTheme')));

    // eslint-disable-next-line
  }, [
    layoutTypeLs,
    layoutWidthLs,
    topbarThemeLs,
    sidebarTypeLs,
    sidebarThemeLs,
  ]);

  return (
    <React.Fragment>
      <div className='right-bar'>
        <SimpleBar style={{ height: '900px' }}>
          <div data-simplebar className='h-100'>
            <div className='rightbar-title px-3 py-4'>
              <Link
                to='#'
                onClick={hideRightbar}
                className='right-bar-toggle float-right'
              >
                <i className='mdi mdi-close noti-icon'></i>
              </Link>
              <h5 className='m-0'>Settings</h5>
            </div>

            <hr className='my-0' />

            <div className='p-4'>
              <FormGroup>
                <Label for='layout'>Layouts</Label>

                <div>
                  <CustomInput
                    type='radio'
                    id='verticalLayout'
                    name='layout'
                    label='Vertical'
                    value='vertical'
                    checked={
                      layoutTypeLs === 'vertical' || layoutType === 'vertical'
                        ? true
                        : false
                    }
                    onChange={(e) => changeLayoutClick(e)}
                  />
                  <CustomInput
                    type='radio'
                    id='horizontalLayout'
                    name='layout'
                    label='Horizontal'
                    value='horizontal'
                    checked={
                      layoutTypeLs === 'horizontal' ||
                      layoutType === 'horizontal'
                        ? true
                        : false
                    }
                    onChange={(e) => changeLayoutClick(e)}
                  />
                </div>
              </FormGroup>

              <hr />

              <FormGroup>
                <Label for='layout'>Layout Width</Label>
                <div>
                  <CustomInput
                    type='radio'
                    id='fluid'
                    name='layoutWidth'
                    label='Fluid'
                    value='fluid'
                    checked={
                      layoutWidthLs === 'fluid' || layoutWidth === 'fluid'
                        ? true
                        : false
                    }
                    onChange={(e) => changeLayoutWidthClick(e)}
                  />
                  <CustomInput
                    type='radio'
                    id='boxed'
                    name='layoutWidth'
                    label='Boxed'
                    value='boxed'
                    checked={
                      layoutWidthLs === 'boxed' || layoutWidth === 'boxed'
                        ? true
                        : false
                    }
                    onChange={(e) => changeLayoutWidthClick(e)}
                  />
                </div>
              </FormGroup>

              <hr />
              <FormGroup>
                <Label>Topbar Theme</Label>
                <div>
                  <CustomInput
                    type='radio'
                    id='topbar-light'
                    name='topbar-theme'
                    label='Light'
                    value='light'
                    checked={
                      topbarThemeLs === 'light' || topbarTheme === 'light'
                        ? true
                        : false
                    }
                    onChange={(e) => changeTopbarThemeClick(e)}
                  />

                  <CustomInput
                    type='radio'
                    id='topbar-dark'
                    name='topbar-theme'
                    label='Dark'
                    value='dark'
                    checked={
                      topbarThemeLs === 'dark' || topbarTheme === 'dark'
                        ? true
                        : false
                    }
                    onChange={(e) => changeTopbarThemeClick(e)}
                  />
                </div>
              </FormGroup>

              {layoutType === 'vertical' ? (
                <React.Fragment>
                  <hr />
                  <FormGroup>
                    <Label>Left Sidebar Type</Label>
                    <div>
                      <CustomInput
                        type='radio'
                        id='defaultSidebar'
                        name='type'
                        label='Default'
                        value='default'
                        checked={
                          sidebarTypeLs === 'default' ||
                          leftSideBarType === 'default'
                            ? true
                            : false
                        }
                        onChange={(e) => changeLeftSidebarTypeClick(e)}
                      />
                      <CustomInput
                        type='radio'
                        id='compactSidebar'
                        name='type'
                        label='Compact'
                        value='compact'
                        checked={
                          sidebarTypeLs === 'compact' ||
                          leftSideBarType === 'compact'
                            ? true
                            : false
                        }
                        onChange={(e) => changeLeftSidebarTypeClick(e)}
                      />
                      <CustomInput
                        type='radio'
                        id='iconSidebar'
                        name='type'
                        label='Icon'
                        value='icon'
                        checked={
                          sidebarTypeLs === 'icon' || leftSideBarType === 'icon'
                            ? true
                            : false
                        }
                        onChange={(e) => changeLeftSidebarTypeClick(e)}
                      />
                    </div>
                  </FormGroup>

                  <hr />

                  <FormGroup>
                    <Label>Left Sidebar Theme</Label>
                    <div>
                      <CustomInput
                        type='radio'
                        id='light'
                        name='theme'
                        label='Light'
                        value='light'
                        checked={
                          sidebarThemeLs === 'light' ||
                          leftSideBarTheme === 'light'
                            ? true
                            : false
                        }
                        onChange={(e) => changeLeftSidebarThemeClick(e)}
                      />
                      <CustomInput
                        type='radio'
                        id='colored'
                        name='theme'
                        label='Colored'
                        value='colored'
                        checked={
                          sidebarThemeLs === 'colored' ||
                          leftSideBarTheme === 'colored'
                        }
                        onChange={(e) => changeLeftSidebarThemeClick(e)}
                      />
                      <CustomInput
                        type='radio'
                        id='dark'
                        name='theme'
                        label='Dark'
                        value='dark'
                        checked={
                          sidebarThemeLs === 'dark' ||
                          leftSideBarTheme === 'dark'
                        }
                        onChange={(e) => changeLeftSidebarThemeClick(e)}
                      />
                    </div>
                  </FormGroup>
                </React.Fragment>
              ) : null}
            </div>
          </div>
        </SimpleBar>
      </div>
      {/* Right bar overlay */}
      <div className='rightbar-overlay'></div>
    </React.Fragment>
  );
};

export default RightSidebar;
