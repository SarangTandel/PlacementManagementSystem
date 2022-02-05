import { combineReducers } from "redux";
import { productReducer,selectedProductReducer,loginUserReducer } from "./productReducer";

const reducers =combineReducers ({
    allProducts:productReducer,
    product:selectedProductReducer,
    user : loginUserReducer
});

export default reducers;