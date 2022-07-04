import React, { useContext, useEffect } from 'react';
import "./productListLanding.css";
import { ProductContext } from '../../contextFile/ProductContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./productListLanding.css";
import {useHistory} from "react-router-dom";
import {
  ShoppingCartOutlined,
  EyeOutlined,
  HeartOutlined,
} from '@ant-design/icons';


function ProductListLanding() {

  const {
    getAllProducts, 
    allProduct, 
    setLocalStorageData, 
    saveCartArrayProduct,
     saveArrayWishListProduct,
     showButtons, 
     checkeLoginStatus,
    } = useContext(ProductContext);

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
    checkeLoginStatus();
  },[])

  return (
    <div className='product-list-landing-container'>
      <Carousel responsive={responsive}>
      {allProduct.map( (val, key ) => (  
        <div className='product-landing-main-div' key={key}>
        <div className='sub-div'>
        <div className='product-list-landing-detail-container'> 
         <div className='product-list-img-container'> <img src = "/portrait.png" alt = "Productimage" className='landing-product-img'/> </div>
          <p className='product-list-detail-p'> Name: <span className='product-list-detail-span'>{val.ItemName}</span></p>
            <p className='product-list-detail-p'> Price: <span className='product-list-detail-span'>{val.PriceCurrency} {val.ItemPrice}</span></p>
            <p className='product-list-detail-p'> Available stock:<span className='product-list-detail-span'>{val.AvailableStock}</span></p>
            <p className='product-list-detail-p'> Gender: <span className='product-list-detail-span'>{val.ItemGender}</span></p>
           
           {showButtons ? 
               <div className='product-list-buttons'>
               <button 
                 className='product-list-section-btn'
                 onClick={() =>{
                   saveArrayWishListProduct(val);
                 }}><HeartOutlined /></button>
               <button 
                   className='product-list-section-btn'
                   onClick={()=>{
                     setLocalStorageData(val);
                   history.push("/view-product");
                   window.location.reload(false);}}><EyeOutlined /></button>
                 <button 
                   className='product-list-section-btn'
                   onClick={() =>{
                     saveCartArrayProduct(val);
                     window.location.reload(false);
                     }}>
                   <ShoppingCartOutlined /></button>
                         
               </div>  
           : 
           <div className='view-order-item-btn'> 
           <button className='view-item' 
              onClick={()=>
               {
               setLocalStorageData(val);
               saveCartArrayProduct(val);
               history.push("/view-product")}}>
                 View Product</button>  
           
       </div>
        }
                 
        </div> 
        </div> 
        </div>  
       ))}
          </Carousel>
    </div>
  )
}

export default ProductListLanding