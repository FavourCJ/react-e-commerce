import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ 
  isAuth: isAuth,
  component: Component,
   ...rest }) => {
    return(
      <Route
      {...rest}
      render = {(props) =>{
        if (isAuth){
          return <Component/>;
        }
        else{
          return <Redirect to={{
                     pathname: "/login",
                     state: {from: props.location}}}/>
        }
      }}/>
    )
}

export default PrivateRoute