import React from 'react';
import logo from './logo.svg';
import './Styling/app.sass';
import ImageSlider from './Components/ImageSlider/slider';
import Header from './Components/Header/Header';
import Menu from './Components/Menu/menu';

function App() {
  return (
    <div className="App">
      <Header/>
      <ImageSlider/>
      <Menu />
    </div>
  );
}

export default App;
