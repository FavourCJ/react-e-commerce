import React from 'react'
import "./adminHeader.css"
import {  SettingOutlined, UserOutlined} from '@ant-design/icons';
function AdminHeader() {
  return (
    <div className='admin-header-container'>
        <div className='admin-logo'>Favour CJ</div>
        <div className='admin-icon'>
            <p className='header-icon'><SettingOutlined /></p>
            <p className='header-icon'> <UserOutlined /></p>       
        </div>

    </div>
  )
}

export default AdminHeader