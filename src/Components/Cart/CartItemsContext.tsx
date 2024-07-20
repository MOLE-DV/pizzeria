import { createContext, ReactElement, Dispatch, SetStateAction } from 'react';

type CartContext = {
  cart: {[key:string] : string | number }[] | null;
  setCart: Dispatch<SetStateAction<{[key:string] : string | number }[]>>;
};

const CartItemsContext = createContext<CartContext>({
  cart: null,
  setCart: () => {},
});

export default CartItemsContext;