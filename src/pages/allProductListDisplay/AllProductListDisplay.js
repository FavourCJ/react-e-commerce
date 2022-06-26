import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../component/contextFile/ProductContext';
import Header from '../../component/header/Header';
import "./AllProductListDisplay.css";
import Footer from "../../component/footer/Footer";
import {useHistory} from "react-router-dom";

function AllProductListDisplay() {
  const {getAllProducts, allProduct} = useContext(ProductContext);
  const history = useHistory();

  const contentStyle = {
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    width: "60px",
    backgroundColor: "red"
  };

  const getSpecificProduct =(val) =>{
        
    const data={
      id: val.id,
      name: val.ItemName,
      color: val.ItemColor,
      category: val.itemCategory,
      gender: val.ItemGender,
      stock: val.AvailableStock,
      description: val.itemDescription,
      price: val.ItemPrice,
      currency: val.PriceCurrency,
    }
    history.push({
      pathname: "/view-product",
      data: data 
    });
   
  }
   
  useEffect(() =>{
    getAllProducts();
  },[]);
 
  return (
    <div>
      <Header/>
    <div className='all-product-list-landing-container'>    
      {allProduct.map( (val, key ) => ( 
        <div className='sub-div' key={key}>
        <div className='all-product-list-detail-container'>
         <div className='product-list-img-container'> <img src = "/portrait.png" alt = "Productimage" className='landing-product-img'/> </div>
          <p className='product-list-detail-p'> Name: <span className='product-list-detail-span'>{val.ItemName}</span></p>
            <p className='product-list-detail-p'> Price: <span className='product-list-detail-span'>{val.PriceCurrency} {val.ItemPrice}</span></p>
            <p className='product-list-detail-p'> Available stock:<span className='product-list-detail-span'>{val.AvailableStock}</span></p>
            <div className='view-order-item-btn'> 
            <button className='view-item' onClick={()=>{getSpecificProduct(val)}}>View Product</button>    
        </div>         
        </div> 
        </div>   
       ))}

    </div>
    <Footer/>
    </div>
  )
}

export default AllProductListDisplay