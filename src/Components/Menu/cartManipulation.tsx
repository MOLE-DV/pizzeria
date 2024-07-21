import { ReactElement, useContext } from 'react';
import React from 'react';
import dishData from '../../Data/order.json';
import popupContext from '../popupContext';
import Popup from '../Popup/popup';

export const changeSize = (size: string, dishIndex: number,) => {
    const updatedDishData = dishData.map((dish, index) => {
        if (index === dishIndex) dish.order.size = size;
        return dish;
    });

    return updatedDishData;
};
