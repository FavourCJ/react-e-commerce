import React, { useContext, useState } from 'react';
import {orderItem} from "../../Validation"
import { ProductContext } from '../contextFile/ProductContext';
import "./viewItem.css"

function ViewItem() {
  const {removeLocalStorageData} = useContext(ProductContext);
  const [quantity, setQuantity] = useState(0);
  const [quantityError, setQuantityError] = useState(false);
  const [err, setErr] = useState({});
   const getLocalstorageData ={
    id: localStorage.getItem('id'),
    name: localStorage.getItem('name'),
    color: localStorage.getItem('color'),
    gender: localStorage.getItem('gender'),
    category: localStorage.getItem('category'),
    description: localStorage.getItem('description'),
    price: localStorage.getItem('price'),
    currency: localStorage.getItem('currency'),
    stock: localStorage.getItem('stock'),
  }

  const checkQuantity = ()=>{
    if (getLocalstorageData.stock < quantity){
      setQuantityError(true)
    }
  }
  const handleSubmit = () =>{
    setErr(orderItem(quantity));
    //removeLocalStorageData();
    checkQuantity();
  }

  return (
    <div> 
    <div className='view-item-container'>
      <div>
        <img src='portrait.png' alt='product photo' className='view-product-photo'/>
      </div>
      <div className='view-product-detail-container'>

        <p className='view-product-detail'>Name: <span className='view-product-detail-name'>{getLocalstorageData.name}</span></p>
        <p className='view-product-detail'>Price:<span className='view-product-detail-price'>{getLocalstorageData.currency}</span>{getLocalstorageData.price}<span></span></p>
        <p className='view-product-detail'>Description: <span className='view-product-detail-description'>{getLocalstorageData.description}</span></p>
        <p className='view-product-detail'>Availabel Stock: <span className='view-product-detail-stock'>{getLocalstorageData.stock}</span></p>
        <p className='view-product-detail'>Category:<span className='view-product-detail-category'>{getLocalstorageData.category}</span></p>
        <label className='view-product-detail'>Quantity:</label>
        <input 
          className='view-product-detail-qty'
          value={quantity}
          onChange ={e=> setQuantity(e.target.value)}/>
          {err.quantity && <p className='view-item-error'> {err.quantity}</p>}
          {quantityError ? <p className='view-item-error'>Insufficient quantity</p> : ""}
        <button 
          className='view-product-detail-order'
          onClick={handleSubmit}> Order now</button>
      </div>
      </div>
      You may also like
    </div>
  )
}

export default ViewItem