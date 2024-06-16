import './menu.sass';
// import cappriciosa from '../../Assets/Images/capriciosa.jpg';
// import pepperoni from '../../Assets/Images/pepperoni.jpg';
// import margherita from '../../Assets/Images/margherita.jpg';
// import hawaiian from  '../../Assets/Images/hawaiian.jpg';
// import veggie from '../../Assets/Images/veggie.jpg';
// import meatlovers from '../../Assets/Images/meat.jpg';
import { useEffect, useState, useContext } from 'react';
import order from '../../Data/order.json'
import popupContext from '../popupContext';
import Popup from '../Popup/popup';

interface dishFilters{
    [key:string] : string
}

const Menu = () => {
    const data = useContext(popupContext);

    let dishLimit = 20;

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

            if(index === dishIndex && ((dish[1].order.quantity > 0 && number < 0) || (number > 0 && dishCount < dishLimit))) { 
                dish[1].order.quantity = dish[1].order.quantity += number;
                setDishCount(dishCount += number);
                
            }
            else if(dishCount >= dishLimit){                
                data.setPopup(<Popup message={`The order limit is set to ${dishLimit}`}/>)
            }

            return dish[1];
        }));
        setDishData(changedDishData);
    }


    const addToCart = (dishIndex:number) => {
        const dish = dishData[dishIndex];

        if(dish.order.quantity > 0 && dishCount < dishLimit){
            data.setPopup(<Popup message={`[${dish.order.size.charAt(0).toUpperCase() + dish.order.size.slice(1)} ${dish.type} ${dish.name.toLowerCase()} x ${dish.order.quantity}] added to cart`} icon={dish.image}/>)
        }else if(dishCount >= dishLimit){
            data.setPopup(<Popup message={`The order limit is set to ${dishLimit}`}/>)
        }
    }

    const addToDishFilters = (filter: { [id: string] : string}) => {
        setDishFilters(values => ({
            ...values,
            [Object.keys(filter)[0]] : filter[Object.keys(filter)[0]]
        }));
    }

    const [menuContent, setMenuContent] = useState(
        100
    )

    let dishType = null;
    let lastDishType = null;

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
                            if(dishFilters.dishType !== 'none' && dish.type !== dishFilters.dishType) return null;

                            return(
                                <div className="dish-container">
                                    <div className="pizza" key={index}>
                                        <div className='image' style={{backgroundImage: `URL(${dish.image })`}} />
                                        <div id="bottom">
                                            <div className="name">{dish.name}</div>
                                            <div className="description">{dish.description}</div>

                                            <div className="order" onClick={() => addToCart(index)}>order</div>
                                            
                                            <div className="quanity-container">
                                                <div className="button minus" onClick={() => changeQuanity(index,-1)}></div>
                                                <div className="quanity">{dish.order.quantity}</div>
                                                <div className="button plus" onClick={() => changeQuanity(index,1)}></div>
                                            </div>

                                            {
                                                dish.type === "pizza" 
                                                ? 
                                                    <div id="sizes">
                                                        <div className={`size ${dish.order.size === 'small' ? 'selected' : ''}`} onClick={() => changeSize('small', index)}>
                                                            <div className="pizza-image" />
                                                            <div className="text">SMALL - 28CM</div>
                                                        </div>

                                                        <div className={`size ${dish.order.size === 'medium' ? 'selected' : ''}`} onClick={() => changeSize('medium', index)}>
                                                            <div className="pizza-image" />
                                                            <div className="text">MEDIUM - 32CM</div>
                                                        </div>

                                                        <div className={`size ${dish.order.size === 'big' ? 'selected' : ''}`} onClick={() => changeSize('big', index)}>
                                                            <div className="pizza-image" />
                                                            <div className="text">BIG - 40CM</div>
                                                        </div>

                                                        <div className={`size ${dish.order.size === 'giant' ? 'selected' : ''}`} onClick={() => changeSize('giant', index)}>
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
        </main>
    )
}

export default Menu