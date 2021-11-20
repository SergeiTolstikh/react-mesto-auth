function ImagePopup(props) {
    return (
        <div className={`popup ${props.card ? 'popup_opened' : ''}`} id="overlay">

            <div className="popup__container popup__container_overlay">

                <img className="popup__overlay-picture" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}/>
                <h2 className="popup__overlay-picture-name">{props.card ? props.card.name : ''}</h2>
                <button type="button" className="popup__close popup__close_overlay" onClick={props.onClose}></button>

            </div>

        </div>

    )
}

export default ImagePopup