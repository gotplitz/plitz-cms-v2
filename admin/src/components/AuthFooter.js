import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter = ({ text, button, buttonlabel }) => {
  return (
    <div className='mt-5 text-center'>
      <p>
        {text}
        <Link to={button} className='font-weight-medium text-primary'>
          {buttonlabel}
        </Link>{' '}
      </p>
      <p>
        © {new Date().getFullYear()} Ferocious Media. CMS 2.0.1{' '}
        <i className='mdi mdi-paw'></i>
      </p>
    </div>
  );
};

export default AuthFooter;
