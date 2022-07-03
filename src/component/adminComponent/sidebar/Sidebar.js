import React, { useState } from 'react'
import { 
    HomeOutlined, 
    LineChartOutlined,
    UsergroupAddOutlined,
    ShoppingCartOutlined,
    SettingOutlined,
    MessageOutlined,
    FormOutlined,
    PlusSquareOutlined,
    BookOutlined,
    MenuOutlined,
    SkinOutlined,
  } from '@ant-design/icons';
import "./sidebar.css"
import { Link } from 'react-router-dom';
function Sidebar() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className='sidebar-container'>
      <button 
            className='admin-mobile-menu-icon'
            onClick={() =>{
              setShowMenu(!showMenu)
            }}>
          <MenuOutlined />
          </button>
        <div className='sidebarMenu-container'>
            <div className='sidebarMenu-link-container' id ={showMenu ? "admin-hidden": "sidebarMenu-link-container"}>
                <div className='link-section-container'>
                <h3 className='sidebarMenu-header'> Dashboard</h3>
               
               <Link className='sidebarMenu-link' to='/admin'>
               <span className='menu-icon'><HomeOutlined /></span>
               <p className='sidebarMenu-p'> Home</p>
               </Link> 

               <Link className='sidebarMenu-link' to = "">
               <span className='menu-icon'><LineChartOutlined /></span>
               <p className='sidebarMenu-p'> Analytics</p>
               </Link>  

               <Link className='sidebarMenu-link' to='/addItem'>
               <span className='menu-icon'><PlusSquareOutlined /></span>
               <p className='sidebarMenu-p'> Add Item</p>
               </Link>  

                </div>

                <div className='link-section-container'>
                <h3 className='sidebarMenu-header'> Quick Links</h3>

                <Link className='sidebarMenu-link' to='/products'>
                <span className='menu-icon'><SkinOutlined /></span>
                <p className='sidebarMenu-p'> Product List</p>
                </Link> 

                <Link className='sidebarMenu-link' to = "" >
                <span className='menu-icon'><ShoppingCartOutlined /></span>
                <p className='sidebarMenu-p'> Order List</p>
                </Link>   

                 <Link className='sidebarMenu-link' to='/my-account-admin'>
                <span className='menu-icon'><SettingOutlined /></span>
                <p className='sidebarMenu-p'> Settings</p>
                </Link>  
                 
                </div>

                <div className='link-section-container'>
                <h3 className='sidebarMenu-header'> Others</h3>
                <Link className='sidebarMenu-link' to = "" >
                <span className='menu-icon'><MessageOutlined /></span>
                <p className='sidebarMenu-p'> Message</p>
                </Link>  

                <Link className='sidebarMenu-link' to = "">
                <span className='menu-icon'><BookOutlined /></span>
                <p className='sidebarMenu-p'> Reports</p>
                </Link> 

                <Link className='sidebarMenu-link' to="">
                <span className='menu-icon'><FormOutlined /></span>
                <p className='sidebarMenu-p'> Feedback</p>
                </Link> 

                </div>             
  
            </div>

        </div>

    </div>
  )
}

export default Sidebar