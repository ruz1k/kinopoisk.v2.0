import React from 'react'
import { NavLink } from 'react-router-dom'
import './header.sass'

const Header = () => {
    return (
        <header>
            <div className='header__container'>
                <NavLink activeClassName='logo-no-active' to='/'>
                    <span>Soft</span>
                    <span>Artel</span>
                    <span>Film</span>
                </NavLink>
            </div>
        </header>
    )
}

export default Header;