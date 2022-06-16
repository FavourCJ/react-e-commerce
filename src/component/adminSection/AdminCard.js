import React, { useEffect } from 'react'
import "./adminSection.css";
import { useContext } from 'react';
import { ProductContext } from '../contextFile/ProductContext';

function AdminCard() {
  const {productList, subList, getSubcriber, getProducts, getRegisteredUsers, regList} = useContext(ProductContext);
  
  //const contestCollectionRef = collection(db, "contestants");
  useEffect(() =>{
    getSubcriber();
    getProducts();
    getRegisteredUsers();
  })

    const subLength = subList.map(( val, key)  => 
  ( <p key = {val.uid} className='user-text'> </p>
  )) 
  
  const productLength = productList.map(( val, key)  => 
  ( <p key = {val.uid} className='user-text'> </p>
  )) 

  const regLength = regList.map(( val, key)  => 
  ( <p key = {val.uid} className='user-text'> </p>
  ))

  return (
    <div className='adminCard-container'>
      <div className='card-section-container'>
      <div className='card-section'>
        <p className='num'>{subLength.length}</p>
        <p className='num-title'> Subcriber(s)</p>
      </div>

      <div className='card-section'>
        <p className='num'> {regLength.length}</p>
        <p className='num-title'> User(s)</p>
      </div>

      <div className='card-section'>
        <p className='num'> {productLength.length}  </p>
        <p className='num-title'> Product(s)</p>
      </div>

      </div>
      
    </div>
  )
}

export default AdminCard