import { routerReducer, RouterState } from 'react-router-redux';
import { productsReducer, ProductsState  } from 'reducers/products.reducer';
import { combineReducers } from "redux";

export type RootState = {
    products: ProductsState
    routing: RouterState
};

const reducers = combineReducers({
    products: productsReducer,
    routing: routerReducer
});

export default reducers;