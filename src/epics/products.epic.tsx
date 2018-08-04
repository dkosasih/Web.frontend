import { ProductActions, productActions } from 'actions';
import { ProductDto } from 'dto/product';
import { ActionsObservable } from 'redux-observable';
import {  of } from 'rxjs';
import { ajax }  from 'rxjs/ajax';
import { catchError, filter, map, switchMap  } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

// TODO: move ajax call to service so that it's testable - Trello updated
const productsLoadEpic = (action$: ActionsObservable<ProductActions>) =>
    action$.pipe(
        filter( isActionOf(productActions.loadProductsAction)),
        map((action: ProductActions) => action.payload),
        switchMap(loadAction => 
            ajax.getJSON('http://localhost:58527/api/product', { 'Authorization': `Bearer ${loadAction!}` })
                .pipe(
                    map((result: ProductDto[]) => productActions.loadProductCompletedAction(result)),
                    catchError((err) => of(productActions.loadProductCompletedAction()))
                )
        )
    );

const productDeleteEpic = (action$: ActionsObservable<ProductActions>) =>
    action$.pipe(
        filter(isActionOf(productActions.deleteProductAction)),
        map((action: ProductActions) => action.payload as { id: string, authToken: string }),
        switchMap(({ id, authToken }) =>
            ajax.delete(`http://localhost:58527/api/product/${id}`, { 'Authorization': `Bearer ${authToken}` })
                .pipe(
                    map(() => productActions.deleteProductCompletedAction(id)),
                    catchError((err) => of(productActions.deleteProductCompletedAction('0')))
                )
        )
    );

export default [
    productsLoadEpic,
    productDeleteEpic
];
