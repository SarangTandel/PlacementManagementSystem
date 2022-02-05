import { ActionTypes } from "../constants/action-type";

const initialstate = {
    products: []
}

export const productReducer = (state=initialstate, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return {...state,products:payload};
        default:
            return state;
    }

}

export const selectedProductReducer = (state={},{type,payload}) =>{
    switch (type) {
        case ActionTypes.SELECTED_PRODUCT:
            return{...state,...payload};    
        default:
            return state;
    }
}

export const loginUserReducer=(state={},{type,payload})=>{
    switch (type) {
        case ActionTypes.LOGIN_USER:
            return {...state,...payload}    
        default:
            return state;
    }
}