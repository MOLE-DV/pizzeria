import './cart.sass';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import CartItemsContext from './CartItemsContext';

const Cart = (props: any) => {
    const cartContext = useContext(CartItemsContext);

    const removeFromCart = (cartIndex:number) => {
        const item = cartContext.cart!.find((cartItem, index) => index === cartIndex)
        const cart = cartContext.cart
        cart!.splice(cartIndex,1);
        if(cart === null) return
        cartContext.setCart(cart);
    }
    
    let totalcost = 0;

    return (
        <div id="cart">
            <div className="title">checkout</div>

            <div id="bottom">
                <section className="left">
                    <div id="orderItems">
                    {
                        cartContext.cart!.map((item: {[key:string] : string | number}, index: number)=> {
                            if(cartContext.cart!.length < 1) return
                            return (
                                <div className='orderItem' key={index}>
                                    <div className="left-order">
                                        <div className="icon-order" style={{backgroundImage: `URL(${item.image})`}}></div>
                                        <div className="title-order">{item.size != '' ? `${item.size.toString().charAt(0).toUpperCase() + item.size.toString().slice(1)} ` : null }{item.name} x {item.quantity}</div>
                                    </div>
                                    <div className="right-order">
                                        price: {item.price as number * Number(item.quantity)}$
                                        <button onClick={() => removeFromCart(index)}>Remove</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div> 
                </section>
                <section className="right">
                    <form action="" method="post">
                        <label>Name: <input type="text" /></label>
                        <label>Surname: <input type="text" /></label>
                        <label>City: <input type="text" /></label>
                        <label>Street: <input type="text" placeholder=''/></label>
                        <label>House number: <input type="text" /></label>
                        <div id="info">
                            <h2>Items in cart [{props.orderSize}], Total cost [{props.totalCost}$]</h2>
                        </div>
                        <input type="submit" value="Order" /> <input type="reset" value="Reset" />
                    </form>

                </section>
            </div>
        </div>
    )
}

export default Cart;