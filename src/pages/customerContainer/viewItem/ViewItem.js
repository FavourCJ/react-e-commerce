import React, { useContext, useState } from 'react';
import {orderItem} from "../../../Validation"
import Header from '../../../component/generalComponent/header/Header';
import ProductListLanding from "../../../component/generalComponent/productList-landingPage/ProductListLanding"
import "./viewItem.css"
import Footer from '../../../component/generalComponent/footer/Footer';
import { useHistory } from 'react-router-dom';
import { ProductContext } from '../../../component/contextFile/ProductContext';

function ViewItem() {

  const { saveCartArrayProduct} = useContext(ProductContext); 
  let history = useHistory();
  const [quantity, setQuantity] = useState(0);
  const [err, setErr] = useState({});
  const [correctData, setCorrectData] = useState (false);
  const getLocalstorageData = JSON.parse(localStorage.getItem("product-data"));

  const handleSubmit = () =>{
    setErr(orderItem(quantity));
    //removeLocalStorageData();
    setCorrectData(true);
    if (Object.keys(err).length === 0 && correctData){ 
      localStorage.setItem("quantity", JSON.stringify(quantity));
      history.push("/add-to-cart");
    }
  }

  return (
    <div> 
      <Header/>
    <div className='view-item-container'>
      <div className='view-item-product-list-img'>
        <img src='portrait.png' alt='product photo' className='view-product-photo'/>
      </div>

      <div className='view-product-detail-container'>
        <p className='view-product-detail'>Name: <span className='view-product-detail-name'>{getLocalstorageData.name}</span></p>
        <p className='view-product-detail'>Price:<span className='view-product-detail-price'>{getLocalstorageData.currency} {getLocalstorageData.price}</span></p>
        <p className='view-product-detail'>Category:<span className='view-product-detail-category'>{getLocalstorageData.category}</span></p>
        <p className='view-product-detail'>Gender:<span className='view-product-detail-gender'>{getLocalstorageData.gender}</span></p>
        <p className='view-product-detail'>Availabel Stock: <span className='view-product-detail-stock'>{getLocalstorageData.stock}</span></p>
        <p className='view-product-detail'>Description: <span className='view-product-detail-description'>{getLocalstorageData.description}</span></p>
        <label className='view-product-detail'>Quantity<span className='required'>*</span>:</label>
          <input 
          className='view-product-detail-qty'
          value={quantity}
          onChange ={e=> setQuantity(e.target.value)}/>
          {err.quantity && <p className='view-item-error'> {err.quantity}</p>}
          
        <button 
          className='view-product-detail-order'
          onClick={handleSubmit}> Order Now</button>
      </div>
      </div>
      <div className='view-item-product-list-section'>
        <p className='view-item-product-section-p'>You may also like</p>
      <ProductListLanding/>
      </div>
      <Footer/>
    </div>
  )
}

export default ViewItem