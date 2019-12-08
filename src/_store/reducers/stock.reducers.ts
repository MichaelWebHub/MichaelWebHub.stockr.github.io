import { handleActions } from 'redux-actions';
import { FindTicker, GetTickerData, GetTickerIndicators } from '../actions/stock.actions';
import { ISearchTicker, IStockData, IStringMap, ITickerData } from '../interfaces/stock.interfaces';

/** State interface */
export interface IStockState {
  collection: IStockData[];
  searchResult: ISearchTicker[];
  indicators: any;
  loaded: boolean;
}

/** Payload interface */
export interface IStockPayload {
  payload: {
    ticker?: IStringMap<ITickerData>,
    searchResult?: ISearchTicker[],
    indicators: any[]
  };
}

/** Initial state */
const initialState: IStockState = {
  collection: null,
  loaded: false,
  searchResult: [],
  indicators: []
};

const stockReducer = handleActions(
  {
    [GetTickerData.Success]: (state: IStockState, action: IStockPayload) => {
      if (action.payload.ticker) {

        return {
          ...state,
          loaded: true,
          collection: Object.entries(action.payload.ticker).reduce((a: IStockData[], e) => {
            return [...a, {
              'Adj Close': e[1]['5. adjusted close'],
              Close: Number(e[1]['4. close']),
              Date: new Date(e[0]),
              High: e[1]['2. high'],
              Low: e[1]['3. low'],
              Open: Number(e[1]['1. open']),
              Volume: Number(e[1]['6. volume'])
            }]
          }, [])
        }

      }

      return state;
    },

    [FindTicker.Success]: (state: IStockState, action: IStockPayload) => {
      if (action.payload.searchResult) {
        return {
          ...state,
          searchResult: action.payload.searchResult
        }
      }

      return state;
    },

    [GetTickerIndicators.Success]: (state: IStockState, action: IStockPayload) => {
      if (action.payload.indicators) {
        return {
          ...state,
          indicators: action.payload.indicators
        }
      }

      return state;
    }
  },
  initialState
);

export default stockReducer;
