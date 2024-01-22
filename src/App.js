import React from 'react';
import './App.css';
import CreateAccount from './component/CreateAccount';
import Login from './component/Login';
import Body from './component/Body';
import Product from './component/ProductList';
import Header from './component/Header';
import { Counter } from './component/Counter';

function App() {
  return (
    <div className="App">
      <Header/>
      <Body/>
      {/* <CreateAccount/> */}
    </div>
  )
}

export default App;