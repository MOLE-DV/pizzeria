import React, { ReactElement, useState, SetStateAction, Dispatch, useContext, useEffect } from 'react';
import '../../Styling/app.sass'
import popupContext from '../../Components/popupContext';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/footer';
import AboutUsInfo from './components/aboutUsInfo/aboutUsInfo';

const AboutUs = () =>{
    const [popup, setPopup] = useState<ReactElement<any,any>[] | null>([<div></div>, <div></div>]);
  
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
      <div className="App">
        <popupContext.Provider value={{popup, setPopup}}>
            <Header/>
            <AboutUsInfo />
            <Footer />
            <div id="popupHolder">
                {popup}
            </div>
        </popupContext.Provider>
      </div>
    );
}

export default AboutUs