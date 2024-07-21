import { ReactElement, useContext } from 'react';
import React from 'react';
import dishData from '../../Data/order.json';
import popupContext from '../popupContext';
import Popup from '../Popup/popup';


const data = useContext(popupContext)

export const changeSize = (size: string, dishIndex: number,) => {
    const updatedDishData = dishData.map((dish, index) => {
        if (index === dishIndex) dish.order.size = size;
        return dish;
    });

    return updatedDishData;
};

//FIXME:Fix it god dammit
export const changeQuanity = (dishIndex: number, number: number, dishLimit:number, dishCount: number, cartContentSize: number) => {
    const updatedDishData = dishData.map((dish, index) => {
        if(index === dishIndex && ((dish.order.quantity > 0 && number < 0) || ((number > 0 && dishCount < dishLimit) && (cartContentSize + dish.order.quantity + number <= dishLimit) && number > 0))) {
            dish.order.quantity += number;
            setDishCount(dishCount + number);
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