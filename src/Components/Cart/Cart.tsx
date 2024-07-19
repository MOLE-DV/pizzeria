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