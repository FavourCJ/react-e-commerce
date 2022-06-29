import React from 'react'
import Sidebar from '../../component/sidebar/Sidebar'
import AdminCard from '../../component/adminSection/AdminCard'
import "./adminHome.css"
import ChartSection from '../../component/adminSection/ChartSection'
import UserDummyList from '../../component/adminSection/UserDummyList'
import AdminHeader from '../../component/adminHeader/AdminHeader'
import { withRouter} from "react-router-dom"

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
    </>
  )
}

export default withRouter (AdminHome)