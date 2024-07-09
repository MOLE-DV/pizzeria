import './cart.sass';

const Cart = (props: any) => {
    return (
        <div id="cart">
            <div className="title">checkout</div>

            <div id="bottom">
                <section className="left">
                    {
                        props.items.map((item: {[key: string] : string | number})=> {
                            if(props.items.length < 1) return
                            return (
                                <div className='orderItem'>
                                    <div id="top">
                                        <div className="icon-order"></div>
                                        <div className="title-order">{item.name}</div>
                                    </div>
                                    <div id="bottom-order">
                                        Quantity: {item.quantity} 
                                        <br />
                                        Size: {item.size}
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