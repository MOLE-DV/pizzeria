import './popup.sass';
import React, { useEffect, useState, useContext } from 'react';
import popupContext from '../popupContext';
import delay from '../delay';


const Popup = (props:any) => {
    const data = useContext(popupContext)
    const [animation, setAnimation] = useState('goUp');
    const [icon, setIcon] = useState("Assets/Images/exclamamation.svg");
    const [visible, setVisible] = useState(true);

    useEffect(() =>{
        if(props.icon !== undefined) setIcon(props.icon);

    }, [icon])


    useEffect(() => {
        async function makeRequest() {
            setAnimation('goUp');
      
            await delay(3000);
      
            setAnimation('goDown');
            
            await delay(250);

            setVisible(false)
        }

        makeRequest();
    }, [])


    async function viewCartContent() {
        document.querySelector('#cart')?.scrollIntoView({behavior: 'smooth'})
        
        setAnimation('goDown');
            
        await delay(250);

        setVisible(false)
    }
 
    return visible ? (
        <div id="popup"  className={animation}>
            <div className="top" onClick={() => props.type === "cart-update" ? viewCartContent() : ""}>
                <div className="icon" style={{backgroundImage: `URL(${icon})`}}></div>
                <h1 className="message">{props.message}</h1>
            </div>
            <div className="slider"></div>
        </div>
    )
    : null
}

export default Popup;