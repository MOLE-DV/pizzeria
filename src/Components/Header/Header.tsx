import { useEffect, useState } from 'react';
import './header.sass';
import './header_mobile.sass';
import './header_fixed_mobile.sass';
import delay from '../delay';
import { HashLink as Link } from 'react-router-hash-link';

const Header = (props : any) => {
    const [lastScrollPosition, setLastScrollPosition] = useState('up');

    useEffect(() => {
        if(props.option === 'always' || !document.getElementById('imageSlider')) {return;}
        window.addEventListener('scroll', async () => {
            if(!document.getElementById('imageSlider')) return;
            
            if(window.scrollY > document.getElementById('imageSlider')!.clientHeight / 3 && props.option !== 'always'){
                document.getElementById('header-fixed')!.setAttribute('class', 'fixed down');
                setLastScrollPosition('down');
                
            }
            else if(lastScrollPosition !== 'up' && props.option !== 'always'){
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
                    <Link className="button menu" to='/#menu'>Menu</Link>
                    <Link className="button catering" to='/#catering' onClick={() => alert('not done')}>Catering</Link>
                    <Link className="button hiring" to='/#hiring' onClick={() => alert('not done')}>Hiring</Link>
                    <Link className="button contact" to='/aboutUs' >About Us</Link>
                </div>
            </header>

            <header id="header-fixed" className={`fixed ${props.option != undefined ? props.option as string : 'none'}`}>
                <div className="left">
                    <Link to="/" className="title">Bella Vista</Link>
                </div>

                <div className="right">
                    <Link className="button-fixed" to='/#menu'><div className="icon" style={{backgroundImage: `URL(Assets/Images/menu.svg)`}} /><div className="text">Menu</div></Link>
                    <Link className="button-fixed" to='/#catering'><div className="icon" style={{backgroundImage: `URL(Assets/Images/catering.svg)`}} /><div className="text">Catering</div></Link>
                    <Link className="button-fixed" to='/#cart'><div className="icon" style={{backgroundImage: `URL(Assets/Images/checkout.svg)`}} /><div className="text">Checkout</div></Link>
                </div>
            </header>
        </div>
    )
}

export default Header;