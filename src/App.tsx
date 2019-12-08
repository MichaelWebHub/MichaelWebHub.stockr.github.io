import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Chart from './components/Chart/Chart';

const App: React.FC = () => {

  return (
    <>
      <Header/>
      <main className='root__main'>
        <Chart/>
      </main>
    </>
  );
};

export default App;
