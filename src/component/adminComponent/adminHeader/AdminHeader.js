import React from 'react'
import "./adminHeader.css"
import {UserOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

function AdminHeader() {
  
  return (
    <div className='admin-header-container'>
        <div className='admin-logo'> <a href='https://favourcj-portfolio.firebaseapp.com/' className='logo-a' target= "_blank">Favour CJ</a></div>

        <div className="dropdown">
       <button className ="dropbtn">
      <UserOutlined className='header-icon'/>
    </button>
  <div className="dropdown-content">
    <Link to="my-account-admin">My Account</Link>
  </div>
</div>
    </div>
  )
}

export default AdminHeader