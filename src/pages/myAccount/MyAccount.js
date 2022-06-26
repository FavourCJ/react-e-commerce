import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { ProductContext } from '../../component/contextFile/ProductContext';
import {useHistory} from "react-router-dom"

function MyAccount() {
  const {userDetails, getCurrentUserData, deleteAccount, currentUserId} = useContext(ProductContext);
  const history = useHistory();
  
  const redirectDeletedUser = () =>{
    deleteAccount();
    history.push("/");
  }

  useEffect(() =>{
    getCurrentUserData();
    
  },[getCurrentUserData])
  return (
    <div className='my-account-container'>
     
      <div className='admin-form-container'> 
      <p className='my-account-header'>My Profile</p> 
      <div className='my-account-details'>
        <label className='my-account-label'>Name</label>
        <p className='my-account-text'> {userDetails.firstname}</p>
      </div>

      <div className='my-account-details'>
        <label className='my-account-label'>Surname</label>
        <p className='my-account-text'> {userDetails.lastname}</p>
      </div>

      <div className='my-account-details'>
        <label className='my-account-label'>Email</label>
        <p className='my-account-text'> {userDetails.email}</p>
      </div>

      <div className='my-account-details'>
        <label className='my-account-label'>Account Type</label>
        <p className='my-account-text'> {userDetails.category}</p>
      </div>

      <div className='admin-button-container'>
        <button className='admin-btn'> Log Out</button>
      </div>

      <div className='admin-button-container'>
        <button className='admin-delete-btn' onClick={redirectDeletedUser}> Delete my account</button>
      </div>
      </div> 
    </div>
  )
}

export default MyAccount