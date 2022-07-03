import React from 'react'
import Sidebar from "../../../component/adminComponent/sidebar/Sidebar"
import AdminCard from '../../../component/adminComponent/adminSection/AdminCard';
import "./adminHome.css"
import ChartSection from '../../../component/adminComponent/adminSection/ChartSection'
import UserDummyList from '../../../component/adminComponent/adminSection/UserDummyList'
import AdminHeader from '../../../component/adminComponent/adminHeader/AdminHeader';
import { withRouter} from "react-router-dom"
import Footer from "../../../component/generalComponent/footer/Footer"

function AdminHome() {

  return (
    <> 
    <div className='admin-header'>
            <AdminHeader/>
        </div>
    <div className='adminHome-container'>    
        <div className='admin-sidebar'>
            <Sidebar/>
        </div>
        <div className='admin-content'>
          <div>
            <AdminCard/>
          </div>
          <div>
            <ChartSection/>
          </div>
          <div>
            <UserDummyList/>
          </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default withRouter (AdminHome)