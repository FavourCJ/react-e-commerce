import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import "./product.css";
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config/firebase-config';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { ProductContext } from '../contextFile/ProductContext';
import AdminHeader from "../adminHeader/AdminHeader"

function ProductList() {
  
  let history = useHistory();

  const {getProducts, productList} = useContext(ProductContext);
  const productCollectionRef = collection(db, "products");
  const [loadData, setLoadData] = useState (false);
  

    useEffect(() =>{ 
      getProducts();
    },[getProducts]);

  //deleting specific product from list
   const deleteProduct =  async (id) =>{
    const deleteProductDocs = doc (productCollectionRef, id);
    await deleteDoc (deleteProductDocs)
}

const handle = (val) => {
  localStorage.setItem('id', val.id)
   localStorage.setItem('name', val.ItemName)
   localStorage.setItem('color', val.ItemColor)
   localStorage.setItem('price', val.ItemPrice)
   localStorage.setItem('currency', val.PriceCurrency)
   localStorage.setItem('description', val.itemDescription)
   localStorage.setItem('category', val.itemCategory)
   localStorage.setItem('gender', val.ItemGender)
   localStorage.setItem('stock', val.AvailableStock)
  history.push("/editProduct");
};

  return (
    <div> 
      <AdminHeader/>
    <div className='productList-container'>
      <Sidebar/>

      <div className='product-list-content'>
      <h3 className='product-list-header'> Your Product List</h3>
      <p id ={loadData ? "success-show": "success-hidden"}> Loading your product list data<span className="redirect-loader"></span> </p>
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
              handle(val)
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
    </div>
  )
}


export default ProductList