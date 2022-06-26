import { useCallback, useState } from "react";
import { createContext } from "react";
import { auth, db } from "../../firebase-config/firebase-config";
import { collection, getDocs, query, where, getDoc, doc, deleteDoc, writeBatch } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import {useHistory} from "react-router-dom";

export const ProductContext = createContext();

function ProductProvider (props){
  var history = useHistory();
    const [ productList, setProductList] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [currentUserId, setCurrentUserId] = useState({});
    const regCollectionRef = collection(db, "registered");
    const SubcriberCollectionRef = collection(db, "subscribe");
    const[subList, setSubList] = useState ([]);
    const[regList, setRegList] = useState ([]);
    const [userDetails, setUserDetails] = useState([]);
    const batch = writeBatch(db);
    var history = useHistory();

    //getting current user id
  onAuthStateChanged(auth, (currentUser) =>{
    setCurrentUserId(currentUser)
  });

    //retreiving specific product list
    const getProducts = async()=>{
        const specificDataCollection = query(collection(db, "products"), where("uid", "==", currentUserId.uid));
        const data = await getDocs(specificDataCollection);
        data.forEach((doc) =>{
          setProductList (data.docs.map((doc) =>({
            ...doc.data(), id: doc.id
          })))
        })
      }

      //get subscribers
      const getSubcriber = async()=>{
        const data = await getDocs(SubcriberCollectionRef)
        setSubList (data.docs.map((doc) =>({
          ...doc.data(), id: doc.id
        })))
      }

      //get registered users
      const getRegisteredUsers = async() =>{
        const data = await getDocs(regCollectionRef);
        setRegList (data.docs.map((doc) =>({
          ...doc.data(), id: doc.id
        })))
      }

      //current logged user
      const getCurrentUserData = async()=>{
        const specificData = query(collection(db, "registered"), where("uid", "==", currentUserId.uid));
          const querySnapshot = await getDocs(specificData);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data()); 
        });   
      }

      //get all products
      const getAllProducts = async()=>{
        const specificDataCollection = query(collection(db, "products"));
        const data = await getDocs(specificDataCollection);
        data.forEach((doc) =>{
          setAllProduct (data.docs.map((doc) =>({
            ...doc.data(), id: doc.id
          })))
        })
      }

      const deleteAllUserDoc = async()=>{
        const deleteAccounttDocs = doc (regCollectionRef, currentUserId.uid);
        await deleteDoc (deleteAccounttDocs);
        await batch.commit();
      }

      //delete my account
      const deleteAccount = useCallback (async() =>{
        const userProductRef = doc(db, "products", currentUserId.uid);
        batch.delete(userProductRef);
        await batch.commit();
      });
    
      const allExports = {getProducts, productList, 
                          currentUserId, subList, 
                          getSubcriber, getRegisteredUsers, 
                          regList, userDetails, getCurrentUserData,
                          deleteAccount, getAllProducts, allProduct};
     
    return(
        <ProductContext.Provider value={allExports}>
            {props.children}
        </ProductContext.Provider>
     )
}

export default ProductProvider;