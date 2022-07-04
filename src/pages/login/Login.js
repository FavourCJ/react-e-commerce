import React, { useContext, useEffect, useState } from 'react'
import "./login.css"
import { Grid, Paper } from "@material-ui/core";
import { loginValidation } from '../../Validation';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../../firebase-config/firebase-config";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ProductContext } from '../../component/contextFile/ProductContext';
import {useLocation} from "react-router-dom"

 function Login() {  

     const { authUser} = useContext(ProductContext);
     const [logError, setLogError] = useState ({});
     const [correctData, setCorrectData] = useState (false);
     const [authError, setAuthError] = useState (false);
     const [redirect, setRedirect] = useState(false);
     const [loadData, setLoadData] = useState (false);
     const location = useLocation();
     const history = useHistory();
     const from = location.state?.from?.path || "/login";
     const [regValue, setRegValue] = useState ({
        email: "",
        password: ""
    })
    
     //Navigating current user based on there category (admin or customer)
     const navigateLoggedUser = async () =>{
      const specificData = query(collection(db, "registered"), where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(specificData);
      querySnapshot.forEach((doc) => {
          if (doc.data().category === "Customer"){
            localStorage.setItem('category',"Customer")        
            history.push("/");
          }else if(doc.data().category === "Admin"){
            localStorage.setItem('category', "Admin");       
            history.push("/admin")
          }
        });
  }

    // Navigating user to their account, based on user's input
    const logInWithEmailAndPassword = async () => {
        try {
            await signInWithEmailAndPassword(
            auth, 
            regValue.email, 
            regValue.password
            ).then(() =>{
              setRedirect(true);
              setLoadData(true);
              navigateLoggedUser();  
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

    useEffect(() =>{
      authUser();
    },[])

     const handleSubmit =(e) =>{
         e.preventDefault();
         setLogError(loginValidation(regValue))
         setCorrectData(true);
         if (Object.keys(logError).length === 0 && correctData){ 
            logInWithEmailAndPassword(); 
            history.push(from, {replace: true});     
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
                     
                     <button className='log-btn' disabled ={redirect}>
                    <span>{loadData ? <span className='reg-txt'> Redirecting... <div className="loader"> </div></span> : <span> Login</span>}</span>
                   </button>
           
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