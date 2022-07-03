import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import Sidebar from "../../../component/adminComponent/sidebar/Sidebar"
import "./product.css";
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase-config/firebase-config';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { ProductContext } from '../../../component/contextFile/ProductContext';
import AdminHeader from '../../../component/adminComponent/adminHeader/AdminHeader';
import {withRouter} from "react-router-dom"
import Footer from '../../../component/generalComponent/footer/Footer';

function ProductList() {
  
  let history = useHistory();

  const {getProducts, productList, setLocalStorageData} = useContext(ProductContext);
  const productCollectionRef = collection(db, "products");
     
  //deleting specific product from list
   const deleteProduct =  async (id) =>{
    const deleteProductDocs = doc (productCollectionRef, id);
    await deleteDoc (deleteProductDocs);
    //window. location. reload(false);
}

useEffect(() =>{ 
  getProducts();
},[getProducts]);

  return (
    <div> 
      <AdminHeader/>
    <div className='productList-container'>
      <Sidebar/>

      <div className='product-list-content'>
      <h3 className='product-list-header'> Your Product List</h3>

      <table className='product-table'>
        <tbody> 
              <tr>
              <th className = "product-table-header">  ID</th> 
              <th className = "product-table-header">  Image</th>
              <th className = "product-table-header">  Name</th> 
              <th className = "product-table-header">  Colour</th>
              <th className = "product-table-header">  Category</th> 
              <th className = "product-table-header"> Stock</th>
              <th className = "product-table-header"> Gender</th>   
              <th className = "product-table-header"> Price</th>   
              <th className = "product-table-header"> Edit</th> 
              <th className = "product-table-header"> Delete</th>  
                </tr>
      
             {productList.map( (val, key ) => (  
              
            <tr key ={val.id}>
            <td  className = "product-table-header" > {val.id} </td>
            <td  className = "product-table-header" > {val.ItemImage} </td>
            <td  className = "product-table-header-name" > {val.ItemName} </td>
            <td  className = "product-table-header" > {val. ItemColor} </td>
            <td  className = "product-table-header" >   {val.itemCategory} </td>
            <td  className = "product-table-header" >   {val.AvailableStock} </td>
            <td  className = "product-table-header" >   {val.ItemGender} </td>
            <td  className = "product-table-header" > <span>{val.PriceCurrency}</span>{val.ItemPrice} </td>
            <td  className = "product-table-header" >  
            <button
             className='edit-item'
             onClick={() =>{
              setLocalStorageData(val);
              history.push("/editProduct");
             }}
             >
              <EditOutlined/>
            </button>
            </td>
            <td className = "data" key ={key}>  
            <button
              className='delete-item'
              onClick={() =>{
              deleteProduct(val.id)
            }}> <DeleteOutlined /></button>
            </td>
            </tr>
              ))}
              </tbody>                      
       </table>  
      </div>
    </div>
    <Footer/>
    </div>
  )
}


export default withRouter (ProductList)