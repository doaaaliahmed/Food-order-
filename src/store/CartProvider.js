import React, {useReducer} from 'react';
import CartContext from './cart-context';

const cartDefaultItems = {
    items:[],
    totalAmount : 0
}

const cartReducer = (state,action)=>{
    if(action.type === 'ADD'){
        const updateAmount = state.totalAmount + action.item.price * action.item.amount;
        // if item is already exsit , store it in a variable to use it
        // findIndex() method return a index for element we looking for 
        const exsitingCartItemIndex= state.items.findIndex(item=> item.id === action.item.id);

        // store the exsitingItem 
        const exsitingItem = state.items[exsitingCartItemIndex];

        let updateItems ;

        // check if exsitingItem not empty 
        if(exsitingItem){
            //if so 
            const updateItem = {
                ...exsitingItem,
                amount : exsitingItem.amount + action.item.amount
            }

            updateItems = [...state.items];
            updateItems[exsitingCartItemIndex] = updateItem;

        }else{
            // if not 
            updateItems = state.items.concat(action.item);
        }

        return {
            items : updateItems,
            totalAmount : updateAmount
        }

    }

    if(action.type=== 'REMOVE'){

        const exsitingCartItemIndex= state.items.findIndex((item) => item.id === action.id);

        const exsitingItem = state.items[exsitingCartItemIndex];
        const updateTotalAmount = state.totalAmount - exsitingItem.price;

        let updateItems;

        if(exsitingItem.amount === 1) {
            
            updateItems = state.items.filter(item => item.id !== action.id);

        }else{
            const updateItem = {...exsitingItem , amount : exsitingItem.amount -1};
            updateItems = [...state.items];
            updateItems[exsitingCartItemIndex] =updateItem;
            
        }

        return {
            items : updateItems,
            totalAmount : updateTotalAmount
        }

    
    }

    return cartDefaultItems;
}

const CartProvider = (props)=>{
   const [cartState, dispatchCartState] =  useReducer(cartReducer , cartDefaultItems);

    const addItemToCart = item =>{
        dispatchCartState({type : 'ADD' , item:item})

    }

    const removeItemFromCart = id =>{
        dispatchCartState({type:'REMOVE' , id:id})

    }

    const cartContext = {
        items :cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemToCart,
        removeItem : removeItemFromCart

    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;