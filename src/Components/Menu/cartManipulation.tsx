import dishData from '../../Data/order.json';


export const changeSize = (size: string, dishIndex: number,) => {
    const updatedDishData = dishData.map((dish, index) => {
        if (index === dishIndex) dish.order.size = size;
        return dish;
    });

    return updatedDishData;
};


interface DishFilters {
    [key: string]: string;
}

export const addToDishFilters = (filter: { [id: string]: string }, dishFilters: DishFilters) => {
    return {
        ...dishFilters,
        ...filter
    };
};
