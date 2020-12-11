//imports
import { combineReducers } from 'redux';
import { productReducer, productDetailReducer } from './product/productReducer.js';
import { cartReducer } from './cart/cartReducer.js'
const rootReducer = combineReducers({
    productList: productReducer,
    productDetails: productDetailReducer,
    cart : cartReducer

});

export default rootReducer;