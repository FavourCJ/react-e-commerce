
export const Validation = (value) =>{
    let error = {};
      if (!value.name){
        error.name = "Name is required"
    }

    if (!value.email){
        error.email = "Email is required"
    }else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.email)){
        error.email = "Email is invalid"
    }
        return error;
}

export const itemValidation = (data) =>{
    let itemError = {};

    if (!data.name){
        itemError.name = "Item name is required"
    }else if (!/^[a-zA-Z ]*$/.test(data.name)){
        itemError.name = "Item name should not contain number or any special character"
    }else if(data.name.length < 2){
        itemError.name = "Item name should be atleast 2"
  }

  if (!data.color){
    itemError.color = "Color name is required"
  }else if (!/^[a-zA-Z ]*$/.test(data.color)){
    itemError.color = "Color should not contain number or any special character"
   }

   if (!data.description){
    itemError.description = "Description is required"
  }

  if (!data.stock){
    itemError.stock = "Stock number is required"
    }else if (!/^[0-9]*$/.test(data.stock)){
        itemError.stock = "Stock must only be positive numbers"
    }else if (data.stock == 0){
        itemError.stock = "Stock must be above 0"
    }

    if (!data.category){
        itemError.category = "Category is required"
        }

    if (!data.gender){
        itemError.gender = "Gender is required"
        }

   if (!data.price){
        itemError.price = "Price is required"
        }else if (!/^[0-9]*$/.test(data.price)){
            itemError.price = "Price must only be positive numbers"
        }
        else if(!data.currency){
            itemError.price = "Currency is required"
        }
    if (!data.image){
        itemError.image = "Please upload an image"
        }

        return itemError;
}

export const registerValidation = (formValue) =>{
       let formError = {};
       
    if (!formValue.fname){
        formError.fname = "First name is required"
    }else if (!/^[a-zA-Z]*$/.test(formValue.fname)){
        formError.fname = "Name should not contain number or any special character"
    }

    if (!formValue.lname){
        formError.lname = "Last name is required"
    }else if (!/^[a-zA-Z- ]*$/.test(formValue.lname)){
        formError.lname = "Name should not contain number or any special character except hyphen"
    }

    if (!formValue.email){
        formError.email = "Email name is required"
    }else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValue.email)){
        formError.email = "Email is invalid"
    }

    if (!formValue.password){
        formError.password = "Password is required"
    }else if (formValue.password.length < 8 || formValue.password.length >12){
        formError.password = "Password must be atleast 8 characters and less than 13";
      }

    if (!formValue.confirmPassword){
        formError.confirmPassword = "Confirm Password is required"
    }else if (formValue.confirmPassword !== formValue.password){
        formError.confirmPassword = "Password do not match"
    }

    if (!formValue.category){
        formError.category = "Category is required"
    }else if (formValue.category === "Admin"){
         if (!/^\w+([.-]?\w+)*@favourcj.com$/.test(formValue.email)){
            formError.email = "Email must end with @favourcj.com for Admin account"
        }
        
    }
    return formError;
}

export const loginValidation =(logVal)=>{
    let error = {};
    if (!logVal.email){
        error.email = "Email is required"
    }else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(logVal.email)){
        error.email = "Email is invalid"
    }

    if (!logVal.password){
        error.password = "Password is required"
    }
    return error;
}

export const editItemValidation = (editValue) =>{
    let editError ={};
    if (!editValue.editName){
        editError.editName = "Product Name is required"
    }else if (editValue.editName.length < 2){
        editError.editName = "Product Name should be atleast 2"
    }

    if (!editValue.editColor){
        editError.editColor = "Product colour is required"
    }else if (editValue.editColor.length < 2){
        editError.editName = "Product colour should be atleast 2"
    }

    if (!editValue.editDescription){
        editError.editDescription = "Product description is required"
    }else if (editValue.editDescription.length < 5){
        editError.editName = "Product description should be atleast 5"
    }

    if (!editValue.editStock){
        editError.editStock = "Product stock number is required"
    }

    if (!editValue.editGender){
        editError.editGender = "Gender is required"
    }

    if (!editValue.editCategory){
        editError.editCategory = "Category is required"
    }

    return editError;
}

export const orderItem = (quantity) =>{
    let err = {}

    if(!quantity){
        err.quantity = "Please Enter the quantity you want"
    }else if(quantity < 1){
        err.quantity = "Quantity should be atleast 1"
    }
    return err
}