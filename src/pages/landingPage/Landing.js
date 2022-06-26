import React from 'react'
import Footer from '../../component/footer/Footer';
import Header from '../../component/header/Header';
import ProductListLanding from '../../component/productList-landingPage/ProductListLanding';
import ProductList from '../../component/productList/ProductList';
import SubscribeSection from "../../component/subscribeSection/SubscribeSection";
import "./landing.css"
function Landing() {
  return (
    <div className='landing-container'>
      <Header/>
      <div className='image-container'>
        <img alt='background' src='./bgg.png' className='image'/>
        <p className='description-img'> I do not own this image</p>
      </div>
      <div className='landing-product-list-section'>
        <p className='landing-product-list-p'>Item Section <span> <a href='/all-products' className='landing-product-list-a'>View all item</a></span></p>
        <ProductListLanding/>
      </div>
      <div className='contactSection-Product'>
        <SubscribeSection/>
      </div>
      <Footer/>
    </div>
  )
}

export default Landing