import React from 'react'
import AdminHeader from '../../../component/adminComponent/adminHeader/AdminHeader';
import Sidebar from "../../../component/adminComponent/sidebar/Sidebar"
import MyAccountDashboard from '../../../component/myAccountDashboard/MyAccountDashboard';
import { withRouter } from 'react-router-dom';
import Footer from '../../../component/generalComponent/footer/Footer';
import MyAccount from '../../../component/generalComponent/myAccount/MyAccount';
import "../../../component/generalComponent/myAccount/MyAccount.css";

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
        <Footer/>
    </div>
  )
}

export default withRouter(MyAccountAdmin)