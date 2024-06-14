import './menu.sass';
// import cappriciosa from '../../Assets/Images/capriciosa.jpg';
// import pepperoni from '../../Assets/Images/pepperoni.jpg';
// import margherita from '../../Assets/Images/margherita.jpg';
// import hawaiian from  '../../Assets/Images/hawaiian.jpg';
// import veggie from '../../Assets/Images/veggie.jpg';
// import meatlovers from '../../Assets/Images/meat.jpg';
import { useEffect, useState } from 'react';
import order from '../../Data/order.json'
import Popup from '../Popup/popup';


const Menu = () => {
    let pizzaLimit = 20;

    let [pizzaData, setPizzaData] = useState(order);
    let [pizzas, setPizzas] = useState(0)
    let [popup, setPopup] = useState();

    const changeSize = (size: string, pizzaIndex: number) => {
        let changedPizzaData = Array.from(Object.entries(pizzaData).map((pizza, index) => {
            if(index === pizzaIndex) pizza[1].order.size = size;
            return pizza[1];
        }));
    
       setPizzaData(changedPizzaData);
    }


    const changeQuanity = (pizzaIndex:number, number: number) => {
        let changedPizzaData = Array.from(Object.entries(pizzaData).map((pizza, index) => {

            if(index === pizzaIndex && ((pizza[1].order.quantity > 0 && number < 0) || (number > 0 && pizzas < pizzaLimit))) { 
                pizza[1].order.quantity = pizza[1].order.quantity += number;
                setPizzas(pizzas += number);
            }

            return pizza[1];
        }));
        
        setPizzaData(changedPizzaData);
    }




    return (
        <main id="menu">
            <section className="left">
                <div className="title">menu</div>
                <div className="bottom">
                    {
                        pizzaData.slice(0, 4).map((pizza, index) => {
                            
                            console.log(pizza.image)

                            return(
                                <div className="pizza" key={index}>
                                    <div className='image' style={{backgroundImage: `URL(${pizza.image })`}} />
                                    <div id="bottom">
                                        <div className="name">{pizza.name}</div>
                                        <div className="description">{pizza.description}</div>

                                        <div className="order">order</div>
                                        
                                        <div className="quanity-container">
                                            <div className="button minus" onClick={() => changeQuanity(index,-1)}></div>
                                            <div className="quanity">{pizza.order.quantity}</div>
                                            <div className="button plus" onClick={() => changeQuanity(index,1)}></div>
                                        </div>

                                        <div id="sizes">
                                            <div className={`size ${pizza.order.size === 'small' ? 'selected' : ''}`} onClick={() => changeSize('small', index)}>
                                                <div className="pizza-image" />
                                                <div className="text">SMALL - 28CM</div>
                                            </div>

                                            <div className={`size ${pizza.order.size === 'medium' ? 'selected' : ''}`} onClick={() => changeSize('medium', index)}>
                                                <div className="pizza-image" />
                                                <div className="text">MEDIUM - 32CM</div>
                                            </div>

                                            <div className={`size ${pizza.order.size === 'big' ? 'selected' : ''}`} onClick={() => changeSize('big', index)}>
                                                <div className="pizza-image" />
                                                <div className="text">BIG - 40CM</div>
                                            </div>

                                            <div className={`size ${pizza.order.size === 'giant' ? 'selected' : ''}`} onClick={() => changeSize('giant', index)}>
                                                <div className="pizza-image" />
                                                <div className="text">GIANT - 50CM</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </section>
            {popup}
        </main>
    )
}

export default Menu