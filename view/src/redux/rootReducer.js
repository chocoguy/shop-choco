//imports
import { combineReducers } from 'redux';
import { productReducer, productDetailReducer } from './product/productReducer.js';
import { cartReducer } from './cart/cartReducer.js'
import { userLoginReducer, userUpdateProfileReducer } from './user/userReducer'
import { userRegisterReducer } from './user/userReducer'
import { userDetailsReducer } from './user/userReducer'
const rootReducer = combineReducers({
    productList: productReducer,
    productDetails: productDetailReducer,
    cart : cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer

});

export default rootReducer;