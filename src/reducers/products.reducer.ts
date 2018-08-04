import { ProductActions, productActions } from 'actions';
import { ProductDto } from "dto/product";
import { getType } from 'typesafe-actions';

export interface ProductsState {
    loading: boolean;
    products?: ProductDto[];
  }
  
  const initialState = {
    loading: false,
  };
  
  export const productsReducer = (state: ProductsState = initialState, action: ProductActions): ProductsState => {  
    switch (action.type) {
      case getType(productActions.loadProductCompletedAction):
        return Object.assign({}, state, { products: action.payload });
      case getType(productActions.deleteProductCompletedAction):
        return Object.assign({}, state, { products: state.products!.filter(x => x.id !== action.payload) });
      default:
        return state;
    }
  };