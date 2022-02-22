function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? `popup_opened`: ""}`} onClick={props.onOverlayClick}>
            <div className="popup__form popup__form_info">
                <button type="button" className="popup__close" onClick={props.onClose}/>
                <img src={props.image} alt={props.title} className="popup__picture"/>
                <h2 className="popup__title popup__title_auth">{props.title}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip