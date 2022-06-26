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
        <Route exact path="/register">
          <Register/>
          </Route>
          <Route path="/admin">
            <AdminHome/>
          </Route>
          <Route path="/addItem">
            <AddItem />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/editProduct">
            <EditProduct />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/my-account">
            <MyAccount/>
          </Route>
          <Route path="/my-account-admin">
            <MyAccountAdmin/>
          </Route>
          <Route path="/all-products">
            <AllProductListDisplay/>
          </Route>
          <Route path="/view-product">
            <ViewItem/>
          </Route>
         
          </Switch>
    </Router>
   
     </div>
    </div>
    </Provider>
  );
}

export default App;
