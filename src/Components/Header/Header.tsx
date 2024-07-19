import { useEffect, useState } from 'react';
import './header.sass';
import delay from '../delay';

const Header = () => {
    const [lastScrollPosition, setLastScrollPosition] = useState('up');

    useEffect(() => {
        window.addEventListener('scroll', async () => {
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
                    <a className="button menu" href='#menu'>Menu<div className="icon menu" /></a>
                    <a className="button catering" href='#catering'>Catering<div className="icon catering" /></a>
                    <a className="button catering" href='#catering'>Checkout<div className="icon checkout" /></a>
                </div>
            </header>
        </div>
    )
}

export default Header;