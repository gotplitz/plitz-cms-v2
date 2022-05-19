import React from 'react';
import { Link } from 'react-router-dom';

// Logo
import logoSm from '../assets/images/logo-sm.png';

const AuthHeader = ({ title, intro }) => {
    return (
        <div className='bg-primary'>
            <div className='text-primary text-center p-4'>
                <h5 className='text-white font-size-20'>{title}</h5>
                <p className='text-white-50'>{intro}</p>
                <Link to='/' className='logo logo-admin'>
                    <img src={logoSm} width='80' height='auto' alt='logo' />
                </Link>
            </div>
        </div>
    );
};

export default AuthHeader;
