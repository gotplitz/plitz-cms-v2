import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';

// Parts
import AuthFooter from '../../components/AuthFooter';
import AuthHeader from '../../components/AuthHeader';

// Actions
import { logOut } from '../../store/actions';

const NotApproved = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());

    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className='account-pages pt-5'>
        <div className='container'>
          <Row className='justify-content-center'>
            <Col md={8} lg={6} xl={5}>
              <div className='position-relative'>
                <Card className='overflow-hidden'>
                  <AuthHeader
                    title='Pending for Approval'
                    intro={`Your access hasn't been approved yet`}
                  />

                  <CardBody className='p-5'>
                    <div className='pt-5'>
                      For security reasons, new registrants must be approved by
                      CMS administrator, please contact Ferocious Media via
                      chat, email form or by phone following this{' '}
                      <a
                        href='https://ferociousmedia.com/contact-us/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        link
                      </a>
                      .
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </div>

        <AuthFooter
          text={`Try again `}
          button={`pages-login`}
          buttonlabel={`Login`}
        />
      </div>
    </React.Fragment>
  );
};

export default NotApproved;
