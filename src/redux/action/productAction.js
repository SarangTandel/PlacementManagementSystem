import { ActionTypes } from "../constants/action-type"

export const setProducts = (products) => {
    return {
        type : ActionTypes.SET_PRODUCTS,
        payload : products,
    };
};


export const selectedProduct = (product) =>{
    return{
        type : ActionTypes.SELECTED_PRODUCT,
        payload : product,
    };
};

export const loginUser=(user)=>{
    return{
        type :ActionTypes.LOGIN_USER,
        payload:user
    }
}