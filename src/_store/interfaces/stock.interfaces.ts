import { IStockState } from '../reducers/stock.reducers';

export interface IStore {
  stock: IStockState;
}

/** String map */
export interface IStringMap<T> {
  [key: string]: T;
}

/** AmCharts data interface */
export interface IStockData {
  'Adj Close': string;
  Close: number;
  Date: Date;
  High: string;
  Low: string;
  Open: number;
  Volume: number;
}

/** Alpha Vantage response */
export interface IStockResponse {
  'Meta Data': any;
  'Time Series (Daily)': IStringMap<ITickerData>
}

/** Alpha Vantage data interface */
export interface ITickerData {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. adjusted close': string;
  '6. volume': string;
  '7. dividend amount': string;
  '8. split coefficient': string;
}

/** Search ticker */
export interface ISearchTicker {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
}
