import React, { useCallback, useState } from 'react'
import "./register.css"
import {registerValidation} from "../../Validation"
import { auth, db } from '../../firebase-config/firebase-config';
import {doc, setDoc} from "firebase/firestore"
import {createUserWithEmailAndPassword} from "firebase/auth";
import { useHistory } from 'react-router-dom';

function Register() {

  const [formValue, setFormValue] = useState ({
    fname: "",
    lname: "",
    email: "",
    category: "",
    password: "",
    confirmPassword: "",
  })

  const history = useHistory ();
  const [correctData, setCorrectData] = useState (false);
  const [regError, setRegError] = useState ({});
  const [redirect, setRedirect] = useState(false);
  const [userExist, setUserExist] = useState (false);
  const [loadData, setLoadData] = useState (false);
 
 
  //inserting data to firestore database
  const registerAuth = useCallback( async() =>{  
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth, 
        formValue.email,
        formValue.password,
        )
        setLoadData(true)
   //Giving the same user id in auth to that of firestore database
      await setDoc(doc(db, 'registered', user.uid), {
        email: user.email,
        uid: user.uid,
        firstname: formValue.fname,
        lastname: formValue.lname,
        category: formValue.category,
      }).then(() =>{
        setRedirect(true);
        setLoadData(false)
          if (formValue.category === "Customer"){
            localStorage.setItem('category',"Customer")    
            history.push("/")
          }else if (formValue.category === "Admin"){
            localStorage.setItem('category', "Admin"); 
            history.push("/admin")
          }             
      })
                    
    } catch (err) {
      if (err.code === "auth/email-already-in-use"){
         setUserExist("Email already exist. Please enter another email");    
      }     
    }
  })

  const handleAddUser = () =>{
    if (Object.keys(regError).length === 0 && correctData){ 
    registerAuth();
  }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setRegError(registerValidation(formValue));
    setCorrectData (true);
    handleAddUser();
  }
  
  return ( 
    <div className='register-container'>   
      <div> Image</div>
      <div className='form-container'> 
      <form className='form' onSubmit={handleSubmit}>
        <label className='reg-label'> 
        First Name <span className='required'>*</span></label>
        <input 
          className='reg-input'
          value={formValue.fname}
          onChange = { (e) =>{
            setFormValue ({ ...formValue, fname: e.target.value})
          }}/>
          {regError.fname && <p className='reg-error'> {regError.fname}</p>}
          
        <label className='reg-label'>
           Last Name <span className='required'>*</span></label>
        <input className='reg-input'
        value={formValue.lname}
        onChange = { (e) =>{
          setFormValue ({ ...formValue, lname: e.target.value})
        }}/>
        {regError.lname && <p className='reg-error'> {regError.lname}</p>}    

        <label className='reg-label'> 
        Email <span className='required'>*</span></label>
        <input className='reg-input'
         value={formValue.email}
         onChange = { (e) =>{
           setFormValue ({ ...formValue, email: e.target.value})
         }} />
        {regError.email && <p className='reg-error'> {regError.email}</p>}
        {userExist ? <p className='reg-error'>{userExist}</p> : <p> </p>}
                     
        <label className='reg-label'> 
        Password <span className='required'>*</span></label>
        <input 
          className='reg-input' 
          type= "password"
          value={formValue.password}
          onChange = { (e) =>{
          setFormValue ({ ...formValue, password: e.target.value})
          }}/>
        {regError.password && <p className='reg-error'> {regError.password}</p>}

        <label className='reg-label'> 
        Confirm Password <span className='required'>*</span></label>
        <input 
          className='reg-input' 
          type= "password"
          value={formValue.confirmPassword}
          onChange = { (e) =>{
            setFormValue ({ ...formValue, confirmPassword: e.target.value})
            }}/>
        {regError.confirmPassword && <p className='reg-error'> {regError.confirmPassword}</p>}

        <label className='reg-label'> 
        Category <span className='required'>*</span> </label>
        <input 
          className='reg-input-' 
          type = "radio"
          name='category'
          value= "Admin"
          onChange = { (e) =>{
            setFormValue ({ ...formValue, category: e.target.value})
            }}/> Admin
           <input 
          className='reg-input-radio' 
          type = "radio"
          name='category'
          value= "Customer"
          onChange = { (e) =>{
            setFormValue ({ ...formValue, category: e.target.value})
            }}
          /> Customer
          {regError.category && <p className='reg-error-category'> {regError.category}</p>}

          <button className='reg-btn' disabled ={redirect}>
           <span>{loadData ? <span className='reg-txt'> Redirecting... <div className="loader"> </div></span> : <span> Register</span>}</span>
           </button>
 
          <p className='has-account'>Already have an account? <a href='/login'>Login</a></p>
      </form>
  </div>
    </div>
  )
}

export default Register