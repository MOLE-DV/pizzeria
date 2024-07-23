import './cart.sass';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import CartItemsContext from './CartItemsContext';

const Cart = (props: any) => {
    const cartContext = useContext(CartItemsContext);


    const removeFromCart = (cartIndex: number) => {
        const updatedCart = cartContext.cart!.filter((_, index) => index !== cartIndex);
        cartContext.setCart(updatedCart);
    };
    
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
                        <div id="top-form">
                            <div className="line">
                                <label>Name: <input type="text" /></label>
                                <label>Surname: <input type="text" /></label>
                            </div>
                            
                            <div className="line">
                                <label>City <input type="text" /></label>
                                <label>Postcode <input type="text" /></label>
                                <label>Street: <input type="text" placeholder=''/></label>
                                <label>House number: <input type="text" /></label>
                            </div>
                        </div>
                        <div id="bottom-form">
                            <div className="left-bottom-form">
                                <label>Test: <input type="text" /></label>
                            </div>
                            <div className="right-bottom-form">
                                <label>Test: <input type="text" /></label>
                            </div>
                        </div>
                    </form>

                </section>
            </div>
        </div>
    )
}

export default Cart;