import { useCallback, useState } from "react";
import { createContext } from "react";
import { auth, db } from "../../firebase-config/firebase-config";
import { collection, getDocs, query, where, getDoc, doc, deleteDoc, writeBatch } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
export const ProductContext = createContext();

function ProductProvider (props){
    const [ productList, setProductList] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [currentUserId, setCurrentUserId] = useState({});
    const [productIndex, setProductIndex] = useState (null);
    const [productData, setProductData] = useState ({});
    const regCollectionRef = collection(db, "registered");
    const SubcriberCollectionRef = collection(db, "subscribe");
    const productCollectionRef = collection(db, "products");
    const[subList, setSubList] = useState ([]);
    const[regList, setRegList] = useState ([]);
    const [userDetails, setUserDetails] = useState([]);
    const batch = writeBatch(db);

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

      //delete my account
      const deleteAccount = useCallback (async() =>{
        const deleteAccounttDocs = doc (regCollectionRef, currentUserId.uid);
        const userProductRef = doc(db, "products", currentUserId.uid);
        await deleteDoc (deleteAccounttDocs);
        batch.delete(userProductRef);
        await batch.commit();
      })
    

    //   //retrieving specific data
    // const editProductData = async(id) =>{
    //     const getProductDoc = doc(productCollectionRef, id);
    //     const data = await getDoc(getProductDoc);
    //     await getDoc(getProductDoc);
    //     setProductIndex (productIndex => 
    //     productIndex === id ? null : id);
    //     const specificData = query(collection(db, "products"), where(productList.id, "==", productIndex));
    //     const querySnapshot = await getDocs(specificData);
    //     querySnapshot.forEach((doc) =>{
    //       setProductData(doc.data()); 
    //       console.log(productIndex) 
    //     })
    // }

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