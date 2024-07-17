import './cart.sass';
import React from 'react';
import { useState, useEffect } from 'react';

interface Item {
    name: string,
    type: string,
    size: string,
    price: number,
    image: string,
    quantity: number
}

const Cart = (props: any) => {

    return (
        <div id="cart">
            <div className="title">checkout</div>

            <div id="bottom">
                <section className="left">
                    <h1>All items: {props.orderSize} Total cost: {props.totalCost}$</h1>
                    {
                        props.items.map((item: Item)=> {
                            if(props.items.length < 1) return
                            return (
                                <div className='orderItem'>
                                    <div className="left-order">
                                        <div className="icon-order" style={{backgroundImage: `URL(${item.image})`}}></div>
                                        <div className="title-order">{item.size != '' ? `${item.size.toString().charAt(0).toUpperCase() + item.size.toString().slice(1)} ` : null }{item.name} x {item.quantity}</div>
                                    </div>
                                    <div className="right-order">
                                        price: {item.price as number * Number(item.quantity)}$
                                    </div>
                                </div>
                            )
                        })
                    }
                </section>
                <section className="right">
                    
                </section>
            </div>
        </div>
    )
}

export default Cart;