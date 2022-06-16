import React, { useState } from 'react'
import "./editProduct.css"
import Sidebar from "../../component/sidebar/Sidebar";
import Footer from "../../component/footer/Footer"
import { useHistory, useLocation } from 'react-router-dom';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase-config/firebase-config';
import { ProductContext } from '../contextFile/ProductContext';
import { useContext } from 'react';
import {editItemValidation} from '../../Validation'
import { useEffect } from 'react';

function EditProduct() {
     
    const {editProductData} = useContext(ProductContext);
    let location = useLocation();
    const displayHere = location.data;
    const [editError, setEditError] = useState({});
    const[specificData, setSpecificData] =useState({
      displayHere: []
    })

    let history = useHistory();
    const itemRef = collection(db, "products");
    const[ editItemData, setEditeditItemData] = useState({
      editName: displayHere.name,
      editColor: displayHere.color,
      editStock: displayHere.stock,
      editGender: "",
      editCategory: "",
      editDescription: displayHere.description,
    });
    let  data =[]

    const storageData =() =>{ 
      //let data = JSON.parse(localStorage.getItem("specific-item")) || [];
    let newItem ={
      name: editItemData.editName,
      color: editItemData.editColor,
      stock: editItemData.editStock,
      gender: editItemData.editGender,
      category: editItemData.editCategory,
      description: editItemData.editDescription,
    }
    data.push(newItem);
    //localStorage.setItem("specific-item", JSON.stringify(data))
    console.log(newItem);
    const getData = localStorage.getItem('specific-item');
    if (getData){
      const hhh = JSON.parse(localStorage.getItem('specific-item'));
      alert ("here");
      console.log(hhh)
    }else{
      alert("not here")
    }
    }
    
    useEffect(() =>{
      storageData();
    }, [])
    useEffect(() =>{
      localStorage.setItem("specific-item", JSON.stringify(data)); 
    }, [])
  //   const data = {
  //     editName: displayHere.name,
  //     editColor: displayHere.color,
  //     editStock: displayHere.stock,
  //     editGender: "",
  //     editCategory: "",
  //     editDescription: displayHere.description,
  // }


    // const localStorageData = () =>{
    //   const storedValues = localStorage.getItem("edit-Item");
     
    //   if(!storedValues){
    //     return [{
    //       editName: displayHere.name,
    //       editColor: displayHere.color,
    //       editStock: displayHere.stock,
    //       editGender: "",
    //       editCategory: "",
    //       editDescription: displayHere.description,
    //     }]
    //   }
    //   else if( storedValues){
    //     return JSON.parse(storedValues)
    //   }
    // }
    // const[ editItemData, setEditeditItemData] = useState(localStorageData);
    // useEffect(() =>{
    //  window.localStorage.setItem("edit-Item", JSON.stringify(editItemData));
    // });

    const handleSubmit = (e) =>{
      e.preventDefault();
      editProductData();
      setEditError(editItemValidation(editItemData));
    }


  return (
    <div>
        <div className='edit-product-container'>
        <Sidebar/>
        <div className='edit-product-content'>
        <h3 className='product-header'> Edit Product</h3>
            <form onSubmit={handleSubmit}> 
            <div className='form-data'>
               
            <label className='item-label'> Product Name <span className='required'>*</span></label>
            <input 
              className='item-input-name'
              value={editItemData.editName}
              onChange = { e=>{
                setEditeditItemData ({...editItemData, editName: e.target.value})
              }}
             />
             
              {editError.editName && <p className='eidt-item-error'> {editError.editName}</p>}

            </div>
       <div className='form-data'>
            <label className='item-label'> Product Color<span className='required'>*</span></label>
            <input 
              className='item-input-color'
              value={editItemData.editColor}
              onChange = { e=>{
                setEditeditItemData ({...editItemData, editColor: e.target.value})
              }}
              />
              {editError.editColor && <p className='eidt-item-error'> {editError.editColor}</p>}

            </div>

            <div className='form-data'>
            <label className='item-label-description'> Product Description<span className='required'>*</span></label>
            <input 
              className='item-input-description'
              value={editItemData.editDescription}
              onChange = { e=>{
                setEditeditItemData ({...editItemData, editDescription: e.target.value})
              }}
              />
              {editError.editDescription && <p className='eidt-item-error'> {editError.editDescription}</p>}

            </div>
           
            <div className='form-data'>
            <label className='item-label'> Available Stock<span className='required'>*</span></label>
            <input 
              className='item-input-number' 
              type= "number"
              value={editItemData.editStock}
              onChange = { e=>{
                setEditeditItemData ({...editItemData, editStock: e.target.value})
              }}
              />
              {editError.editStock && <p className='eidt-item-error'> {editError.editStock}</p>}

            </div>

            <div>
            </div>

            <div className='form-data-category'>
            <label className='item-label'> Gender <span className='required'>*</span></label>
            <div className='radio-container'>
            <input 
             className='item-input-radio' 
             type="radio" 
             value= "Male"
             checked={editItemData.editGender === 'Male'}      
              name="gender" 
              onChange = { e=>{
                setEditeditItemData ({...editItemData, editGender: e.target.value})
              }}
             /> 
              <span className='item-radio-p'> Male</span>
            <input 
              className='item-input-radio' 
              type="radio" 
              value= "Female"
              checked={editItemData.editGender === 'Female'}  
              name="gender"
              onChange = { e=>{
                setEditeditItemData ({...editItemData, editGender: e.target.value})
              }}
              /> 
              <span className='item-radio-p'> Female</span>
            <input 
              className='item-input-radio' 
              type="radio" 
              value= "Other" 
              checked={editItemData.editGender === 'Other'}  
              name="gender" 
              onChange = { e=>{
                setEditeditItemData ({...editItemData, editGender: e.target.value})
              }}
              /> 
              <span className='item-radio-p'> Other</span> 
              {editError.editGender && <p className='edit-item-error-gender'> {editError.editGender}</p>}
  
            </div>
            </div>

            <div className='form-data-category'>
            <label className='item-label'> Item Category <span className='required'>*</span></label>
            <div className='edit-radio-container'>
            <input 
              className='item-input-radio' 
              type="radio" 
              value= "Bulk"
              checked={editItemData.editCategory === 'Bulk'}  
              name="category"
              onChange = { e=>{
                setEditeditItemData ({...editItemData, editCategory: e.target.value})
              }}
              /> 

               <span className='item-radio-p'> Bulk</span>
               <input 
              className='item-input-radio' 
              type="radio" 
              value= "Single"
              checked={editItemData.editCategory === 'Single'}  
              name="category"
              onChange = { e=>{
                setEditeditItemData ({...editItemData, editCategory: e.target.value})
              }}
              /> 
              <span className='item-radio-p'> Single</span>   
            </div>
            </div>
            {editError.editCategory && <p className='edit-item-error-category'> {editError.editCategory}</p>}


            <div className='item-btn-container'>
                <button 
                  className='item-btn'> Edit Item</button>
            </div>
            </form>
            
        </div>
        </div>
        
        <Footer/>
    </div>
  )
}

export default EditProduct