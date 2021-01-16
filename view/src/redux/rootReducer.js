//imports
import { combineReducers } from 'redux';
import { productReducer, productDetailReducer } from './product/productReducer.js';
import { cartReducer } from './cart/cartReducer.js'
import { userLoginReducer, userUpdateProfileReducer } from './user/userReducer'
import { userRegisterReducer } from './user/userReducer'
import { userDetailsReducer, userListReducer, userDeleteReducer } from './user/userReducer'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer,  } from './order/orderReducer'

const rootReducer = combineReducers({
    productList: productReducer,
    productDetails: productDetailReducer,
    cart : cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer

});

export default rootReducer;