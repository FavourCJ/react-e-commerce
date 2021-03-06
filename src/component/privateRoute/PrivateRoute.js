import { Redirect, Route } from "react-router-dom";
import {useLocation} from "react-router-dom";

function PrivateRoute({...rest }) {
  //const isLoggedIn = localStorage.getItem('loggedUser')
  let location = useLocation();
 
  if (localStorage.getItem('loggedUser') === "false"){
    return <Redirect to = "/login" state = {{ from: location}} replace/>
  }
  return (
    <Route {...rest}/>
  )
}

export default PrivateRoute