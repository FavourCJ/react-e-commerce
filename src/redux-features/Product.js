import {createSlice} from "@reduxjs/toolkit"
export const productSlice = createSlice ({
    name: "product",
    initialState: {
        productData: {
            name: "",
            color: "",
            stock: 0,
            gender: "",
            category: "",
            description: "",
        }
    },

    reducers: {
        editItem: (state, action)=>{
            state.productData = action.payload;
        }
    }
})

export const  {editItem} = productSlice.actions

export default productSlice.reducer