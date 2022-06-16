import React, { useEffect, useState } from 'react'
import { db } from '../../firebase-config/firebase-config';
import "./subscribeSection.css";
import { Validation } from '../../Validation';
import { addDoc, collection } from "firebase/firestore"; 
function SubscribeSection() {
  const [subValue, setSubValue] = useState({
    name: "",
    email: ""
  })

  const [error, setError] = useState({});
  const [correctData, setCorrectData] = useState (false);
  const subscribeRef =  collection (db, "subscribe");

  const subscribe = async() =>{ 
   //Giving the same user id in auth to that of firestore 
   if (Object.keys(error).length === 0 && correctData){ 
      const data = await addDoc(subscribeRef, {
        email: subValue.email,
        name: subValue.name,
      }).then(() =>{
      })             
    } }
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    setError(Validation(subValue));
    setCorrectData (true);   
    subscribe();
  }

  return (
    <div className='subscribe-container'>
      <p className='subscribe-header'> Subscribe to our news teller</p>
      <form onSubmit={handleSubmit}> 
      <div className='subscribe-form'>
        <input 
        className='subscribe-input' 
        placeholder='Name'
        value={subValue.name}
        onChange = { (e) =>{
          setSubValue ({ ...subValue, name: e.target.value})
        }}/>
        {error.name && <p className='error'> {error.name}</p>}
        
        <input 
        className='subscribe-input' 
        placeholder='Email'
        value={subValue.email}
        onChange = { (e) =>{
          setSubValue ({...subValue, email: e.target.value})
        }}/>
        {error.email && <p className='error'> {error.email}</p>}    
        
        <div className='sub-btn-container'>
          <button className='sub-btn' > Subscribe</button>
        </div>
      </div>
      </form>
    </div>
  )
}

export default SubscribeSection