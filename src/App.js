import style from './App.module.css';
import Header from "./Components/Header/Header";
import Menu from "./Components/Menu/Menu";
import React from 'react';
import Modal from './Components/Modal/Modal';
import {useState} from 'react';
import CartProvider from './store/CartProvider';

const App = () => {
const [isShownCart, setIsShownCart] = useState(false);

const showCart = ()=>{
  setIsShownCart(true);
}

const hideCart = ()=>{
  setIsShownCart(false)
}
  return (
    <CartProvider>
    <Header onConfirm = {showCart}/>
    <main className={style.main}> 
    <Menu/>
    </main>
   { isShownCart && <Modal onConfirm={hideCart}/>}
    </CartProvider>
  );
};

export default App;
