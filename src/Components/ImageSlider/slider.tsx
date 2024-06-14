import { useState, useEffect } from 'react';
import './slider.sass';

const ImageSlider = (props: any) => {

    const [pizzaRotation, setPizzaRotation] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setPizzaRotation(window.scrollY / 2);
        })
    })


    return (
        <div id='imageSlider'>
            <div className="background">
                <div className="title">Bella Vista</div>
                <a className="text" href='#menu'>Scroll Down</a>
                <div className="slideDown">
                    <div className="icon" style={{rotate: `${pizzaRotation}deg` }}></div>
                </div>
            </div>

        </div>
    );
}

export default ImageSlider;