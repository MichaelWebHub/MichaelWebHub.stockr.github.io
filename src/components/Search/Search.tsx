import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Search.scss';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FindTicker, GetTickerData } from '../../_store/actions/stock.actions';
import { ISearchTicker, IStore } from '../../_store/interfaces/stock.interfaces';

const Search = () => {
  const dispatch = useDispatch();

  /** Show results */
  const [showResults, setShowResults] = useState(false);

  /** Subscribe to store */
  const searchResult: ISearchTicker[] = useSelector((store: IStore) => store.stock.searchResult);

  /** References */
  const input = useRef<HTMLInputElement>(null);
  const componentNode = useRef<HTMLInputElement>(null);

  /** Search for tickers */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  /** Get ticker data */
  const getTickerData = (ticker: ISearchTicker) => {
    input.current.value = ticker['2. name'];
    dispatch({ type: GetTickerData.Pending, payload: ticker['1. symbol'] });
    // dispatch({ type: GetTickerIndicators.Pending, payload: ticker });
    setShowResults(false);
  };

  /** Click outside */
  const handleClickOutside = (event: MouseEvent) => {
    if (componentNode.current && componentNode.current.contains(event.target as HTMLDivElement)) {
      return;
    }

    setShowResults(false);
  };

  /** Click outside handler */
  useEffect(() => {
    if (showResults) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [showResults]);

  /** Results JSX */
  const resultsJSX = searchResult.map((e) =>
    <div key={e['1. symbol']} className='search__item' onClick={() => getTickerData(e)}>
      <div className='search__item-row'>
        <span className='search__name'>{e['2. name']}</span>
        <span className='search__flag'>{e['4. region']}</span>
      </div>
      <div className='search__item-row'>
        <span className='search__ticker'>{e['1. symbol']}</span>
      </div>
    </div>);

  /** Поиск по атрибуту/навыку */
  useEffect(() => {
    const sub = fromEvent(input.current as HTMLInputElement, 'keyup')
      .pipe(
        map((a: Event) => (a.target as HTMLInputElement).value),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((inputString: string) => {
        dispatch({ type: FindTicker.Pending, payload: inputString });
        setShowResults(true);
      });
    return () => sub.unsubscribe();
  }, [dispatch]);

  return (
    <form className='stock__search-form' onSubmit={onSubmit}>
      <input ref={input} type='text' className='stock__search' placeholder='Search...'/>
      <div className='search__results' ref={componentNode}>
        {showResults && searchResult.length > 0 && resultsJSX}
      </div>
    </form>
  );
};

export default Search;
