import React from 'react'
import './Header.css';
import FUS_Logo from './FUS_LOGO_3.jpg';

function Header() {
    return (
        <header className="custom-header py-3 sticky-top">
            <img src={FUS_Logo} alt='FUS Logo' className="image" />
            <h2>SyllAble</h2>
        </header>
    )
}

export default Header