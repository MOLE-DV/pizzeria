import './menu.sass';
import { useEffect, useState, useContext, ReactElement } from 'react';
import order from '../../Data/order.json';
import popupContext from '../popupContext';
import Popup from '../Popup/popup';
import Cart from '../Cart/Cart';
import CartItemsContext from '../Cart/CartItemsContext';
import { changeSize, addToDishFilters } from './cartManipulation';

interface DishFilters {
    [key: string]: string;
}

const Menu = () => {
    const data = useContext(popupContext);

    const dishLimit = 20;
    const [cart, setCart] = useState<{ [key: string]: string | number }[]>([]);
    const [cartContentSize, setCartSize] = useState(0);
    const [totalCartCost, setTotalCartCost] = useState(0);

    const [dishData, setDishData] = useState(order);

    const [dishFilters, setDishFilters] = useState<DishFilters>({
        dishType: 'none'
    });


    const changeQuanity = (dishIndex: number, number: number) => {
        const dishCount = cart.reduce((sum, item) => sum + (item.quantity as number), 0)
        const updatedDishData = dishData.map((dish, index) => {
            if(index === dishIndex && ((dish.order.quantity > 0 && number < 0) || ((number > 0 && dishCount < dishLimit) && (cartContentSize + dish.order.quantity + number <= dishLimit) && number > 0))) {
                dish.order.quantity += number;
            }
            else if(index === dishIndex && cartContentSize + dish.order.quantity + number > dishLimit) {        
                data.setPopup((elements) =>
                    [...elements as ReactElement[], <Popup message={`The order limit is set to ${dishLimit}${dishLimit - cartContentSize > 0 ? `, you can only add ${dishLimit - cartContentSize} more item/s` : ''}`} type="cart-update" />]
                ) 
            }
    
            return dish;
        });
        setDishData(updatedDishData);
    };

    const addToCart = (dishIndex: number) => {
        const dish = dishData[dishIndex];
        const dishPrice = Object.entries(dish.price).find(price => price[0] === dish.order.size || dish.order.size === "")![1] as number;
        const dishCount = cart.reduce((sum, item) => sum + (item.quantity as number), 0)


        if (dish.order.quantity > 0 && dishCount <= dishLimit && cartContentSize + dish.order.quantity <= dishLimit) {
            const foundIndex = cart.findIndex(cartItem => cartItem.name === dish.name && cartItem.size === dish.order.size);
            if (foundIndex === -1) {
                setCart([...cart, {
                    name: dish.name,
                    type: dish.type,
                    size: dish.order.size,
                    price: dishPrice,
                    image: dish.image,
                    quantity: dish.order.quantity,
                    dishIndex: dishIndex
                }]);
            } else {
                const updatedCart = cart.map((cartItem, index) => (
                    index !== foundIndex ? cartItem : {
                        ...cartItem,
                        quantity: Number(cartItem.quantity) + Number(dish.order.quantity)
                    }
                ));
                setCart(updatedCart);
            }

            data.setPopup((elements) =>
                [...elements as ReactElement[], <Popup message={`[${dish.order.size ? `${dish.order.size.charAt(0).toUpperCase() + dish.order.size.slice(1)} ` : ''}${dish.type} ${dish.name.toLowerCase()} x ${dish.order.quantity}] added for ${dishPrice * dish.order.quantity}$`} icon={dish.image} type="warning" />]
            ) 
        
        } else if (cartContentSize + dish.order.quantity >= dishLimit) {
            data.setPopup((elements) =>
                [...elements as ReactElement[], <Popup message={`The order limit is set to ${dishLimit} ${dishLimit - cartContentSize > 0 ? `, you can only add ${dishLimit - cartContentSize} more item/s` : ''} `} type="warning" />]
            ) 
        }
    };


    
    useEffect(() => {
        const totalCost = cart.reduce((sum, item) => sum + (item.price as number) * Number(item.quantity), 0);
        setTotalCartCost(totalCost);
        setCartSize(cart.reduce((sum, item) => sum + Number(item.quantity), 0));
    }, [cart]);



    let dishCountQuery = 0;

    return (
        <main id="menu">
            <section className="left">
                <div className="title">menu</div>
                <div className="filters">
                    <label className='types-label'>
                        Search for:
                        <select className="types" onChange={(e) => setDishFilters(addToDishFilters({ "dishType": e.target.value }, dishFilters))}>
                            <option value="none">All</option>
                            <option value="pizza">Pizza</option>
                            <option value="pasta">Pasta</option>
                            <option value="main-dish">Main Dish</option>
                        </select>
                    </label>
                </div>
                <div className="bottom">
                    {dishData.map((dish, index) => {
                        if (index === dishData.length - 1 && dishCountQuery === 0) {
                            return <h1 key={index}>Not found</h1>;
                        }

                        if (dishFilters.dishType !== 'none' && dish.type !== dishFilters.dishType) {
                            return null;
                        }

                        dishCountQuery++;

                        const price = Object.entries(dish.price).find(price => price[0] === dish.order.size || dish.order.size === "")![1] as number;

                        return (
                            <div className="dish-container" key={index}>
                                <div className="pizza">
                                    <div className='image' style={{ backgroundImage: `URL(${dish.image})` }} />
                                    <div id="bottom">
                                        <div className="name">{dish.name}</div>
                                        <div className="price">
                                            {price * (dish.order.quantity === 0 ? 1 : dish.order.quantity)}$
                                        </div>
                                        <div className="description">{dish.description}</div>
                                        <div className="order" onClick={() => addToCart(index)}>order</div>
                                        <div className="quanity-container">
                                            <div className="button minus" onClick={() => changeQuanity(index, -1)}></div>
                                            <div className="quanity">{dish.order.quantity}</div>
                                            <div className="button plus" onClick={() => changeQuanity(index, 1)}></div>
                                        </div>
                                        {dish.type === "pizza" && (
                                            <div id="sizes">
                                                {['small', 'medium', 'big', 'giant'].map(size => (
                                                    <div key={size} className={`size ${dish.order.size === size ? 'selected' : ''}`} onClick={() => setDishData(changeSize(size, index))}>
                                                        <div className="pizza-image" />
                                                        <div className="text">{size.toUpperCase()} - {size === 'small' ? '28CM' : size === 'medium' ? '32CM' : size === 'big' ? '40CM' : '50CM'}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <CartItemsContext.Provider value={{ cart, setCart }}>
                <Cart/>
                </CartItemsContext.Provider>
        </main>
    );
};

export default Menu;
