import './menu.sass';
// import cappriciosa from '../../Assets/Images/capriciosa.jpg';
// import pepperoni from '../../Assets/Images/pepperoni.jpg';
// import margherita from '../../Assets/Images/margherita.jpg';
// import hawaiian from  '../../Assets/Images/hawaiian.jpg';
// import veggie from '../../Assets/Images/veggie.jpg';
// import meatlovers from '../../Assets/Images/meat.jpg';
import { useEffect, useState, useContext, ReactElement } from 'react';
import order from '../../Data/order.json'
import popupContext from '../popupContext';
import Popup from '../Popup/popup';
import Cart from '../Cart/Cart';

interface dishFilters{
    [key:string] : string
}


const Menu = () => {
    const data = useContext(popupContext);

    let dishLimit = 20;
    const [cart, setCart] = useState<{[key:string] : string | number }[]>([{}])
    const [cartContentSize, setCartSize] = useState(0);
    let [dishData, setDishData] = useState(order);
    let [dishCount, setDishCount] = useState(0)
    let [dishFilters, setDishFilters] = useState<dishFilters>({
        dishType: 'none'
    });

    const changeSize = (size: string, dishIndex: number) => {
        let changedDishData = Array.from(Object.entries(dishData).map((dish, index) => {
            if(index === dishIndex) dish[1].order.size = size;
            return dish[1];
        }));
    
       setDishData(changedDishData);
    }


    const changeQuanity = (dishIndex:number, number: number) => { 
        let changedDishData = Array.from(Object.entries(dishData).map((dish, index) => {
            if(index === dishIndex && ((dish[1].order.quantity > 0 && number < 0) || ((number > 0 && dishCount < dishLimit) && (cartContentSize + dish[1].order.quantity + number <= dishLimit) && number > 0))) { 
                dish[1].order.quantity = dish[1].order.quantity += number;
                setDishCount(dishCount += number);
            }
            else if(index === dishIndex && cartContentSize + dish[1].order.quantity + number > dishLimit) {        
                data.setPopup((elements) =>
                    [...elements as ReactElement[], <Popup message={`The order limit is set to ${dishLimit} ${dishLimit - cartContentSize > 0 ? `, you can only add ${dishLimit - cartContentSize} more item/s` : ''} `} type="cart-update" />]
                ) 
 
            }

            return dish[1];
        }));
        setDishData(changedDishData);
    }

    const addToCart = (dishIndex:number) => {
        const dish = dishData[dishIndex];

        if(dish.order.quantity > 0 && dishCount <= dishLimit && cartContentSize + dish.order.quantity <= dishLimit){
            setCart(cartcontent => [...cartcontent, {
                name: dish.name,
                type: dish.type,
                size: dish.order.size,
                quantity: dish.order.quantity
            }])
            data.setPopup((elements) =>
                [...elements as ReactElement[], <Popup message={`[${dish.order.size.charAt(0).toUpperCase() + dish.order.size.slice(1)} ${dish.type} ${dish.name.toLowerCase()} x ${dish.order.quantity}] added`} icon={dish.image} type="cart-update" />]
            )

        }else if(cartContentSize + dish.order.quantity >= dishLimit){
            data.setPopup((elements) =>
                [...elements as ReactElement[], <Popup message={`The order limit is set to ${dishLimit} ${dishLimit - cartContentSize > 0 ? `, you can only add ${dishLimit - cartContentSize} more item/s` : ''} `} type="warning" />]
            ) 
        }
    }

    let dishCountQuery = 0;
    const addToDishFilters = (filter: { [id: string] : string}) => {
        setDishFilters(values => ({
            ...values,
            [Object.keys(filter)[0]] : filter[Object.keys(filter)[0]]
        }));
        dishCountQuery = 0;
    }

    useEffect(() => {
        let sum = 0;
        Object.entries(cart).forEach(item => {
            if(Object.keys(item[1]).length > 0) sum += item[1].quantity as number;
        })
        setCartSize(sum);
    })


    return (
        <main id="menu">
            <section className="left">
                <div className="title">menu</div>
                <div className="filters">
                    <label className='types-label'>
                        Search for:
                        <select className="types" onChange={(e) => addToDishFilters({"dishType" : e.target.value as string})}>
                            <option value="none">All</option>
                            <option value="pizza" className="filter">Pizza</option>
                            <option value="pasta" className="filter">Pasta</option>
                            <option value="main-dish" className="filter">Main Dish</option>
                        </select>
                    </label>
                </div>
                <div className="bottom">
                    {
                        dishData.map((dish, index) => {

                            if(index === dishData.length -1 && dishCountQuery === 0){
                                return <h1>Not found</h1>
                            }

                            if(dishFilters.dishType !== 'none' && dish.type !== dishFilters.dishType)
                            {
                                return null;
                            } 
                            
                            dishCountQuery++;

                            return(
                                <div className="dish-container">
                                    <div className="pizza" key={index}>
                                        <div className='image' style={{backgroundImage: `URL(${dish.image })`}} />
                                        <div id="bottom">
                                            <div className="name">{dish.name}</div>
                                            <div className="description">{dish.description}</div>

                                            <div className="order" onClick={() => addToCart(index)}>order</div>
                                            
                                            <div className="quanity-container">
                                                <div className="button minus" onMouseUp={() => changeQuanity(index,-1)}></div>
                                                <div className="quanity">{dish.order.quantity}</div>
                                                <div className="button plus" onMouseUp={() => changeQuanity(index,1)}></div>
                                            </div>

                                            {
                                                dish.type === "pizza" 
                                                ? 
                                                    <div id="sizes">
                                                        <div className={`size ${dish.order.size === 'small' ? 'selected' : ''}`} onMouseDown={() => changeSize('small', index)}>
                                                            <div className="pizza-image" />
                                                            <div className="text">SMALL - 28CM</div>
                                                        </div>

                                                        <div className={`size ${dish.order.size === 'medium' ? 'selected' : ''}`} onMouseDown={() => changeSize('medium', index)}>
                                                            <div className="pizza-image" />
                                                            <div className="text">MEDIUM - 32CM</div>
                                                        </div>

                                                        <div className={`size ${dish.order.size === 'big' ? 'selected' : ''}`} onMouseDown={() => changeSize('big', index)}>
                                                            <div className="pizza-image" />
                                                            <div className="text">BIG - 40CM</div>
                                                        </div>

                                                        <div className={`size ${dish.order.size === 'giant' ? 'selected' : ''}`} onMouseDown={() => changeSize('giant', index)}>
                                                            <div className="pizza-image" />
                                                            <div className="text">GIANT - 50CM</div>
                                                        </div>
                                                    </div>
                                                :
                                                    <div></div>

                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            );
                        })
                    }
                </div>
            </section>
            <Cart></Cart>
            {/* {cartContentSize > 0 ? <Cart /> : null} */}
        </main>
    )
}

export default Menu