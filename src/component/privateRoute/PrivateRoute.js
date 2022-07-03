import { Redirect, Route } from "react-router-dom";

function PrivateRoute({...rest }) {
  //const isLoggedIn = localStorage.getItem('loggedUser')
  
 
  if (localStorage.getItem('loggedUser') === "false"){
    return <Redirect to = "/login"/>
  }
  return (
    <Route {...rest}/>
  )
}

export default PrivateRoute