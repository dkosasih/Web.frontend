import { PRODUCTS_DELETE, PRODUCTS_DELETE_COMPLETED, PRODUCTS_LOAD, PRODUCTS_LOAD_COMPLETED } from 'actions/action.types';
import { ProductDto } from 'dto/product';
import { RouterAction } from 'react-router-redux';
import { ActionType, createAction } from 'typesafe-actions';

export type ProductActions = ActionType<typeof productActions>;

export const productActions = {
    loadProductsAction : createAction(PRODUCTS_LOAD, resolve => {
        return (authToken: string) => resolve(authToken);
    }),
    loadProductCompletedAction:  createAction(PRODUCTS_LOAD_COMPLETED, resolve => {
        return (payload: ProductDto[] | null = null) => resolve(payload);
    }),
    deleteProductAction: createAction(PRODUCTS_DELETE, resolve => {
        return (id: string, authToken: string) => resolve({ id, authToken });
    }),
    deleteProductCompletedAction: createAction(PRODUCTS_DELETE_COMPLETED, resolve => {
        return (id: string) => resolve(id);
    })
}

export type RootAction = ProductActions | RouterAction;