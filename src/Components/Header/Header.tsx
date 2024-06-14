import './header.sass';

const Header = () => {
    return (
        <header id="header">
            <a className="button menu" href='#menu'>Menu</a>
            <a className="button catering" href='#catering'>Catering</a>
            <a className="button hiring" href='#hiring'>Hiring</a>
            <a className="button contact" href='#contact'>Contact</a>
        </header>
    )
}

export default Header;