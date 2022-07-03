import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../../component/contextFile/ProductContext';
import Header from '../../../component/generalComponent/header/Header'
import "./addToCart.css";
import {DeleteOutlined} from '@ant-design/icons';

function AddToCart() {

  const {removeLocalStorageData,  getCartArray, cartArray, removeSavedDataArray} = useContext(ProductContext);
  const [productArrayList, setProductArrayList] = useState(false); 

  const productArrayListFunction =()=>{
    if (cartArray){
      setProductArrayList(true)
    }
  }

 useEffect(() =>{
  getCartArray();
  productArrayListFunction();
  
 },[]);

  return (
    <div>
      <Header/>
      {
        productArrayList ? 
        <div>
        <table className='product-array-table'>
         <tbody>
            <tr className = "product-array-tr">
              <th className='product-array-th'>Image</th>
              <th className='product-array-th'>Product Name</th>
              <th className='product-array-th'>Product Quantity</th>
              <th className='product-array-th'>Product Price</th>
              <th className='product-array-th'>Remove</th>
            </tr>
         
             { cartArray.map((val, key) =>(
              <tr key={key} className = "product-array-tr">
              <td className='product-array-td'>{val.img}</td>
              <td className='product-array-td'>{val.name}</td>
              <td className='product-array-td'>{val.quantity}</td>
              <td className='product-array-td'>{val.currency}{val.price}</td>
              <td className='product-array-td'> 
              <button 
                className='product-array-td-delete'
                onClick={() =>{removeSavedDataArray(val)}}><DeleteOutlined /></button></td>
            </tr>
            )) }
           
     </tbody>
   </table>
   <p className='product-array-total'>Total: </p>
   </div>
        
        : 
        <div> 
          <h1 className='productArrayList-h1'> No product has been added</h1>
        </div>
      }
       
  </div>
  )
}

export default AddToCart