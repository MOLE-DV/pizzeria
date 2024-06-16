import './popup.sass';
import React, { useEffect, useState, useContext } from 'react';
import popupContext from '../popupContext';

const delay = (ms:number) => new Promise(
    resolve => setTimeout(resolve, ms)
);

const Popup = (props:any) => {
    const data = useContext(popupContext)
    const [animation, setAnimation] = useState('goUp');
    const [icon, setIcon] = useState("Assets/Images/exclamamation.svg");


    useEffect(() =>{
        if(props.icon !== undefined) setIcon(props.icon);
    }, [icon])

    console.log(icon);

    useEffect(() => {
        async function makeRequest() {
            setAnimation('goUp');
      
            await delay(3000);
      
            setAnimation('goDown');
            
            await delay(250);

            data.setPopup(<div></div>);
          }
          console.log(animation);
          makeRequest();
    }, [])

    return (
        <div id="popup" className={animation}>
            <div className="top">
                <div className="icon" style={{backgroundImage: `URL(${icon})`}}></div>
                <h1 className="message">{props.message}</h1>
            </div>
            <div className="slider"></div>
        </div>
    )
}

export default Popup;