import React from 'react'
import "./customerHome.css"
import CustomerHeader from "../../../component/customerComponent/customerHeader/HeaderBody/CustomerHeader"
import ProductListLanding from '../../../component/generalComponent/productList-landingPage/ProductListLanding'
function CustomerHome() {
  return (
    <div className='customer-home-container'>
        <CustomerHeader/>
        <div className='customer-home-landing-image'>
        <div className='image-container'>
        <img alt='background' src='./bgg.png' className='customer-home-image'/>
        <p className='description-img'> I do not own this image</p>
      </div>

      <div className='women-men-children-container'> 
        <div className='customer-home-women-container'>
          <img src='woman.jpg' alt='women section' className='customer-home-section-image'/>
           <p className='customer-home-image-p'>Women's Fashion</p>
          <div>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
          </div>
      </div>

      <div className='customer-home-women-container'>
       <img src='men.jpg' className='customer-home-section-image'/>
       <div>Image 2 Text</div>
      </div>

      <div className='customer-home-women-container'>
        <img src='children.jpg' className='customer-home-section-image'/>
        <div>Image 3 Text</div>
      </div>
      </div>
      
      <div className='landing-product-list-section'>
        <p className='landing-product-list-p'>Item Section <span> <a href='/all-products' className='landing-product-list-a'>View all item</a></span></p>
        <ProductListLanding/>
      </div>
        </div>
    </div>
  )
}

export default CustomerHome