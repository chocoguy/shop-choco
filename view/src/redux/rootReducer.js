//imports
import { combineReducers } from 'redux';
import { productReducer, productDetailReducer } from './product/productReducer.js';
import { cartReducer } from './cart/cartReducer.js'
import { userLoginReducer } from './user/userReducer'
const rootReducer = combineReducers({
    productList: productReducer,
    productDetails: productDetailReducer,
    cart : cartReducer,
    userLogin: userLoginReducer

});

export default rootReducer;