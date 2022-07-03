import React, {useContext, useEffect, useState } from 'react';
import {MenuOutlined} from '@ant-design/icons';
import { 
  SearchOutlined, 
  ShoppingCartOutlined, 
  HeartOutlined, 
  LinkedinOutlined,
  GithubOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons';
import "./header.css"
import { ProductContext } from '../../contextFile/ProductContext';

function Header() {

  const { getCartArray, cartArray, wishListArray, getWishList} = useContext(ProductContext); 
  const [showMenu, setShowMenu] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [cartNum, setCartNum] = useState();
  const [wishNum, setWishNum] = useState(0);
  
  //check login dtatus
  const checkeLoginStatus = () =>{
    if(localStorage.getItem('loggedUser') === "true"){
      setShowButtons(true)
    }
  }

  //set cart number
  const numFunction = () =>{
    if (cartArray){
      setCartNum(cartArray.length);
    }else if (!cartArray){
      setCartNum(0)
    }

    if(wishListArray){
      setWishNum(wishListArray.length)
    }else if (!wishListArray){
      setWishNum(0)

    }
  }

  useEffect(() =>{
    checkeLoginStatus();
    getCartArray();
    getWishList();  
  },[]);

  useEffect(() =>{
    numFunction();
  })

  return (
    <div className='header-container'>
          <div className='top-menu-container'>
            <a href='' className='top-menu-link'><LinkedinOutlined /></a>
            <a href='' className='top-menu-link'><GithubOutlined /></a>
            <a href='' className='top-menu-link'><MailOutlined /></a>
            
     </div>

          <div className='logo-menu-link-container'>
          <div className='logo-container'>
          <a className='logo' 
           target= "_blank"
           href= "https://favourcj-portfolio.firebaseapp.com/"> FavourCJ </a>
        </div>

        <div className='menu-container' id ={showMenu ? "hidden": "menu-container"}>
      <div className='menu-body'>
        <a className='menu-link' href='/'> Home </a>
       
        <div className="dropdown">
       <a className ="dropbtn-menu">
       <p className='menu-link'> Products </p>
       </a>

      <div className="dropdown-menu-content">
      <a className='dropdown-menu-link' href='/female-collection'> Women Collection</a>
      <a className='dropdown-menu-link' href='/male-collection'> Men Collection</a>
      <a className='dropdown-menu-link' href='/other-collection'> Other Collection </a>
    </div>
   </div>
    <a className='menu-link' href='/'> Contact Us  </a>
      <a className='menu-link' href='/'> About Us  </a>
      <a className='login' href='/login' id = {showButtons ? "hide-login-signUp" : "nnbn"}> Login </a>
      <a className='signUp' href='/register' id = {showButtons ? "hide-login-signUp" : ""}> Sign Up </a>      
       </div>
      </div>

      <div className='wishlist-cart-search-container'>
      <div className='cart-container'>
          <a href='/your-account' className='cart-icon'>
          <UserOutlined style={{ color: 'black' }} id ={showButtons ? "show-avater": "hide-avater"}/>
          </a>
        </div>

      <div className='cart-container'>
          <button 
            className='search-icon'
           onClick={() =>{
            setShowSearch(!showSearch)
           }}>
              <SearchOutlined style={{ color: 'black' }} /></button>
        </div>

      <div className='whishlist-container'>
        <a className='heart-icon'><HeartOutlined style={{ color: 'black' }}/></a>
        <p className='heart-icon-num'>{wishNum}</p>
      </div>

      <div className='cart-container'>
          <a className='cart-icon' href='/add-to-cart'><ShoppingCartOutlined style={{ color: 'black' }}/></a>
          <p className='heart-icon-num'>{cartNum}</p>
        </div>
      </div>
      </div>

      <div className='search-bar-container' id = {showSearch ? "hide-search" : ""}>
        <input className='search-bar-input'/>
        <button className='search-bar-btn'><SearchOutlined /></button>
      </div>

     
          <button 
            className='mobile-menu-icon'
            onClick={() =>{
              setShowMenu(!showMenu)
            }}>
          <MenuOutlined />
          </button>
    
    </div>
  )
}

export default Header