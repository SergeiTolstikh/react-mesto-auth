import logo from "../images/__logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип Место" className="header__logo" />
            <nav className="header__nav">
                <p className="header__status-text">{props.mail}</p>
                <Link to={props.route} type="button" className="header__button">{props.title}</Link>
            </nav>
        </header>
    )
}
export default Header