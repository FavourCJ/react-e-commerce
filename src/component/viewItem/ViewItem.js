import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "./viewItem.css"

function ViewItem() {

  let location = useLocation();
  const displayHere = location.data;

  const [items, setItems] = useState([{
    name: displayHere.name,
  }]);

  const [name, setname] = useState("favour");

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
    setname(name);
    }else{
      console.log("not here")
    }
  }, []);

  return (
    <div> 
    <div className='view-item-container'>
      <input value={name}
      onChange={e=>
        setname (e.target.value)
      }/>
      <div>
        <img src='portrait.png' alt='product photo' className='view-product-photo'/>
      </div>
      <div className='view-product-detail-container'>

        <p className='view-product-detail'>Name: <span className='view-product-detail-name'>{displayHere.name}</span></p>
        <p className='view-product-detail'>Price:<span className='view-product-detail-price'>{displayHere.currency}</span> <span>{displayHere.price}</span></p>
        <p className='view-product-detail'>Description: <span className='view-product-detail-description'>{displayHere.description}</span></p>
        <p className='view-product-detail'>Availabel Stock: <span className='view-product-detail-stock'>{displayHere.stock}</span></p>
        <p className='view-product-detail'>Category:<span className='view-product-detail-category'>{displayHere.category}</span></p>
        <label className='view-product-detail'>Quantity:</label>
        <input 
              className='view-product-detail-qty' 
              type= "number"
              />
        <button className='view-product-detail-order'> Order now</button>
      </div>
      </div>
      You may also like
    </div>
  )
}

export default ViewItem