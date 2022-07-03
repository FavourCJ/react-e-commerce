import React, { useContext } from 'react'
import { ProductContext } from '../../component/contextFile/ProductContext';
import Footer from '../../component/generalComponent/footer/Footer';
import Header from '../../component/generalComponent/header/Header';
import SubscribeSection from "../../component/generalComponent/subscribeSection/SubscribeSection"
import ProductListLanding from '../../component/generalComponent/productList-landingPage/ProductListLanding';
import "./landing.css";

function Landing() {
  const {isLoggedIn} = useContext(ProductContext);
  return (
    <div className='landing-container'>
      {isLoggedIn}
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