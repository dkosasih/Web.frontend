import { PRODUCTS_LOAD, PRODUCTS_LOAD_COMPLETED } from 'actions/action.types';
import { Product } from 'dto/product';
// import { Action } from 'redux';
import { ActionType, createAction } from 'typesafe-actions';

export type ProductActions = ActionType<typeof productActions>;


export const productActions = {
    loadProductsAction : createAction(PRODUCTS_LOAD, resolve => {
        return (authToken: string) => resolve(authToken);
    }),
    productsLoadCompletedAction:  createAction(PRODUCTS_LOAD_COMPLETED, resolve => {
        return (payload: Product[] | null = null) => resolve(payload);
    }),
}

// export class ProductsLoadAction implements Action {
//     readonly type: string = PRODUCTS_LOAD;
//     constructor(public payload: string) { }
// }

// export class ProductsLoadCompletedAction implements Action {
//     readonly type: string = PRODUCTS_LOAD_COMPLETED;
//     constructor(public payload: Product[] | null = null) { }
// }

// export type ProductActions = ProductsLoadAction | ProductsLoadCompletedAction;