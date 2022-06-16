import React, { useState } from 'react'
import "./login.css"
import { Grid, Paper } from "@material-ui/core";
import { loginValidation } from '../Validation';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../firebase-config/firebase-config";
import { collection, getDocs, query, where } from 'firebase/firestore';

 function Login() {  
    
     const [logError, setLogError] = useState ({});
     const [correctData, setCorrectData] = useState (false);
     const [loggedUserDetails, setLoggedUserDetails] = useState ({});
     const [authError, setAuthError] = useState (false);
    
     let history = useHistory();
     const [regValue, setRegValue] = useState ({
        email: "",
        password: ""
    })

    // Navigating user to their account, based on user's input
    const logInWithEmailAndPassword = async () => {
        try {
        const user = await signInWithEmailAndPassword(
            auth, 
            regValue.email, 
            regValue.password
            ).then (() =>{            
            //calling logged user's navigation function
              navigateLoggedUser();
              console.log("user has been logged in")
            })   
        } catch (err) {
            if(err.code === "auth/wrong-password"){
                setAuthError("Wrong combination")
            }else if(err.code === "auth/too-many-requests"){
               setAuthError("Access to this account has been temporarily disable due to to many failed login attempts. Please try again later")
            }else if(err.code === "auth/user-not-found"){
                setAuthError("User not found")
            }
        }
    };
     
    //Navigating current user based on there category (admin or customer)
        const navigateLoggedUser = async () =>{
            const specificData = query(collection(db, "registered"), where("uid", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(specificData);
            querySnapshot.forEach((doc) => {
                setLoggedUserDetails(doc.data()); 
                if (loggedUserDetails.category == "Customer"){
                  history.push("/home");
                }else if(loggedUserDetails.category == "Admin"){
                  history.push("/admin")
                }
              });
        }

     const handleSubmit =(e) =>{
         e.preventDefault();
         setLogError(loginValidation(regValue))
         setCorrectData(true);
         if (Object.keys(logError).length === 0 && correctData){ 
            logInWithEmailAndPassword();      
   }
        
     }
  return (
   
    <Grid container>
    <Grid item xs={6}>
    <div className='login-container'>
    <Paper
   
    style={{
      width: "60vh",
      height: "100 auto",
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.39)",
      padding: "10px 50px 50px"
      
    }}
  >
        <div className='login-body'>
            <div className='form-container'>
                <form className='form' onSubmit={handleSubmit}>
                
                    <p className='log-header'> Login</p>
                    <label className='log-label'> Email</label>
                    <input 
                     className='log-input'
                     value={regValue.email}
                     onChange = { (e) =>{
                         setRegValue ({...regValue, email: e.target.value})
                     }}/>
                      {logError.email && <p className='reg-error'> {logError.email}</p>}
        
                    <label className='log-label'> Password</label>
                    <input 
                     className='log-input'
                     value={regValue.password}
                     type = "password"
                     onChange = { (e) =>{
                         setRegValue ({...regValue, password: e.target.value})
                     }}/>
                     {logError.password && <p className='reg-error'> {logError.password}</p>}
                     {authError ? <p className='auth-error'>{authError}</p> : <p> </p>}
                     
                    <button 
                     className='log-btn'
                     onClick={logInWithEmailAndPassword}> Login</button>
                    <p className='has-account'>Do not have an account? <a href='/register'>Register</a></p>
                </form>
            </div>

        </div>
    </Paper>
    </div>
    </Grid>
</Grid>

  )
}

export default Login