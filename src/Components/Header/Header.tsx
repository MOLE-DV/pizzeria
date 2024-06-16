import { useEffect } from 'react';
import './header.sass';

const Header = () => {

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > document.getElementById('imageSlider')!.clientHeight / 3){
                document.getElementById('header')!.classList.add('fixed');
            }
            else{
                document.getElementById('header')!.classList.remove('fixed');
            }
        })
    })

    return (
        <header id="header">
            <a className="button menu" href='#menu'>Menu</a>
            <a className="button catering" href='#catering'>Catering</a>
            <div className="title">Bella Vista</div>
            <a className="button hiring" href='#hiring'>Hiring</a>
            <a className="button contact" href='#contact'>Contact</a>
        </header>
    )
}

export default Header;