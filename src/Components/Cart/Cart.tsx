import './cart.sass';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import CartItemsContext from './CartItemsContext';
import card from './Images/credit-card.svg';
import blik from './Images/Blik-logo.svg';
import paypal from './Images/paypal-3.svg';

const Cart = (props: any) => {
    const cartContext = useContext(CartItemsContext);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null)

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
                                        <div className="info">{item.price as number * Number(item.quantity)}$</div>
                                        <button onClick={() => removeFromCart(index)} className='remove-button'>Remove</button>
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
                                <label>Name: <input type="text" required/></label>
                                <label>Surname: <input type="text" required/></label>
                            </div>
                            
                            <div className="line">
                                <label>City <input type="text" required/></label>
                                <label>Postcode <input type="text" required/></label>
                                <label>Street: <input type="text"/></label>
                            </div>
                            <div className="line">
                                <label>House number: <input type="text" required/></label>
                                <label>Apartment number: <input type="text" required/></label>
                            </div>
                        </div>
                        <div id="bottom-form">
                            <div className="left-bottom-form">
                                <div className="info">
                                    Total items: <span>{cartContext.cart!.reduce((sum, item) => sum + (item.quantity as number), 0)}</span>
                                </div>
                                <div className="info">
                                    Total cost: <span>{cartContext.cart!.reduce((sum, item) => sum + (item.price as number * Number(item.quantity)), 0)}$</span>
                                </div>
                            </div>
                            <div className="right-bottom-form">
                                <div className="info">Select payment method:</div>
                                <div id="payments">
                                    <img src={card} alt='card' className='payment card' onClick={() => setPaymentMethod('card')}/>
                                    <img src={blik} alt='blik' className='payment blik' onClick={() => setPaymentMethod('blik')}/>
                                    <img src={paypal} alt="paypal" className='payment paypal' onClick={() => setPaymentMethod('paypal')}/>

                                </div>
                            </div>
                        </div>
                    </form>

                </section>
            </div>
        </div>
    )
}

export default Cart;