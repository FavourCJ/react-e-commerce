import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { ProductContext } from '../../contextFile/ProductContext';
import {useHistory, withRouter} from "react-router-dom";
import { db } from '../../../firebase-config/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

function MyAccount() {

  const {userDetails, getCurrentUserData, authUser, removeLocalStorageData, deleteAccount, currentUserId} = useContext(ProductContext);
  const [showEdit, setShowEdit] = useState(false); 
  const history = useHistory();
  const [editUser, setEditUser] = useState({
    editName: userDetails.firstname,
    editSurname: userDetails.lastname
})

//edit account details
const editMyAccount = async () =>{
  const userRef = doc(db, "registered", currentUserId.uid);
  await updateDoc(userRef, {
    firstname: editUser.editName,
    lastname: editUser.editSurname,
  }).then(() =>{
      setShowEdit(false);
  })
}

  const redirectDeletedUser = () =>{
    deleteAccount();
    history.push("/");
  }

  const logOut =() =>{
    const auth = getAuth();
    signOut(auth).then(() => {
      removeLocalStorageData();
      localStorage.setItem('loggedUser', false)
     history.push("/login")
   }).catch((error) => {
  console.log(error)
});
  }

  useEffect(() =>{
    getCurrentUserData();
    authUser();
  },[getCurrentUserData, authUser])

  return (
    <div className='my-account-container'>
      {showEdit ? 
         <div className='edit-my-account-details-container'>
          <div className='admin-form-container'>
         <p className='my-account-header'> Edit Profile</p> 
         <div className='my-account-details'>
           <label className='my-account-label'  >Name</label>
           <input className='my-account-text-input'
            value={editUser.editName}
            onChange = { e=>
             setEditUser ({...editUser, editName: e.target.value})
           }
           />
         </div>
        
         <div className='my-account-details'>
           <label className='my-account-label'>Surname</label>
           <input className='my-account-text-input'
             value={editUser.editSurname}
             onChange = { e=>
             setEditUser ({...editUser, editSurname: e.target.value})
           }/>
         </div>
   
         <div className='my-account-details'>
           <label className='my-account-label'>Email</label>
           <p className='my-account-text'> {userDetails.email}</p>
         </div>
   
         <div className='my-account-details'>
           <label className='my-account-label'>Account Type</label>
           <p className='my-account-text'> {userDetails.category}</p>
         </div>
   
         </div> 
 
       <div className='admin-button-container'>
         <button className='admin-btn' onClick={editMyAccount}> Save Changes</button>
       </div>
 
     </div>
         :
         <div className='admin-form-container'> 
         <p className='my-account-header'>My Profile</p> 
         <div className='my-account-details'>
           <label className='my-account-label'>Name</label>
           <p className='my-account-text'> {userDetails.firstname}</p>
         </div>
   
         <div className='my-account-details'>
           <label className='my-account-label'>Surname</label>
           <p className='my-account-text'> {userDetails.lastname}</p>
         </div>
   
         <div className='my-account-details'>
           <label className='my-account-label'>Email</label>
           <p className='my-account-text'> {userDetails.email}</p>
         </div>
   
         <div className='my-account-details'>
           <label className='my-account-label'>Account Type</label>
           <p className='my-account-text'> {userDetails.category}</p>
         </div>
   
         <div className='admin-button-container'>
           <button className='admin-btn' onClick={logOut}> Log Out</button>
         </div>
   
         <div className='admin-button-container'>
         <button className='admin-edit-btn' onClick={()=>setShowEdit(true)}> Edit Account</button>
           <button className='admin-delete-btn' onClick={redirectDeletedUser}> Delete my account</button>
         </div>
         </div> 
      }
     
     
    </div>
  )
}

export default withRouter(MyAccount)