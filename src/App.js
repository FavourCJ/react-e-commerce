
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import productReducer from "./redux-features/Product";
import Register from "./pages/register/Register";
import PrivateRoute from "./component/privateRoute/PrivateRoute";
import MyAccountAdmin from "./pages/adminContainer/myAccountAdmin/MyAccountAdmin";
import ProductList from "./pages/adminContainer/productList/ProductList";
import AllProductListDisplay from "./pages/customerContainer/allProductListDisplay/AllProductListDisplay"
import AddItem from "./pages/adminContainer/addItem/AddItem"
import Landing from "./pages/landingPage/Landing";
import AdminHome from "./pages/adminContainer/adminPage/AdminHome";
import EditProduct from "./pages/adminContainer/editProduct/EditProduct";
import ViewItem from "./pages/customerContainer/viewItem/ViewItem";
import CustomerAccount from "./pages/customerContainer/customerAccount/CustomerAccount";
import Login from "./pages/login/Login";
import CustomerHome from "./pages/customerContainer/customerHome/CustomerHome";
import FemaleCollection from "./pages/womenCollection/WomenCollection";
import MaleCollection from "./pages/maleCollection/MaleCollection";
import OtherCollection from "./pages/OtherCollection/OtherCollection"
import AddToCart from "./pages/customerContainer/addToCart/AddToCart";
function App() {
  const store = configureStore({
    reducer: {
      product: productReducer,
    }
  });


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

          <Route path="/all-products">
          <AllProductListDisplay/>
          </Route>

          <Route path="/female-collection">
          <FemaleCollection/>
          </Route>

          <Route path="/male-collection">
          <MaleCollection/>
          </Route>

          <Route path="/other-collection">
          <OtherCollection/>
          </Route>
          
          <PrivateRoute path = "/admin" component={AdminHome}/>
          <PrivateRoute path = "/my-account" component={CustomerAccount}/>
          <PrivateRoute path = "/my-account-admin" component={MyAccountAdmin}/>
          <PrivateRoute path = "/editProduct" component={EditProduct}/>
          <PrivateRoute path = "/products" component={ProductList}/>
          <PrivateRoute path = "/addItem" component={AddItem}/>
          <PrivateRoute path="/view-product" component={ViewItem} />
          <PrivateRoute path="/home" component={CustomerHome} />
          <PrivateRoute path="/add-to-cart" component={AddToCart} />
         
          
        </Switch>
       
    </Router>
   
     </div>
    </div>
    </Provider>
  );
}

export default App;
