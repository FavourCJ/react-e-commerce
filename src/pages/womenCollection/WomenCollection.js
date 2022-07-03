import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../../component/contextFile/ProductContext';
import Header from '../../component/generalComponent/header/Header';
import {useHistory} from "react-router-dom"

function WomenCollection() {
    const {getWomenCollection, setLocalStorageData, female} = useContext(ProductContext);
    let history = useHistory();

    useEffect(() =>{
        getWomenCollection();
    },[])

  return (
    <div>
        <Header/>
        <div>
         <p className='collection-header'>Women Collection</p> 
        </div>
        <div className='collection-list-container'>
        {female.map( (val, key ) => (  
           <div className='sub-div' key={key}>
           <div className='all-product-list-detail-container' >
            <div className='product-list-img-container'> <img src = "/portrait.png" alt = "Productimage" className='landing-product-img'/> </div>
             <p className='product-list-detail-p'> Name: <span className='product-list-detail-span'>{val.ItemName}</span></p>
               <p className='product-list-detail-p'> Price: <span className='product-list-detail-span'>{val.PriceCurrency} {val.ItemPrice}</span></p>
               <p className='product-list-detail-p'> Available stock:<span className='product-list-detail-span'>{val.AvailableStock}</span></p>
               <p className='product-list-detail-p'> Gender: <span className='product-list-detail-span'>{val.ItemGender}</span></p>
               <div className='view-order-item-btn'> 
               <button className='view-item' 
                  onClick={()=>{setLocalStorageData(val);
                   history.push("/view-product")}}>
                     View Product</button>  
               
           </div>         
           </div> 
           </div> 
        ))}
    </div>
    </div>
  )
}

export default WomenCollection