import './footer.sass';
import './footer_mobile.sass'
import { HashLink as Link } from 'react-router-hash-link';

const Footer = () => {
    return (
        <footer id="footer">
            <Link to="/" className="title">Bella Vista </Link>
            <div id="buttons">
                <Link to="/aboutUs" className="button">About us</Link>
                <div className="separator">|</div>
                <Link to="" className="button">List of ingredients</Link>
                <div className="separator">|</div>
                <Link to="" className="button">Allergens and caloric values</Link>
            </div>
            <div id="copy">Pizzeria site project made by Maksymilian Olejnik© 2024</div>
        </footer>
    )
}

export default Footer;