import './cart.sass';
import React from 'react';
import { useState, useEffect, useContext, ReactElement } from 'react';
import CartItemsContext from './CartItemsContext';
import card from './Images/credit-card.svg';
import blik from './Images/Blik-logo.svg';
import paypal from './Images/paypal-3.svg';
import popupContext from '../popupContext';
import Popup from '../Popup/popup';

interface clientInformation {
    [key: string] : string | null
}

const Cart = (props: any) => {
    const popup = useContext(popupContext);
    const cartContext = useContext(CartItemsContext);
    
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
    const [clientInfo, setClientInfo] = useState<clientInformation>() 

    const removeFromCart = (cartIndex: number, orderName: string) => {
        const updatedCart = cartContext.cart!.filter((_, index) => index !== cartIndex);
        cartContext.setCart(updatedCart);
        popup.setPopup((popups) => 
            [...popups as ReactElement[], <Popup message={`${orderName} removed from cart`} type="item_remove" time={1500}/>]
        )
    };



    const saveClientInformation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget as HTMLFormElement)

        if(cartContext.cart!.length < 1) {
            popup.setPopup((popups) => [...popups as ReactElement[], <Popup message="Please add an item to cart first" type="warning" time={2000}/>])
            return
        }

        if(paymentMethod === null){
            popup.setPopup((popups) => [...popups as ReactElement[], <Popup message="Please choose payment method first" type="warning" time={5000}/>])
            return
        }

        const emptyData = Array.from(data.entries()).filter((value) => {return value[1] === ""} )

        if(emptyData.length > 0){
            let processedName = emptyData[0].toString().replace('_', ' ').replace(',', "");
            processedName = processedName[0].toUpperCase() + processedName.slice(1)

            const emptyElement = event.currentTarget.elements.namedItem(emptyData[0].toString().replace(',', "")) as HTMLElement

            Array.from(event.currentTarget.elements).forEach((element: any) => {
                element.style.borderColor = 'black';
            });                   
            
            emptyElement.style.borderColor = 'red';
            emptyElement.focus();

            popup.setPopup((popups) => [...popups as ReactElement[], <Popup message={`${processedName} field needs to be filled`} type="warning" time={5000}/>])
            return
        }
        popup.setPopup((popups) => [...popups as ReactElement[], <Popup message={`TODO: show payment tab`} type="warning" time={10000}/>])
    }
    
    return (
        <div id="cart">
            <div className="title">checkout</div>

            <div id="bottom">
                <section className="left">
                    <div id="orderItems">
                    {
                        cartContext.cart!.length < 1 ? <h1 className="emptyCart">First add something to cart!</h1> : null
                    }
                    {
                        cartContext.cart!.map((item: {[key:string] : string | number}, index: number)=> {
                            if(cartContext.cart!.length < 1) return
                            const orderTitle = `${item.size != '' ? `${item!.size.toString().charAt(0).toUpperCase() + item!.size.toString().slice(1)} ` : '' }${item.name} x ${item.quantity}`
                            return (
                                <div className='orderItem' key={index}>
                                    <div className="left-order">
                                        <div className="icon-order" style={{backgroundImage: `URL(${item.image})`}}></div>
                                        <div className="title-order">{orderTitle}</div>
                                    </div>
                                    <div className="right-order">
                                        <div className="info">{item.price as number * Number(item.quantity)}$</div>
                                        <button onClick={() => removeFromCart(index, orderTitle)} className='remove-button'>Remove</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div> 
                </section>
                <section className="right">
                    <form onSubmit={saveClientInformation}>
                        <div id="top-form">
                            <div className="line">
                                <label>Name: <input type="text"  name='name'/></label>
                                <label>Surname: <input type="text"  name='surname'/></label>
                            </div>
                            
                            <div className="line">
                                <label>City <input type="text"  name='city'/></label>
                                <label>Postcode <input type="text" name='postcode'/></label>
                                <label>Street: <input type="text" name='street'/></label>
                            </div>
                            <div className="line">
                                <label>House number / Apartment number: <input type="text" name='house_number'/></label>
                            </div>
                        </div>
                        <div id="bottom-form">


                            <div className="info pay">Select payment method:</div>
                            <div id="payments">
                                <img src={card} alt='card' className={`payment card ${paymentMethod === 'card' ? 'selected' : ''}`} onClick={() => setPaymentMethod('card')}/>
                                <img src={blik} alt='blik' className={`payment blik ${paymentMethod === 'blik' ? 'selected' : ''}`} onClick={() => setPaymentMethod('blik')}/>
                                <img src={paypal} alt="paypal" className={`payment paypal ${paymentMethod === 'paypal' ? 'selected' : ''}`} onClick={() => setPaymentMethod('paypal')}/>
                            </div>
                            <div id="line-info">
                                <div className="info-payment">
                                    Total items: <span>{cartContext.cart!.reduce((sum, item) => sum + (item.quantity as number), 0)}</span>
                                </div>

                                <div className="info-payment">
                                    Total cost: <span>{cartContext.cart!.reduce((sum, item) => sum + (item.price as number * Number(item.quantity)), 0)}$</span>
                                </div>
                            </div>
                            <button type='submit' id='next'>Next</button>
                        </div>
                    </form>

                </section>
            </div>
        </div>
    )
}

export default Cart;