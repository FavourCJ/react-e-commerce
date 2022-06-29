import React, { useContext, useEffect, useState } from 'react';
import "./productListLanding.css";
import { ProductContext } from '../contextFile/ProductContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./productListLanding.css";
import {useHistory} from "react-router-dom";


function ProductListLanding() {

  const {getAllProducts, allProduct, setLocalStorageData} = useContext(ProductContext);
  const history = useHistory();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() =>{
    getAllProducts();
  },[])

  return (
    <div className='product-list-landing-container'>
      <Carousel responsive={responsive}>
      {allProduct.map( (val, key ) => (  
        <div className='product-landing-main-div'>
        <div className='sub-div'>
        <div className='product-list-landing-detail-container'  key={val.id}> 
         <div className='product-list-img-container'> <img src = "/portrait.png" alt = "Productimage" className='landing-product-img'/> </div>
          <p className='product-list-detail-p'> Name: <span className='product-list-detail-span'>{val.ItemName}</span></p>
            <p className='product-list-detail-p'> Price: <span className='product-list-detail-span'>{val.PriceCurrency} {val.ItemPrice}</span></p>
            <p className='product-list-detail-p'> Available stock:<span className='product-list-detail-span'>{val.AvailableStock}</span></p>
            <div className='view-order-item-btn'> 
            <button className='view-item'  
                onClick={()=>{
                  setLocalStorageData(val);
                history.push("/view-product");
                window. location. reload(false);}}>View Product</button>    
        </div>         
        </div> 
        </div> 
        </div>  
       ))}
          </Carousel>
    </div>
  )
}

export default ProductListLanding