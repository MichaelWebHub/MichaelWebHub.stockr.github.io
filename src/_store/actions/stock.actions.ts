import { createActions } from 'redux-actions';
import { ISearchTicker, ITickerData } from '../interfaces/stock.interfaces';

export enum GetTickerData {
  Pending = '[Pending] Get ticker data',
  Success = '[Success] Get ticker data'
}

export enum FindTicker {
  Pending = '[Pending] Find ticker',
  Success = '[Success] Find ticker'
}

export enum GetTickerIndicators {
  Pending = '[Pending] Get ticker indicators',
  Success = '[Success] Get ticker indicators'
}

createActions({
  [GetTickerData.Pending]: (payload: string) => payload,
  [GetTickerData.Success]: (payload: { ticker: ITickerData }) => payload,

  [GetTickerIndicators.Pending]: (payload: string) => payload,
  [GetTickerIndicators.Success]: (payload: { indicators: any[] }) => payload,

  [FindTicker.Pending]: (payload: string) => payload,
  [FindTicker.Success]: (payload: { searchResult: ISearchTicker[] }) => payload
});
