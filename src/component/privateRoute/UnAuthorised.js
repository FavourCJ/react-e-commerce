import React, { useEffect } from 'react';
import "./unAuthorised.css"
import { useState } from 'react';
import { WarningOutlined } from '@ant-design/icons';

function UnAuthorised() {
  const [isAdminHook, setIsAdminHook] = useState();

  const checkCurrentUserCategory = () =>{
    if (localStorage.getItem('category') === "Admin"){
      setIsAdminHook(true)
    }else if (localStorage.getItem("category") === "Customer"){
      setIsAdminHook(false)
    }
  }

  useEffect(() =>{
    checkCurrentUserCategory();
  },[])
  return (
    <div>
      {isAdminHook ?
        <div className='unauthorised-access-container'>
          <WarningOutlined className='warning-icon'/>
          <p className='unauthorised-access-header'>UnAuthorised Access</p>
          <p className='unauthorised-access-p'> Only Customers have access to this page</p>
          <p className='unauthorised-access-link'> <a href='/register' className='unauthorised-access-a'>Click here</a> to create a customer account and gain access </p>
        </div>
        : 
        <div className='unauthorised-access-container'>
           <WarningOutlined className='warning-icon'/>
        <p className='unauthorised-access-header'>UnAuthorised Access</p>
        <p className='unauthorised-access-p'> Only Admins have access to this page</p>
        <p className='unauthorised-access-link-link'> <a href='/register' className='unauthorised-access-a'>Click here</a> to create an Admin account and gain access </p>
      </div>
    }
    </div>
  )
}

export default UnAuthorised