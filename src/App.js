import Landing from "./pages/landingPage/Landing";
import AdminHome from "./pages/adminPage/AdminHome";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AddItem from "./pages/addItem/AddItem";
import ProductList from "./component/productList/ProductList";
import EditProduct from "./component/editProduct/EditProduct";
import {configureStore} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import productReducer from "./redux-features/Product";
import Register from "./pages/register/Register";
import Login from "./login/Login";
import MyAccount from "./pages/myAccount/MyAccount";
import MyAccountAdmin from "./component/myAccountAdmin/MyAccountAdmin";
import AllProductListDisplay from "./pages/allProductListDisplay/AllProductListDisplay";
import ViewItem from "./component/viewItem/ViewItem";
import PrivateRoute from "./component/privateRoute/PrivateRoute";
import { useContext, useEffect } from "react";
import { ProductContext } from "./component/contextFile/ProductContext";

function App() {
  const store = configureStore({
    reducer: {
      product: productReducer,
    }
  });
  const {isLoggedIn, authUser} = useContext(ProductContext);
 
  useEffect(() =>{
    authUser();
  },[])

  return (
    <Provider store = {store}>
    <div className="App">
     <div className="app-content">
     <Router>
     <Switch>
      <Route exact path="/">
          <Landing/>
          </Route>

          <Route path="/login">
          <Login/>
          </Route>
        
          <Route path="/register">
          <Register/>
          </Route>
         
         <PrivateRoute isAuth={isLoggedIn} path = "/admin" component={AdminHome}/>
         <PrivateRoute isAuth={isLoggedIn} path = "/addItem" component={AddItem}/>
         <PrivateRoute isAuth={isLoggedIn} path = "/products" component={ProductList}/>
         <PrivateRoute isAuth={isLoggedIn} path = "/editProduct" component={EditProduct}/>
         <PrivateRoute isAuth={isLoggedIn} path = "/all-products" component={AllProductListDisplay}/>
         <PrivateRoute isAuth={isLoggedIn} path = "/my-account-admin" component={MyAccountAdmin}/>
         <PrivateRoute isAuth={isLoggedIn} path = "/view-product" component={ViewItem}/>
         <PrivateRoute isAuth={isLoggedIn} path = "/my-account" component={MyAccount}/>
          
        </Switch>
       
    </Router>
   
     </div>
    </div>
    </Provider>
  );
}

export default App;
