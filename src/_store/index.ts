/** Создаем middleware для эффектов (эпиков) */
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import stockReducer from './reducers/stock.reducers';
import { FindTicker$, GetTickerData$, GetTickerIndicators$ } from './effects/stock.effects';

const observableMiddleware = createEpicMiddleware();

/** Регистрируем редьюсеры */
const reducers = combineReducers({
  stock: stockReducer
});

/** Создаем store */
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(observableMiddleware))
);

/** Регистрируем эффекты */
observableMiddleware.run(
  combineEpics(
    GetTickerData$,
    FindTicker$,
    GetTickerIndicators$
  )
);
