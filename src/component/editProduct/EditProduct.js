import React, { useContext, useEffect, useState } from 'react'
import "./editProduct.css"
import Sidebar from "../../component/sidebar/Sidebar";
import Footer from "../../component/footer/Footer"
import {editItemValidation} from '../../Validation';
import {useHistory} from "react-router-dom";
import { ProductContext } from '../contextFile/ProductContext';
import { collection, getDocs, query, where, getDoc, doc, deleteDoc, writeBatch, updateDoc } from "firebase/firestore";
import { db } from '../../firebase-config/firebase-config';

function EditProduct() {
  const {getProducts, productList} = useContext(ProductContext);
    const [editError, setEditError] = useState({});
    const [specificProductId, setSpecificProductId] = useState([])
    const history = useHistory();
    const localstorageData ={
      id: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      color: localStorage.getItem('color'),
      gender: localStorage.getItem('gender'),
      category: localStorage.getItem('category'),
      description: localStorage.getItem('description'),
      price: localStorage.getItem('price'),
      currency: localStorage.getItem('currency'),
      stock: localStorage.getItem('stock'),
    }

    const [editValue, setEditValue] = useState({
      name: localstorageData.name,
      color: localstorageData.color,
      stock: localstorageData.stock,
      gender: localstorageData.gender,
      category: localstorageData.category,
      description: localstorageData.description,
      price: localstorageData.price,
      currency: localstorageData.currency,
    });

    const editItem = async () =>{
      const specificDataCollection = query(collection(db, "products"));
      const data = await getDocs(specificDataCollection);
      setSpecificProductId(localstorageData.id);
      const productRef = doc(db, "products", specificProductId);
   
      
      data.forEach( async(doc) =>{
        if (doc.id === specificProductId){ 
          await updateDoc(productRef, {
            AvailableStock: editValue.stock,
            ItemName: editValue.name,
            ItemColor: editValue.color,
            ItemPrice: editValue.price,
            PriceCurrency: editValue.currency,
            itemDescription: editValue.description,
            itemCategory: editValue.category,
            ItemGender: editValue.gender,
            PriceCurrency: editValue.currency
          });
          history.push("/products");
          
        }else if (doc.id !== localstorageData.id){
          console.log("not here")
        }
      })
    }


    const handleSubmit = (e) =>{
      e.preventDefault();
      setEditError(editItemValidation(editValue));
    }

    useEffect(() =>{ 
      getProducts();
    },[getProducts]);



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
              value={editValue.name}
              onChange = { (e)=>
                setEditValue ({...editValue, name: e.target.value})
              }
             />  
              {editError.name && <p className='eidt-item-error'> {editError.name}</p>}

            </div>
          <div className='form-data'>
            <label className='item-label'> Product Color<span className='required'>*</span></label>
            <input 
              className='item-input-color'
              value={editValue.color}
              onChange = { e=>
                setEditValue ({...editValue, color: e.target.value})
              }
              />
              {editError.color && <p className='eidt-item-error'> {editError.color}</p>}

            </div>

            <div className='form-data'>
            <label className='item-label-description'> Product Description<span className='required'>*</span></label>
            <input 
              className='item-input-description'
              value={editValue.description}
              onChange = { e=>
                setEditValue ({...editValue, description: e.target.value})
              }
              />
              {editError.description && <p className='eidt-item-error'> {editError.description}</p>}
            </div>

            <div className='form-data-price'>
            <label className='item-label'> Item Price<span className='required'>*</span></label>
            <select name="currency" className="currency" 
            value={editValue.currency}
            onChange = {(e) =>
            setEditValue ({...editValue, currency: e.target.value})
          }>
            <option hidden
             >Currency</option> 
            <option value="$">$</option>
            <option value="£">£</option>
            <option value="€">€</option>
            <option value="Tl">TL</option>
            <option value="CA$">CA$</option>
          </select>
            <input 
              className='item-input-number-price' 
              type= "number"
              value={editValue.price}
              onChange = { e=>
                setEditValue ({...editValue, price: e.target.value })
               }/>
            </div>

            <div className='form-data'>
            <label className='item-label'> Available Stock<span className='required'>*</span></label>
            <input 
              className='item-input-number' 
              type= "number"
              value={editValue.stock}
              onChange = { e=>
                setEditValue ({...editValue, stock: e.target.value})
              }
              />
              {editError.stock && <p className='eidt-item-error'> {editError.stock}</p>}

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
             checked={editValue.gender === 'Male'}      
              name="gender" 
              onChange = { e=>
                setEditValue ({...editValue, gender: e.target.value})
              }
             /> 
              <span className='item-radio-p'> Male</span>
            <input 
              className='item-input-radio' 
              type="radio" 
              value= "Female"
              checked={editValue.gender === 'Female'}  
              name="gender"
              onChange = { e=>
                setEditValue ({...editValue, gender: e.target.value})
              }
              /> 
              <span className='item-radio-p'> Female</span>
            <input 
              className='item-input-radio' 
              type="radio" 
              value= "Other" 
              checked={editValue.gender === 'Other'}  
              name="gender" 
              onChange = { e=>
                setEditValue ({...editValue, gender: e.target.value})
              }
              /> 
              <span className='item-radio-p'> Other</span> 
              {editError.gender && <p className='edit-item-error-gender'> {editError.gender}</p>}
  
            </div>
            </div>

            <div className='form-data-category'>
            <label className='item-label'> Item Category <span className='required'>*</span></label>
            <div className='edit-radio-container'>
            <input 
              className='item-input-radio' 
              type="radio" 
              value= "Bulk"
              checked={editValue.category === 'Bulk'}  
              name="category"
              onChange = { e=>
                setEditValue ({...editValue, category: e.target.value})
              }
              /> 

               <span className='item-radio-p'> Bulk</span>
               <input 
              className='item-input-radio' 
              type="radio" 
              value= "Single"
              checked={editValue.category === 'Single'}  
              name="category"
              onChange = { e=>
                setEditValue ({...editValue, category: e.target.value})
              }
              /> 
              <span className='item-radio-p'> Single</span>   
            </div>
            </div>
            {editError.category && <p className='edit-item-error-category'> {editError.category}</p>}


            <div className='item-btn-container'>
                <button 
                  className='item-btn'
                  onClick={editItem}> Edit Item</button>
            </div>
            </form>
            
        </div>
        </div>
        
        <Footer/>
    </div>
  )
}

export default EditProduct