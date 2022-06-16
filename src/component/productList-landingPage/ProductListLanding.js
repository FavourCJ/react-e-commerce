import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../contextFile/ProductContext';
import "./productListLanding.css"
function ProductListLanding() {
  const {getAllProducts, allProduct} = useContext(ProductContext);
  useEffect(() =>{
    getAllProducts();
  },[])
  return (
    <div className='product-list-landing-container'>
      {allProduct.map( (val, key ) => ( 
        <div className='product-list-detail-container' key={key}>
         <div className='product-list-img-container'> <img src = "/portrait.png" alt = "Productimage" className='landing-product-img'/> </div>
          <p className='product-list-detail-p'> Name: <span className='product-list-detail-span'>{val.ItemName}</span></p>
          <p className='product-list-detail-p'> Colour: <span className='product-list-detail-span'>{val.ItemColor}</span></p>
            <p className='product-list-detail-p'> Price: <span className='product-list-detail-span'>{val.PriceCurrency} {val.ItemPrice}</span></p>
            <p className='product-list-detail-p'> Available stock:<span className='product-list-detail-span'>{val.AvailableStock}</span></p>
            <p className='product-list-detail-p'> Description:<span className='product-list-detail-span'>{val.itemDescription}</span></p>
        </div>
       ))}

    </div>
  )
}

export default ProductListLanding