/** Стартуем сценарий */
import Axios from 'axios-observable';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';

export const findTicker = (search: string) => {
  return Axios.get(`&function=SYMBOL_SEARCH&keywords=${search}`).pipe(map(({ data }) => data.bestMatches));
};

export const getTickerData = (ticker: string) => {
  return Axios.get(`&function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=compact`).pipe(map(({ data }) => data));
};

export const getTickerIndicators = (t: string) => {
  return zip(
    Axios.get(`&function=RSI&symbol=${t}&interval=monthly&time_period=30&series_type=open`).pipe(map(({ data }) => data)),
    Axios.get(`&function=CCI&symbol=${t}&interval=monthly&time_period=30`).pipe(map(({ data }) => data)),
    Axios.get(`&function=MACD&symbol=${t}&interval=monthly&series_type=open`).pipe(map(({ data }) => data)),
    Axios.get(`&function=EMA&symbol=${t}&interval=monthly&time_period=30&series_type=open`).pipe(map(({ data }) => data)),
  );
};
