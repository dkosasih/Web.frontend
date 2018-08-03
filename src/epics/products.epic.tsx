import { ProductActions, productActions } from 'actions';
import { Product } from 'dto/product';
import { ActionsObservable } from 'redux-observable';
import {  of } from 'rxjs';
import { ajax }  from 'rxjs/ajax';
import { catchError, filter, map, switchMap  } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

const productsLoadEpic = (action$: ActionsObservable<ProductActions>) =>
    action$.pipe(
        filter( isActionOf(productActions.loadProductsAction)),
        map((action: ProductActions) => action.payload),
        switchMap(loadAction => {
            return ajax.getJSON('http://localhost:58527/api/product', { 'Authorization': `Bearer ${loadAction!}` })
                .pipe(
                    map((result: Product[]) => productActions.productsLoadCompletedAction(result)),
                    catchError((err) => of(productActions.productsLoadCompletedAction()))
                )
        })
    );

export default [
    productsLoadEpic,
];
