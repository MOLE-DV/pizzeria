import './popup.sass';
import React, { useState } from 'react';

const Popup = (props:any) => {

    let [sliderValue, setSliderValue] = useState(0);
    const sliderhandler = () =>{

    }

    return (
        <div id="popup">
            <h1 className="message">{props.message}</h1>
            <div className="slider" style={{width: `${sliderValue}%`}}></div>
        </div>
    )
}

export default Popup;