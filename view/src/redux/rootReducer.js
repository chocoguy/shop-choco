//imports
import { combineReducers } from 'redux';
import { productReducer, productDetailReducer } from './product/productReducer';

const rootReducer = combineReducers({
    productList: productReducer,
    productDetails: productDetailReducer,
});

export default rootReducer;