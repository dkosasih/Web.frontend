import { ProductActions, productActions, RootAction } from 'actions';
import { ProductDto } from 'dto/product';
import { push } from 'react-router-redux';
import { ActionsObservable } from 'redux-observable';
import {  of } from 'rxjs';
import { ajax }  from 'rxjs/ajax';
import { catchError, filter, map, switchMap  } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

// TODO: move ajax call to service so that it's testable - Trello updated
const productsLoadEpic = (action$: ActionsObservable<RootAction>) =>
    action$.pipe(
        filter(isActionOf(productActions.loadProductsAction)),
        map((action: ProductActions) => action.payload),
        switchMap(loadAction =>
            ajax.getJSON('http://localhost:58527/api/product', { 'Authorization': `Bearer ${loadAction!}` })
                .pipe(
                    map((result: ProductDto[]) => productActions.loadProductCompletedAction(result)),
                    catchError((err) => {
                        // TODO: Log properly and send to error page
                        console.log(err.xhr.response);
                        return of(push('/'));
                    })
                )
        )
    );

const productDeleteEpic = (action$: ActionsObservable<RootAction>) =>
    action$.pipe(
        filter(isActionOf(productActions.deleteProductAction)),
        map((action: ProductActions) => action.payload as { id: string, authToken: string }),
        switchMap(({ id, authToken }) =>
            ajax.delete(`http://localhost:58527/api/product/${id}`, { 'Authorization': `Bearer ${authToken}` })
                .pipe(
                    map(() => productActions.deleteProductCompletedAction(id)),
                    catchError((err) => {
                        // TODO: Log properly and send to error page
                        console.log(err);
                        return of(push('/'));
                    })
                )
        )
    );

export default [
    productsLoadEpic,
    productDeleteEpic
];
