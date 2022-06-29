import React, { useContext } from 'react'
import { ProductContext } from '../../component/contextFile/ProductContext';
import Footer from '../../component/footer/Footer';
import Header from '../../component/header/Header';
import ProductListLanding from '../../component/productList-landingPage/ProductListLanding';
import SubscribeSection from "../../component/subscribeSection/SubscribeSection";
import "./landing.css"

function Landing() {
  const {isLoggedIn} = useContext(ProductContext);
  return (
    <div className='landing-container'>
      {isLoggedIn}
      <Header/>
      <div className='project-progress'>
      <label>Project progress:</label>
     <progress id="file" value="75" max="100" className='project-bar'></progress><p className='progress-span'>75%</p>
      </div>
 
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