import React from 'react'
import MyAccount from "../../../component/generalComponent/myAccount/MyAccount";
import Header from "../../../component/generalComponent/header/Header";
import "./yourAccount.css" 

function YourAccount() {
  return (
    <div>
        <Header/>
        <div className='your-account-content'>
        <MyAccount/>
        </div>

       
    </div>
  )
}

export default YourAccount