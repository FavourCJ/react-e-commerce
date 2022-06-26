import React, { useEffect } from 'react'
import "./adminSection.css";
import { useContext } from 'react';
import { ProductContext } from '../contextFile/ProductContext';

function AdminCard() {
  const {productList, subList, getSubcriber, getProducts, getRegisteredUsers, regList} = useContext(ProductContext);
  
  useEffect(() =>{
    getSubcriber();
    getProducts();
    getRegisteredUsers();
  },[])
  
  return (
    <div className='adminCard-container'>
      <div className='card-section-container'>
      <div className='card-section'>
        <p className='num'>{subList.length}</p>
        <p className='num-title'> Subcriber(s)</p>
      </div>

      <div className='card-section'>
        <p className='num'> {regList.length}</p>
        <p className='num-title'> User(s)</p>
      </div>

      <div className='card-section'>
        <p className='num'> {productList.length} </p>
        <p className='num-title'> Product(s)</p>
      </div>
      </div>  
    </div>
  )
}

export default AdminCard