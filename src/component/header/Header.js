import React, { useState } from 'react';
import {MenuOutlined} from '@ant-design/icons';
import "./header.css";
function Header() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className='header-container'>
      <div className='logo-container'>
        <a className='logo' 
           target= "_blank"
           href= "https://favourcj-portfolio.firebaseapp.com/"> FavourCJ </a>
        </div>
        <button 
            className='mobile-menu-icon'
            onClick={() =>{
              setShowMenu(!showMenu)
            }}>
          <MenuOutlined />
          </button>

      <div className='menu-container' id ={showMenu ? "hidden": "menu-container"}>
      <div className='menu-body'>
        <a className='menu-link' href='/'> Home </a>
        <a className='menu-link' href='/all-products'> Products </a>
        <a className='menu-link' href=''> About Us </a>
        <a className='menu-link' href=''> Contact Us </a>
        <a className='login' href='/login'> Login </a>
        <a className='signUp' href='/register'> Sign Up </a>

       </div>
      </div>

    
    </div>
  )
}

export default Header