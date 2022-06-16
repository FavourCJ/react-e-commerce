import React, { useState } from 'react'
import "./addItem.css"
import Sidebar from "../../component/sidebar/Sidebar";
import Footer from "../../component/footer/Footer"
import { itemValidation } from '../../Validation';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase-config/firebase-config';
import { useHistory } from 'react-router-dom';

function AddItem() {

    const[ itemData, setItemData] = useState({
        name: "",
        color: "",
        stock: 0,
        price: 0,
        gender: "",
        category: "",
        currency: "",
        description: "",

    })

    let history = useHistory();

    const [itemError, setItemError] = useState ({});
    const [correctData, setCorrectData] = useState (false);
    const [success, setSucess] = useState (false);

    const itemRef = collection(db, "products");

    const addItem = async() =>{ 
        //Giving the same user id in auth to that of firestore database
           const data = await addDoc(itemRef, {
             ItemName: itemData.name,
             ItemColor: itemData.color,
             itemDescription: itemData.description,
             AvailableStock: itemData.stock,
             ItemPrice: itemData.price,
             PriceCurrency: itemData.currency,
             ItemGender: itemData.gender,
             itemCategory: itemData.category,
             uid: auth.currentUser.uid,
            
           }).then(() =>{
             alert ("done")
             setSucess(true)
           })             
         } 

         const handleAddItemSubmit = () =>{
          if (Object.keys(itemError).length === 0 && correctData){
            addItem();
            setTimeout(() =>{
              history.push("/products")           
            }, 3000)               
      }
         }
         const handleSubmit= ((e) =>{
          e.preventDefault();
          setItemError(itemValidation(itemData));
          setCorrectData (true);
          handleAddItemSubmit();
      })
    
  return (
    <div className='addItem-container'>
        <div className='addItem-sidebar-container'>
        <Sidebar/>
        <div className='addItem-content'>
          <p className='add-item-header'> Add Item</p>
            <form onSubmit={handleSubmit}> 
            <h3 id ={success ? "success-show": "success-hidden"}> Item has been added successfully. Redirecting you to the product list page <div className="redirect-loader"></div> </h3>
            <div className='form-data'>
            <label className='item-label'> Product Name <span className='required'>*</span></label>
            <input 
              className='item-input-name'
              value={itemData.name}
              onChange = { e=>{
                setItemData ({...itemData, name: e.target.value })
               }}/>
            </div>
            {itemError.name && <p className='item-error-name'> {itemError.name}</p>}


            <div className='form-data'>
            <label className='item-label'> Product Color<span className='required'>*</span></label>
            <input 
              className='item-input-color'
              value={itemData.color}
              onChange = { e=>{
                setItemData ({...itemData, color: e.target.value })
               }}/>
            </div>
            {itemError.color && <p className='item-error-color'> {itemError.color}</p>}


            <div className='form-data'>
            <label className='item-label-description'> Product Description<span className='required'>*</span></label>
            <input 
              className='item-input-description'
              value={itemData.description}
              onChange = { e=>{
                setItemData ({...itemData, description: e.target.value })
               }}/>
            </div>
            {itemError.description && <p className='item-error'> {itemError.description}</p>}

            <div className='form-data-price'>
            <label className='item-label'> Item Price<span className='required'>*</span></label>
            <select name="currency" className="currency" onChange = {(e) =>{
            setItemData ({...itemData, currency: e.target.value})
          }}>
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
              value={itemData.price}
              onChange = { e=>{
                setItemData ({...itemData, price: e.target.value })
               }}/>
            </div>
            {itemError.price && <p className='item-error'> {itemError.price}</p>}


            <div className='form-data'>
            <label className='item-label'> Available Stock<span className='required'>*</span></label>
            <input 
              className='item-input-number' 
              type= "number"
              value={itemData.stock}
              onChange = { e=>{
                setItemData ({...itemData, stock: e.target.value })
               }}/>
            </div>
            {itemError.stock && <p className='item-error'> {itemError.stock}</p>}


            <div className='form-data-category'>
            <label className='item-label'> Gender <span className='required'>*</span></label>
            <div className='radio-container'>
            <input 
             className='item-input-radio' 
             type="radio" 
             value="Male"
              name="gender" 
              checked={itemData.gender === 'Male'}
              onChange = { e=>{
                setItemData ({...itemData, gender: e.target.value})
              }}/> 
              <span className='item-radio-p'> Male</span>
            <input 
              className='item-input-radio' 
              type="radio" 
              value="Female" 
              name="gender"
              checked={itemData.gender === 'Female'} 
              onChange = { e=>{
                setItemData ({...itemData, gender: e.target.value})
              }}/> 
              <span className='item-radio-p'> Female</span>
            <input 
              className='item-input-radio' 
              type="radio" 
              value="Other" 
              name="gender" 
              checked={itemData.gender === 'Other'}
              onChange = { e=>{
                setItemData ({...itemData, gender: e.target.value})
              }}/> 
              <span className='item-radio-p'> Other</span>   
            </div>
            </div>
            {itemError.gender && <p className='item-error'> {itemError.gender}</p>}

            <div className='form-data-category'>
            <label className='item-label'> Item Type <span className='required'>*</span></label>
            <div className='radio-container'>
            <input 
              className='item-input-radio' 
              type="radio" 
              value="Bulk" 
              name="category" 
              checked={itemData.category === 'Bulk'}
              onChange = { e=>{
                setItemData ({...itemData, category: e.target.value})
              }}/>
               <span className='item-radio-p'> Bulk</span>
            <input
             className='item-input-radio' 
             type="radio" 
             value="Single" 
             name="category"
             checked={itemData.category === 'Single'} 
             onChange = { e=>{
                setItemData ({...itemData, category: e.target.value})
              }}/>
              <span className='item-radio-p'> Single</span>   
            </div>
            </div>
            {itemError.category && <p className='item-error'> {itemError.category}</p>}


            <div className='form-data'>
            <label className='item-label'> Upload Item<span className='required'>*</span></label>
            <input className='item-input-file' type= "file"/>
            </div>

            <div className='item-btn-container'>
                <button className='item-btn'> Add Item</button>
            </div>
            </form>
            
        </div>
        </div>    
        <Footer/>
    </div>
  )
}

export default AddItem