import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext'

function MenuBar() {
    const { user, logout} = useContext(AuthContext)
    const pathname = window.location.pathname;
    const activeLink = pathname === '/' ? 'home' : pathname.substr(1); 
    const [activeItem, setActiveItem] = useState(activeLink);
    const handleItemClick = (e, { name }) => setActiveItem(name);

//   render() {
//     const { activeItem } = this.state

    return (
        <Menu pointing secondary>
          {user && <Menu.Item name={user.username} active  to="/" />}
          
          <Menu.Menu position='right'>
          {!user && <Menu.Item name='login' active={activeItem === 'login'} onClick={handleItemClick} as={Link} to="/login" />}
            {user && <Menu.Item name='logout' onClick={logout} as={Link} to="/login" />}
            {!user && <Menu.Item name='register' active={activeItem === 'register'} onClick={handleItemClick} as={Link} to="/register" />}
          </Menu.Menu>
        </Menu>
    )
//   }
}

export default MenuBar;