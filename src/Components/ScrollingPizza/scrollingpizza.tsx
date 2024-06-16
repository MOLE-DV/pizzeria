import React from "react";
import { useState, useEffect } from "react";
import './scrollingpizza.sass'

const ScrollingPizza = () => {
    const [pizzaRotation, setPizzaRotation] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setPizzaRotation(window.scrollY / 2);
        })
    })

    return (
        <div className="slideDown">
            <div className="icon" style={{rotate: `${pizzaRotation}deg` }}></div>
        </div>
    )
}

export default ScrollingPizza;