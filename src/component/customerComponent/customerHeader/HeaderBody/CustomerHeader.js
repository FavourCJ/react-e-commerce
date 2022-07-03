import React from 'react'
import { SearchOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import "./customerHeader.css"
import CustomerMenu from "../customerMenu/CustomerMenu"
function CustomerHeader() {
  return (
    <div>
    <div className='customer-header-body-container'>
      <div className='customer-header-logo'>
        <a className='customer-header-logo-link' 
           target= "_blank"
           href= "https://favourcj-portfolio.firebaseapp.com/"> FavourCJ </a>
      </div>
      <div className='search-bar-container'>
        <input 
        className='search-bar'/>
        <button className='search-bar-btn'><SearchOutlined /></button>
      </div>
      <div className='wishlist-cart-container'>
        <div className='whishlist-container'>    
          <a href = "" className='heart-icon'><HeartOutlined /></a>
          <p className='heart-icon-num'>1</p>
        </div>

        <div className='cart-container'>
          <a href='' className='cart-icon'><ShoppingCartOutlined /></a>
          <p className='heart-icon-num'>1</p>
        </div>
      </div>
      
    </div>
    <CustomerMenu/>
    </div>
  )
}

export default CustomerHeader