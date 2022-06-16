import React from 'react'
import MyAccount from '../../pages/myAccount/MyAccount'
import AdminHeader from '../adminHeader/AdminHeader'
import Sidebar from '../sidebar/Sidebar';
import "../../pages/myAccount/MyAccount.css"
import MyAccountDashboard from '../myAccountDashboard/MyAccountDashboard';

function MyAccountAdmin() {
  return (
    <div className='admin-my-account'>
        <div>
            <AdminHeader/>
        </div>
        <div className='admin-sidebar-myaccount'>
        <Sidebar/>
        <div className='admin-myaccount-content'>
        <MyAccount/>
        </div>  
        <div className='admin-myaccount-content'>
        <MyAccountDashboard/>
        </div>  
        </div>
        
    </div>
  )
}

export default MyAccountAdmin