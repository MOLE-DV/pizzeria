import { useEffect, useState } from 'react';
import './header.sass';
import './header_mobile.sass';
import './header_fixed_mobile.sass';
import delay from '../delay';

const Header = () => {
    const [lastScrollPosition, setLastScrollPosition] = useState('up');

    useEffect(() => {
        window.addEventListener('scroll', async () => {
            if(!document.getElementById('imageSlider')) {
                document.getElementById('header-fixed')!.setAttribute('class', 'fixed down');
                return null;
            }
            if(window.scrollY > document.getElementById('imageSlider')!.clientHeight / 3){
                document.getElementById('header-fixed')!.setAttribute('class', 'fixed down');
                setLastScrollPosition('down');
                
            }
            else if(lastScrollPosition !== 'up'){
                setLastScrollPosition('up');
                document.getElementById('header-fixed')!.setAttribute('class', 'fixed up');
            }
        })
    })

    return (
        <div>
            <header id="header">
                <div className="left">
                    <div className="title">Bella Vista</div>
                </div>

                <div className="right">
                    <a className="button menu" href='#menu'>Menu</a>
                    <a className="button catering" href='#catering'>Catering</a>
                    <a className="button hiring" href='#hiring'>Hiring</a>
                    <a className="button contact" href='#contact'>Contact</a>
                </div>
            </header>

            <header id="header-fixed" className='fixed none'>
                <div className="left">
                    <div className="title">Bella Vista</div>
                </div>

                <div className="right">
                    <a className="button-fixed" href='#menu'><div className="icon" style={{backgroundImage: `URL(Assets/Images/menu.svg)`}} /><div className="text">Menu</div></a>
                    <a className="button-fixed" href='#catering'><div className="icon" style={{backgroundImage: `URL(Assets/Images/catering.svg)`}} /><div className="text">Catering</div></a>
                    <a className="button-fixed" href='#catering'><div className="icon" style={{backgroundImage: `URL(Assets/Images/checkout.svg)`}} /><div className="text">Checkout</div></a>
                </div>
            </header>
        </div>
    )
}

export default Header;