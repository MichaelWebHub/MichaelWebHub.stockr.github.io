import React from 'react';
import './Header.scss';
import Search from '../Search/Search';

const Header = () => {
  return (
    <header className='root__header'>
      <h1 className='header__logo'>Stockr</h1>
      <div className='header__search'>
        <Search/>
      </div>
    </header>
  );
};

export default Header;

