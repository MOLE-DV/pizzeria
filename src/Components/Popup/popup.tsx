import './popup.sass';
import React, { useEffect, useState, useContext } from 'react';
import popupContext from '../popupContext';
import delay from '../delay';


const Popup = (props:any) => {
    const data = useContext(popupContext)
    const [animation, setAnimation] = useState('goUp');
    const [icon, setIcon] = useState<string | null>(null);
    const [visible, setVisible] = useState(true);

    const sliderAnimation = props.time !== undefined ? {animationDuration: `${props.time / 1000}s`} : {}
    
    useEffect(() =>{
        if(props.customIcon !== undefined) setIcon(props.customIcon);
        switch(props.type){
            case 'warning':
                setIcon("Assets/Images/exclamamation.svg");
                break;
            case 'success':
                setIcon("Assets/Images/success.svg");
                break;
            case 'item_remove':
                setIcon("Assets/Images/bin.svg");
                break;
                
        }
    }, [icon])


    useEffect(() => {
        async function makeRequest() {
            setAnimation('goUp');
      
            await delay(props.time !== undefined ? props.time : 3000);
      
            setAnimation('goDown');
            
            await delay(250);

            setVisible(false)
        }

        makeRequest();
    }, [])


    async function viewCartContent() {
        switch(props.type){
            case "item_add":
                document.querySelector('#cart')!.scrollIntoView()
                break;
        }

        setAnimation('goDown');
            
        await delay(250);

        setVisible(false)
    }
 
    return visible ? (
        <div id="popup"  className={animation} onClick={() => viewCartContent()}>
            <div className="top">
                <div className="icon" style={{backgroundImage: `URL(${icon})`}}></div>
                <h1 className="message">{props.message}</h1>
            </div>
            <div className="slider" style={sliderAnimation}></div>
        </div>
    )
    : null
}

export default Popup;