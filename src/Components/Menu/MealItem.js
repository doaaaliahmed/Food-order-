import Button from "../UI/Button";
import Input from "../UI/Input";
import style from "./MenuList.module.css";
import {useRef , useState , useContext} from 'react';
import CartContext from '../../store/cart-context';


const MealItem = props=>{
const cartCtx = useContext(CartContext);
 const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandlerFunc = (e)=>{
    e.preventDefault();
    const enterdAmount = amountInputRef.current.value;
    const enterdAmountNumber = +enterdAmount;
    if(enterdAmount.trim().length === 0 || enterdAmountNumber < 1 || enterdAmountNumber >5){
      setAmountIsValid(false)
      return;
    }

    
   cartCtx.addItem({
    id:props.id,
    name: props.name,
    price: props.price,
    amount : enterdAmountNumber
   })
  }

    return (
        <li className={style.listItem} key={props.id}>
          <div>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <p className={style.price}>${props.price}</p>
          </div>
          <div>
            <form onSubmit={submitHandlerFunc}>
                <Input  label='amount' ref={amountInputRef}  input={{
                    id:'amount',
                    type:'number',
                    min:"1",
                    max:"5",
                    step :'1',
                    defaultValue : '1'
                }}/>
                <Button className={style.addBtn}>+ Add</Button>
                {!amountIsValid && <p>please enter a valid amount (1-5)</p>}
            </form>
          </div>
        </li>
    )
}

export default MealItem;