import './App.css';
import React from "react";
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Header from './components/header/Header'
import Home from './pages/Home'
import Coin from './pages/Coin';
function App() {
  return (
    <BrowserRouter>
    <div className="app">
     <Header></Header>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/coins/:id' element={<Coin/>}></Route>
     </Routes>
    </div>
    </BrowserRouter>
  );
}
export default App;
