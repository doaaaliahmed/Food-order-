import style from './Header.module.css';
import Button from '../UI/Button';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';

const Header =(props)=>{

  const cartCtx = useContext(CartContext);

  const numberOfItems = cartCtx.items.reduce((curNumber, item)=>{
    return curNumber + item.amount
  },0)


    return (
        <nav className={style.nav}>
        <h1>React Meals</h1>
        <Button className={style.cartBtn} onClick={props.onConfirm}>Your Cart <span>{numberOfItems}</span></Button>
      </nav>
      
    )
}

export default Header;