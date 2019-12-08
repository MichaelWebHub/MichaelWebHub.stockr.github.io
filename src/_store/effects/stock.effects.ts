/** Fetch ticker data */
import { ActionsObservable, ofType } from 'redux-observable';
import { Action } from 'redux-actions';
import { FindTicker, GetTickerData, GetTickerIndicators } from '../actions/stock.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { findTicker, getTickerData, getTickerIndicators } from '../services/stock.services';
import { ISearchTicker, IStockResponse } from '../interfaces/stock.interfaces';

export const GetTickerData$ = (actions$: ActionsObservable<Action<string>>) =>
  actions$.pipe(
    ofType(GetTickerData.Pending),
    switchMap((action) =>
      getTickerData(action.payload).pipe(
        map((data: IStockResponse) => {
          return { type: GetTickerData.Success, payload: { ticker: data['Time Series (Daily)'] } };
        }),
        catchError((e) => of(e))
      )
    )
  );

export const FindTicker$ = (actions$: ActionsObservable<Action<string>>) =>
  actions$.pipe(
    ofType(FindTicker.Pending),
    switchMap((action) =>
      findTicker(action.payload).pipe(
        map((searchResult: ISearchTicker[]) => {
          return { type: FindTicker.Success, payload: { searchResult } };
        }),
        catchError((e) => of(e))
      )
    )
  );

export const GetTickerIndicators$ = (actions$: ActionsObservable<Action<string>>) =>
  actions$.pipe(
    ofType(GetTickerIndicators.Pending),
    switchMap((action) =>
      getTickerIndicators(action.payload).pipe(
        map((indicators) => {
          return { type: GetTickerIndicators.Success, payload: { indicators } };
        }),
        catchError((e) => of(e))
      )
    )
  );
