import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom';

function CustomerUnauthorisedRoute({...rest }) {
 //const isLoggedIn = localStorage.getItem('loggedUser')
 let location = useLocation();
 if (localStorage.getItem('loggedUser') === "Customer"){
   return <Redirect to = "/unauthorised" state = {{ from: location}} replace/>
 }
 if (localStorage.getItem('category') === "noUser"){
  return <Redirect to = "/login" state = {{ from: location}} replace/>
}
 return (
   <Route {...rest}/>
 )
}

export default CustomerUnauthorisedRoute