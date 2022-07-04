
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import Login from "./pages/login/Login";
import FemaleCollection from "./pages/womenCollection/WomenCollection";
import MaleCollection from "./pages/maleCollection/MaleCollection";
import OtherCollection from "./pages/OtherCollection/OtherCollection"
import AddToCart from "./pages/customerContainer/addToCart/AddToCart";
import YourAccount from "./pages/customerContainer/yourAccount/YourAccount";
import UnAuthorised from "./component/privateRoute/UnAuthorised";
import AdminUnauthorisedRoute from "./component/privateRoute/AdminUnauthorisedRoute";
import CustomerUnauthorisedRoute from "./component/privateRoute/CustomerUnauthorisedRoute";

function App() {
 const getUserCategory = localStorage.getItem("category")
  return (

    <div className="App">
     <div className="app-content">
     <Router>
     <Switch>

      {getUserCategory === "Admin"? 
        <Route exact path= "/">
        <AdminHome/>
      </Route>
      :
      getUserCategory === "Customer" ?
      <Route exact path= "/">
        <Landing/>
      </Route>
      :
      <Route exact path= "/">
        <Landing/>
      </Route>
    }
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

            <CustomerUnauthorisedRoute path = "/admin" component = {AdminHome}/>
            <CustomerUnauthorisedRoute path = "/my-account-admin" component = {MyAccountAdmin}/>
            <CustomerUnauthorisedRoute path = "/editProduct" component = {EditProduct}/>
            <CustomerUnauthorisedRoute path = "/addItem" component = {ProductList}/>

            <CustomerUnauthorisedRoute path = "/addItem" component = {AddItem} />
            <AdminUnauthorisedRoute path = "/view-product" component = {ViewItem}/>
            <AdminUnauthorisedRoute path = "/add-to-cart" component = {AddToCart} />
            <AdminUnauthorisedRoute path = "/your-account" component = {YourAccount}/>
            <PrivateRoute path = "/unauthorised" component = {UnAuthorised}/>

        </Switch>
       
    </Router>
   
     </div>
    </div>
   
  );
}

export default App;
