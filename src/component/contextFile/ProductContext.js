import { useCallback, useState } from "react";
import { createContext } from "react";
import { auth, db } from "../../firebase-config/firebase-config";
import { collection, getDocs, query, where, doc, deleteDoc, writeBatch } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';

export const ProductContext = createContext();

function ProductProvider (props){

    const [ productList, setProductList] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [currentUserId, setCurrentUserId] = useState({});
    const regCollectionRef = collection(db, "registered");
    const SubcriberCollectionRef = collection(db, "subscribe");
    const[subList, setSubList] = useState ([]);
    const[regList, setRegList] = useState ([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userDetails, setUserDetails] = useState([]);
    const [female, setFemale] = useState([]);
    const [male, setMale] = useState([]);
    const [other, setOther] = useState([]);
    const [cartArray, setCartArray] = useState([]);
    const [wishListArray, setWishListArray] = useState([]);
    const [showButtons, setShowButtons] = useState(false);
    
    const batch = writeBatch(db);
   
    //getting current user id
    const authUser = () =>{
      onAuthStateChanged(auth, (currentUser) =>{
        setCurrentUserId(currentUser);
        if (currentUser){
          setIsLoggedIn(true);
          localStorage.setItem('loggedUser', true)
        }else if (!currentUser){
          setIsLoggedIn(false);
          localStorage.setItem('loggedUser', false)
        }
      });
    
    }
    
     //check login dtatus
  const checkeLoginStatus = () =>{
    if(localStorage.getItem('loggedUser') === "true" && localStorage.getItem("category") ==="Customer"){
      setShowButtons(true)
    }
  }

    //retreiving specific product list
    const getProducts = async()=>{
        
          const specificDataCollection = query(collection(db, "products"), where("uid", "==", currentUserId.uid));
          const data =  await getDocs(specificDataCollection);
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

      const getWomenCollection = async()=>{
        const specificDataCollection = query(collection(db, "products"), where("ItemGender", "==", "Female"));
        const data = await getDocs(specificDataCollection);
        data.forEach((doc) =>{
          setFemale (data.docs.map((doc) =>({
            ...doc.data(), id: doc.id
          })))
        })
      }

      const getMaleCollection = async()=>{
        const specificDataCollection = query(collection(db, "products"), where("ItemGender", "==", "Male"));
        const data = await getDocs(specificDataCollection);
        data.forEach((doc) =>{
          setMale (data.docs.map((doc) =>({
            ...doc.data(), id: doc.id
          })))
        })
      }

      const getOtherCollection = async()=>{
        const specificDataCollection = query(collection(db, "products"), where("ItemGender", "==", "Other"));
        const data = await getDocs(specificDataCollection);
        data.forEach((doc) =>{
          setOther (data.docs.map((doc) =>({
            ...doc.data(), id: doc.id
          })))
        })
      }

      const setLocalStorageData = (val) => {
        const setSpecificData = {
          id: val.id,
          name: val.ItemName,
          color: val.ItemColor,
          price: val.ItemPrice,
          currency:  val.PriceCurrency,
          category: val.itemCategory,
          gender: val.ItemGender,
          stock:  val.AvailableStock,
          description: val.itemDescription
        }

        localStorage.setItem("product-data", JSON.stringify(setSpecificData));      
      };

      const removeLocalStorageData = (val) => {
        const setSpecificData = {
          id: val.id,
          name: val.ItemName,
          color: val.ItemColor,
          price: val.ItemPrice,
          currency:  val.PriceCurrency,
          category: val.itemCategory,
          gender: val.ItemGender,
          stock:  val.AvailableStock,
          description: val.itemDescription
        }
        localStorage.getItem("product-data", JSON.stringify(setSpecificData)); 
        
      };

      
  const saveCartArrayProduct = (val) =>{
    var products = JSON.parse(localStorage.getItem("product-array") || "[]");
    const setSpecificData = {
      id: val.id,
      name: val.ItemName,
      color: val.ItemColor,
      price: val.ItemPrice,
      currency:  val.PriceCurrency,
      category: val.itemCategory,
      gender: val.ItemGender,
      stock:  val.AvailableStock,
      description: val.itemDescription
    }
    products.push(setSpecificData)
     localStorage.setItem("product-array", JSON.stringify(products));
 
  }

  //save wishlist
  const saveArrayWishListProduct = (val) =>{
    var products = JSON.parse(localStorage.getItem("wishlist-array") || "[]");
    const setSpecificData = {
      id: val.id,
      name: val.ItemName,
      color: val.ItemColor,
      price: val.ItemPrice,
      currency:  val.PriceCurrency,
      category: val.itemCategory,
      gender: val.ItemGender,
      stock:  val.AvailableStock,
      description: val.itemDescription
    }
    products.push(setSpecificData)
     localStorage.setItem("wishlist-array", JSON.stringify(products));
  }

  //get Wish List in local storage
  const getWishList = ()=>{
    setWishListArray(JSON.parse(localStorage.getItem("wishlist-array")));
  }

  const getCartArray = () =>{
    setCartArray(JSON.parse(localStorage.getItem("product-array")));
  }

  const removeSavedDataArray = (val) =>{
    const setSpecificData = {
      id: val.id,
      name: val.name,
      price: val.price,
      currency:  val.currency,
    }

    
    console.log (setSpecificData)
     const hi = localStorage.getItem('product-array')
     console.log(hi)
    //JSON.parse(localStorage.removeItem("product-array", setSpecificData))
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
                          deleteAccount, getAllProducts, allProduct, 
                          setLocalStorageData, removeLocalStorageData,
                          isLoggedIn, authUser, getWomenCollection,
                          female, getMaleCollection, male, getOtherCollection,
                           other, saveCartArrayProduct, getCartArray, cartArray,
                           removeSavedDataArray, saveArrayWishListProduct, wishListArray,
                           getWishList, showButtons, checkeLoginStatus};
     
    return(
        <ProductContext.Provider value={allExports}>
            {props.children}
        </ProductContext.Provider>
     )
}

export default ProductProvider;