import React, { ReactElement, useState, SetStateAction, Dispatch, useContext } from 'react';
import './Styling/app.sass';
import ImageSlider from './Components/ImageSlider/slider';
import Header from './Components/Header/Header';
import Menu from './Components/Menu/menu';
import popupContext from './Components/popupContext';
import ScrollingPizza from './Components/ScrollingPizza/scrollingpizza';

function App() {
  const [popup, setPopup] = useState<ReactElement<any,any>[] | null>([<div></div>, <div></div>]);
  
  return (
    <div className="App">
      <popupContext.Provider value={{popup, setPopup}}>
          <ScrollingPizza/>
          <Header/>
          <ImageSlider/>
          <Menu />
          <div id="popupHolder">
              {popup}
          </div>
      </popupContext.Provider>
    </div>
  );
}

export default App;
