import { Fragment, useContext } from "react";
import style from "./Modal.module.css";
import ReactDOM from "react-dom";
import Button from "../UI/Button";
import CartContext from "../../store/cart-context";
import CartItem from "../Menu/CartItem";

const Overlay = (props) => {
  return <div className={style.overlay} onClick={props.onClick}></div>;
};

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const cartIsEmpty = cartCtx.items.length < 1;

  const addItemsToCart = (item) => {
    cartCtx.addItem({...item , amount : 1});
  };

  const removeItems = (id) => {
    cartCtx.removeItem(id)
  };

  const listItem = (
    <ul className={style.list}>
      {cartCtx.items.map((list) => (
        <CartItem
          key={list.id}
          price={list.price}
          name={list.name}
          amount={list.amount}
          onAdd={addItemsToCart.bind(null, list)}
          onRemove={removeItems.bind(null, list.id)}
        />
      ))}
    </ul>
  );
  return (
    <div className={style.modalItems}>
      <div>{listItem}</div>
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={style.btns}>
        <Button className={style["close-btn"]} onClick={props.onClick}>
          Close
        </Button>
        {!cartIsEmpty && <Button className={style["order-btn"]}>Order</Button>}
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Overlay onClick={props.onConfirm} />,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <Cart onClick={props.onConfirm} />,
        document.getElementById("modal")
      )}
    </Fragment>
  );
};

export default Modal;
