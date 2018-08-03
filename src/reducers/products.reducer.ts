import { ProductActions, productActions } from 'actions';
import { Product } from "dto/product";
import { getType } from 'typesafe-actions';

export interface ProductsState {
    loading: boolean;
    products?: Product[];
  }
  
  const initialState = {
    loading: false,
  };
  
  export const productsReducer = (state: ProductsState = initialState, action: ProductActions): ProductsState => {  
    switch (action.type) {
      case getType(productActions.productsLoadCompletedAction):
        return Object.assign({}, state, { products: action.payload });
      default:
        return state;
    }
  };