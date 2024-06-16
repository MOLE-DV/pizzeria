import React, { ReactElement, useState, SetStateAction, Dispatch, useContext } from 'react';
import logo from './logo.svg';
import './Styling/app.sass';
import ImageSlider from './Components/ImageSlider/slider';
import Header from './Components/Header/Header';
import Menu from './Components/Menu/menu';
import Popup from './Components/Popup/popup';
import popupContext from './Components/popupContext';

function App() {
  const [popup, setPopup] = useState<ReactElement<any,any> | null>(<div></div>);

  return (
    <div className="App">
      <popupContext.Provider value={{popup, setPopup}}>
          <Header/>
          <ImageSlider/>
          <Menu />
          {popup}
      </popupContext.Provider>
    </div>
  );
}

export default App;
