import React from 'react'
import Footer from '../../component/footer/Footer'
import Header from '../../component/header/Header'
import ProductListLanding from '../../component/productList-landingPage/ProductListLanding'

function UserHome() {
  return (
    <div className='userhome-container'>
        <Header/>
        User UserHome
        <ProductListLanding/>
        <Footer/>
    </div>
  )
}

export default UserHome