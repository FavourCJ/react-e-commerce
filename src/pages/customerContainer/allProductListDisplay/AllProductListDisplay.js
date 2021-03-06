import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../../component/contextFile/ProductContext';
import "./AllProductListDisplay.css";
import { useHistory} from "react-router-dom";
import Header from '../../../component/generalComponent/header/Header';
import Footer from '../../../component/generalComponent/footer/Footer';

function AllProductListDisplay() {
  const {getAllProducts, allProduct, setLocalStorageData, saveCartArrayProduct} = useContext(ProductContext);
  const history = useHistory();
   
  useEffect(() =>{
    getAllProducts();
  },[]);
 
  return (
    <div>
      <Header/>
    <div className='all-product-list-landing-container'>  
    
      {allProduct.map( (val, key ) => ( 
        <div className='sub-div' key={key}>
        <div className='all-product-list-detail-container' >
         <div className='product-list-img-container'> <img src = "/portrait.png" alt = "Productimage" className='landing-product-img'/> </div>
          <p className='product-list-detail-p'> Name: <span className='product-list-detail-span'>{val.ItemName}</span></p>
            <p className='product-list-detail-p'> Price: <span className='product-list-detail-span'>{val.PriceCurrency} {val.ItemPrice}</span></p>
            <p className='product-list-detail-p'> Available stock:<span className='product-list-detail-span'>{val.AvailableStock}</span></p>
            <p className='product-list-detail-p'> Gender: <span className='product-list-detail-span'>{val.ItemGender}</span></p>
            <div className='view-order-item-btn'> 
            <button className='view-item' 
               onClick={()=>
                {
                setLocalStorageData(val);
                saveCartArrayProduct(val);
                history.push("/view-product")}}>
                  View Product</button>  
            
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