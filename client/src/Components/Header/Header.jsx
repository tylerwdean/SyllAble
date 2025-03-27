import React from 'react'
import './Header.css';
import FUS_Logo from './FUS_LOGO_3.jpg';

function Header() {
    return (
        <header className="custom-header py-3 sticky-top">
            <img src={FUS_Logo} alt='FUS Logo' className="image" />
            <h2 className='mb-3'>SyllAble</h2>
            <h4>Where you're able to build a Syllabus</h4>
        </header>
    )
}

export default Header